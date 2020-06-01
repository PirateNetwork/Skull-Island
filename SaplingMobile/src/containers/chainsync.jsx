import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import axios from 'axios'

import {
  decrypt,
  saltHashPassword,
  KeySalt}from '../utils/hash'

import {
  runSqlCommand,
  openRecordset,
  insertRecords,
  runBatchCommand}  from '../database/sqlite'

import {
  setZHeight,
  setZAddress,
  setZPrivateKey,
  setZBalance,
  setReindex,
  setZSynced,
  setInsightSocket} from '../actions/Context'

import {
  setMinimumBlock,
  setInsightAPI,
  setInsightExplorer,
  setInsightZMQ,} from '../actions/Settings'

import {
  ChainSyncDiv,
  ChainSyncStatus,
  ChainSyncCurrentBalance,
  ChainSyncBalanceLogo,
  ChainSyncBalanceLogoImg,
  ChainSyncUSD,
  ChainSyncBTC,
  ChainSyncBalance,
  ChainSyncBalanceUnits,} from '../components/chainsync'

import pirateLogo from '../assets/svg/pirate_logo.svg'

import { coins } from '../utils/coins.js'

import { apiGetAddress,
         apiDecryptTransaction,
         apiDecryptOutgoingTransaction,
         apiGetNullifier,
         apiIncrementWitness } from '../utils/sapling'


class ChainOps extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      Processing: 0,
      Downloading: 0,
      Witnessing: 0,
      Synced : 0,
      DownloadPercentage: 0,
      rootMismatch: false,
      Socket: false
    }

    this.setProcessing = this.setProcessing.bind(this)
    this.setDownloading = this.setDownloading.bind(this)
    this.setWitnessing = this.setWitnessing.bind(this)
    this.getBalance = this.getBalance.bind(this)
    this.setKeys = this.setKeys.bind(this)
    this.setKeysNull = this.setKeysError.bind(this)
    this.syncChain = this.syncChain.bind(this)
    this.setSynced = this.setSynced.bind(this)
    this.getAddress = this.getAddress.bind(this)
    this.syncBlocks = this.syncBlocks.bind(this)
    this.setDownloadPercentage = this.setDownloadPercentage.bind(this)
    this.decodeSingleTransaction = this.decodeSingleTransaction.bind(this)
    this.runSyncChain = this.runSyncChain.bind(this)
    this.setRootMismatch = this.setRootMismatch.bind(this)
    this.setupSocket = this.setupSocket.bind(this)
    this.setSocket = this.setSocket.bind(this)
    this.msToTime = this.msToTime.bind(this)
  }

    setProcessing(n) {this.setState({Processing: n})}
    setDownloading(n) {this.setState({Downloading: n})}
    setWitnessing(n) {this.setState({Witnessing: n})}
    setSynced(n) {this.setState({Synced: n})}
    setDownloadPercentage(n) {this.setState({DownloadPercentage: n})}
    setRootMismatch(b) {this.setState({rootMismatch: b})}
    setSocket(b) {this.setState({Socket: b})}

    setKeys(result) {
      var keys = JSON.parse(result)
      this.props.setZPrivateKey(keys.extended_spending_key)
      this.props.setZAddress(keys.payment_address)
    }

    setKeysError(error) {

      alert('Unable to set keys' + error)
    }

    msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }


    async syncBlocks() {
      // console.log("Chain Sync 0")
      if (this.props.context.zPrivateKey != '' && this.state.Processing == 0) {
        this.setProcessing(1)
        const coin = this.props.settings.currentCoin
        try {
          const status = await axios.get(this.props.settings.insightAPI + 'status')
          var checkWitnesses = true
          // var checkHeight = this.props.context.zHeight + 1

          var maxBlock = status.data.info.blocks
          var currentBlock = 0

          while (maxBlock > currentBlock + 250) {
            // var lTime = Date.now()
            // console.log("Start Chain Sync Loop")
            // console.log(currentBlock)
            // console.log(maxBlock)

            // if (this.props.context.reindex == 1) {
            //   this.props.setZSynced(false)
            //   //Rescan from first known transaction
            //   await runSqlCommand(this.props.context.db, 'DELETE FROM Blocks')
            //   this.props.setReindex(0)
            // } else if (this.props.context.reindex == 2) {
            //   this.props.setZSynced(false)
            //   //Full Reindex
            //   await runSqlCommand(this.props.context.db, 'DELETE FROM Blocks')
            //   var minBlock = this.props.settings.minimumBlock
            //   minBlock[coin] = 0
            //   this.props.setMinimumBlock(minBlock)
            //   this.props.setReindex(0)
            // }

            // console.log('reindex ' + this.props.context.reindex)

            if (this.props.context.reindex > 0) {
              currentBlock = Number(Math.floor(this.props.context.reindex))
              this.props.setZSynced(false)
              await runSqlCommand(this.props.context.db, 'DELETE FROM Blocks')
              await runSqlCommand(this.props.context.db, 'DELETE FROM Transactions')
              await runSqlCommand(this.props.context.db, 'DELETE FROM Wallet')
              await runSqlCommand(this.props.context.db, 'DELETE FROM Shieldedoutputs')
              await runSqlCommand(this.props.context.db, 'DELETE FROM Shieldedspends')
              await runSqlCommand(this.props.context.db, 'DELETE FROM Witnesses')
              var minBlock = this.props.settings.minimumBlock
              minBlock[coin] = 0
              this.props.setMinimumBlock(minBlock)
              this.props.setReindex(0)
            } else {
              var rs = await openRecordset(this.props.context.db, 'SELECT max(height) as height FROM Blocks')
              currentBlock = Number(rs.rows.item(0).height) + 1
            }

            //Set starting Block
            this.props.setZHeight(currentBlock - 1)
            this.setDownloadPercentage((currentBlock - 1)/maxBlock)

            if ((currentBlock - 1)/(maxBlock - 5) > 1) {
              this.props.setZSynced(true)
            } else {
              this.props.setZSynced(false)
            }

            //Re-dowload if there is a sapling root mismatch.
            if (this.state.rootMismatch == true && currentBlock > 0) {
              currentBlock -= 1025
              this.setRootMismatch(false)
            }

            if (currentBlock <= this.props.settings.minimumBlock[coin] - 1) {
              currentBlock = this.props.settings.minimumBlock[coin] - 1
            }

            if (currentBlock <= coins[coin].branchHeight['sapling'] - 1) {
              currentBlock = coins[coin].branchHeight['sapling'] - 1
            }


            var wt = await openRecordset(this.props.context.db, 'SELECT max(height) as height, cmu '
                                                               +'FROM Witnesses '
                                                               +'GROUP BY cmu '
                                                               +'ORDER BY 1 ASC ')

            if (wt.rows.length > 0) {
              var currentWitnessBlock = Number(wt.rows.item(0).height)
              if (currentWitnessBlock > 0 && currentWitnessBlock < currentBlock - 1) {
                currentBlock == currentWitnessBlock + 1
              }
            }
            // console.log('Current Block 4 ' + currentBlock)

            // console.log("Chain Sync 2")
            //Download block from api
            // var dTime = Date.now()
            const response = await axios.get(this.props.settings.insightAPI + 'saplingblocks/' + currentBlock.toString() + '?blockQty=1000')
            // console.log("Download Time " + this.msToTime(Date.now() - dTime) )

            await runSqlCommand(this.props.context.db, 'DELETE FROM Blocks WHERE height >= ' + currentBlock)
            await runSqlCommand(this.props.context.db, 'DELETE FROM Transactions WHERE height >= ' + currentBlock)
            await runSqlCommand(this.props.context.db, 'DELETE FROM Shieldedoutputs WHERE height >= ' + currentBlock)
            await runSqlCommand(this.props.context.db, 'DELETE FROM Shieldedspends WHERE height >= ' + currentBlock)

            await runSqlCommand(this.props.context.db, 'DELETE FROM Wallet WHERE height >= ' + currentBlock)
            await runSqlCommand(this.props.context.db, 'UPDATE Wallet SET spent = 0, spenttxid=0 WHERE spent >= ' + currentBlock)


            //add blocks to database
            const blocks = response.data

            // console.log(blocks)
            // console.log('Load Blocks 1')
            {
              var txArray = []
              for (var i = 0; i < blocks.length; i++) {
                for (var tx = 0; tx < blocks[i].transactions.length; tx++) {
                  var txCommand =[]
                  txCommand.push('INSERT INTO Transactions VALUES (?1, ?2, ?3)')
                  txCommand.push([Number(blocks[i].height),blocks[i].transactions[tx].txid,tx])
                  txArray.push(txCommand)
                  if (txArray.length >= 50) {
                    await runBatchCommand(this.props.context.db, txArray)
                    txArray = []
                  }
                }
              }
              if (txArray.length > 0) {
                await runBatchCommand(this.props.context.db, txArray)
              }
            }

            // console.log('Load Blocks 2')
            {
              var outArray = []
              var spendArray = []
              for (var z = 0; z < blocks.length; z++) {
                for (var txz = 0; txz < blocks[z].transactions.length; txz++) {
                  for (var oi = 0; oi < blocks[z].transactions[txz].vShieldedOutput.length; oi++) {
                    var outCommand = []
                    outCommand.push('INSERT INTO Shieldedoutputs VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)')
                    outCommand.push([Number(blocks[z].height)
                      ,blocks[z].transactions[txz].txid
                      ,oi
                      ,blocks[z].transactions[txz].vShieldedOutput[oi].cm
                      ,blocks[z].transactions[txz].vShieldedOutput[oi].cv
                      ,blocks[z].transactions[txz].vShieldedOutput[oi].encCiphertext
                      ,blocks[z].transactions[txz].vShieldedOutput[oi].ephemeralKey
                      ,blocks[z].transactions[txz].vShieldedOutput[oi].outCiphertext
                      ])
                    outArray.push(outCommand)
                    if (outArray.length >= 5) {
                      await runBatchCommand(this.props.context.db, outArray)
                      outArray = []
                    }
                  }
                  // console.log('Load Blocks out')

                  for (var si = 0; si < blocks[z].transactions[txz].vShieldedSpend.length; si++) {
                    var spendCommand =[]
                    spendCommand.push('INSERT INTO Shieldedspends VALUES (?1, ?2, ?3, ?4)')
                    spendCommand.push([Number(blocks[z].height),blocks[z].transactions[txz].txid,si,blocks[z].transactions[txz].vShieldedSpend[si].nullifier])
                    spendArray.push(spendCommand)
                    if (spendArray.length >= 40) {
                      await runBatchCommand(this.props.context.db, spendArray)
                      spendArray = []
                    }
                  }
                }
              }
              if (outArray.length > 0) {
                await runBatchCommand(this.props.context.db, outArray)
              }
              if (spendArray.length > 0) {
                await runBatchCommand(this.props.context.db, spendArray)
              }
            }
            // console.log('Load Blocks 3')
            //Add blocks
            {
              var rootsArray = []
              for (var x = 0; x < blocks.length; x++) {
                var rootsCommand = []
                rootsCommand.push('INSERT INTO Blocks VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
                rootsCommand.push([Number(blocks[x].height),blocks[x].hash,blocks[x].finalsaplingroot,0,0,0])
                rootsArray.push(rootsCommand)
                if (rootsArray.length >= 40) {
                  await runBatchCommand(this.props.context.db, rootsArray)
                  rootsArray = []
                }
              }
              if (rootsArray.length > 0) {
                await runBatchCommand(this.props.context.db, rootsArray)
              }
            }
            // console.log('Load Blocks 4')
            //Get Unprocessed Transactions in the database
            var unprocessedBlocks = await openRecordset(this.props.context.db, 'SELECT b.height '
                                        +', sum(case when s.height is null then 0 else 1 end) as containsSpends '
                                        +', sum(case when o.height is null then 0 else 1 end) as containsOutputs '
                                        +'FROM Blocks as b '
                                        +'LEFT OUTER JOIN Shieldedspends s on b.height=s.height '
                                        +'LEFT OUTER JOIN Shieldedoutputs o on b.height=o.height '
                                        +'WHERE b.Processed = 0 '
                                        +'GROUP BY b.height '
                                        +'ORDER BY b.height ASC')


            var processedBlocks = 0
            // console.log('Load Blocks 4a')
            for (var u = 0; u < unprocessedBlocks.rows.length; u++) {
              // console.log('Load Blocks 4b')
              if (unprocessedBlocks.rows.item(u).height != null) {

                await runSqlCommand(this.props.context.db, 'DELETE FROM Witnesses WHERE height >= ' + unprocessedBlocks.rows.item(u).height)

                // Increment existing witnesses
                var witnesses = await openRecordset(this.props.context.db, 'SELECT w.cmu, w.height, w.witness, w.root '
                                                       +'FROM Witnesses as w '
                                                       +'JOIN Wallet as tx on tx.cmu = w.cmu and type <> 2 '
                                                       +'WHERE tx.spent = 0 AND w.height = ' + (unprocessedBlocks.rows.item(u).height - 1).toString())

                if (unprocessedBlocks.rows.item(u).containsOutputs == 0) {
                  //Add New witness
                  await insertRecords(this.props.context.db, 'INSERT INTO Witnesses '
                                                            +'SELECT w.cmu, ' + unprocessedBlocks.rows.item(u).height + ' as height, w.witness, w.root '
                                                            +'FROM Witnesses as w '
                                                            +'JOIN Wallet as tx on tx.cmu = w.cmu and type <> 2 '
                                                            +'WHERE tx.spent = 0 AND w.height = ' + (unprocessedBlocks.rows.item(u).height - 1).toString())
                }


                if (unprocessedBlocks.rows.item(u).containsOutputs > 0) {
                  for (var y = 0; y < witnesses.rows.length; y++) {
                    if (witnesses.rows.item(y).witness != null) {

                      // Get all commitments in block
                      var ws = await openRecordset(this.props.context.db, 'SELECT b.height, b.saplingroot, t.txid, t.txindex, s.outputindex, s.cmu, s.ephemeralKey, s.encCiphertext, s.outCiphertext '
                                                  +'FROM Blocks as b '
                                                  +'JOIN Transactions as t on b.height=t.height '
                                                  +'JOIN Shieldedoutputs as s on b.height=s.height and t.txid=s.txid '
                                                  +'WHERE b.height = ' + (unprocessedBlocks.rows.item(u).height).toString() + ' '
                                                  +'ORDER BY b.height ASC, t.txindex ASC, s.outputindex ASC')

                      var tempWitness = witnesses.rows.item(y).witness
                      this.props.context.db.executeSql('BEGIN')
                      for (var w = 0; w < ws.rows.length; w++) {

                        if (ws.rows.item(w).height != null) {

                          var witjson = {
                            "cmu": ws.rows.item(w).cmu,
                            "witness": tempWitness,
                            "root": "empty",
                            "returnroot" : checkWitnesses
                          }

                          var newWitness = await apiIncrementWitness(JSON.stringify(witjson))
                          var incrementedWitness = JSON.parse(newWitness)
                          tempWitness = incrementedWitness.witness

                          var rootCheck = false
                          if (incrementedWitness.root == ws.rows.item(w).saplingroot) {
                            rootCheck = true
                            console.log('Roots checked ' + unprocessedBlocks.rows.item(u).height.toString())
                          } else {
                            if (!checkWitnesses) {
                              rootCheck = true
                            } else {
                              if (w == ws.rows.length - 1) {
                                this.setRootMismatch(true)
                                console.log(incrementedWitness.root)
                                console.log(ws.rows.item(w).saplingroot)
                              }
                            }
                          }

                          if (w == ws.rows.length - 1 && rootCheck) {
                            //Add New witness
                            await insertRecords(this.props.context.db, 'INSERT INTO Witnesses VALUES (?1, ?2, ?3, ?4)',
                              [witnesses.rows.item(y).cmu, ws.rows.item(w).height, incrementedWitness.witness,incrementedWitness.root])

                          } //else if (w == ws.rows.length - 1 && incrementedWitness.root != ws.rows.item(w).saplingroot) {
                          //   this.setRootMismatch(true)
                          // }
                        }
                      }
                      this.props.context.db.executeSql('COMMIT')

                    }
                  }

                  //Only check root of witness on the first block of run
                  if (!this.state.rootMismatch) {
                    checkWitnesses = false
                  }

                  //Get Unprocessed Transactions in the database
                  var rz = await openRecordset(this.props.context.db, 'SELECT b.height, b.saplingroot, t.txid, t.txindex, s.outputindex, s.cmu, s.cv, s.ephemeralKey, s.encCiphertext, s.outCiphertext '
                                              +'FROM Blocks as b '
                                              +'JOIN Transactions as t on b.height=t.height '
                                              +'JOIN Shieldedoutputs as s on b.height=s.height and t.txid=s.txid '
                                              +'WHERE b.height = ' + (unprocessedBlocks.rows.item(u).height).toString() + ' '
                                              +'ORDER BY b.height ASC, t.txindex ASC, s.outputindex ASC')

                  //Attampt Decryption of new transactions
                  for (var r = 0; r < rz.rows.length; r++) {


                    if (rz.rows.item(r).height != null) {
                      var txy = {"height": rz.rows.item(r).height,
                                "txindex" : rz.rows.item(r).txindex,
                                "shieldedoutindex" : rz.rows.item(r).outputindex,
                                "cmu" : rz.rows.item(r).cmu,
                                "ephemeralKey" : rz.rows.item(r).ephemeralKey,
                                "encCiphertext" : rz.rows.item(r).encCiphertext,
                                "outCiphertext" : rz.rows.item(r).outCiphertext}

                      //Decrypt
                      var jsontx = await apiDecryptTransaction(JSON.stringify(txy),this.props.context.zPrivateKey)

                      //Check if decryption was successful
                      var dtx = JSON.parse(jsontx)
                      if (dtx.decrypted == "True") {

                        //Get IncrementWitness of decrypted transaction
                        var resp = await axios.get(this.props.settings.insightAPI + 'witness/' + rz.rows.item(r).txid + '?index=' + rz.rows.item(r).outputindex)

                        var witness = {
                          "height": rz.rows.item(r).height,
                          "txindex" : rz.rows.item(r).txindex,
                          "shieldedoutindex" : rz.rows.item(r).outputindex,
                          "value" : dtx.value,
                          "witness" : resp.data.witness,
                          "nullifier" : "",
                          "memo" : ""
                        }

                        //update minimumBlock settings
                        if (this.props.settings.minimumBlock[coin] <= coins[coin].branchHeight['sapling'] -1) {

                          var minBlockz = this.props.settings.minimumBlock
                          minBlockz[coin] = unprocessedBlocks.rows.item(u).height - 1
                          this.props.setMinimumBlock(minBlockz)

                        }

                        //Calculate Nullifier
                        var ntx = await apiGetNullifier(JSON.stringify(txy),this.props.context.zPrivateKey,JSON.stringify(witness))

                        // console.log(ntx)

                        await runSqlCommand(this.props.context.db, 'DELETE FROM Wallet '
                                               +'WHERE txid = \'' + rz.rows.item(r).txid + '\' '
                                               +'AND outputindex = \'' + rz.rows.item(r).outputindex + '\' '
                                               +'AND type in (0,1) ')


                        //Add Transaction to the Wallet
                        await insertRecords(this.props.context.db, 'INSERT INTO Wallet VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)',
                          [Number(rz.rows.item(r).height),
                            rz.rows.item(r).txid,
                            rz.rows.item(r).txindex,
                            rz.rows.item(r).outputindex,
                            rz.rows.item(r).cmu,
                            rz.rows.item(r).cv,
                            rz.rows.item(r).encCiphertext,
                            rz.rows.item(r).ephemeralKey,
                            rz.rows.item(r).outCiphertext,
                            resp.data.witness,
                            JSON.parse(ntx).nullifier,
                            0,
                            0,
                            JSON.parse(ntx).value,
                            JSON.parse(ntx).memo,
                            this.props.context.zAddress,
                            1,
                            0
                          ])

                        //Add New witness
                        await insertRecords(this.props.context.db, 'INSERT INTO Witnesses VALUES (?1, ?2, ?3, ?4)',
                          [rz.rows.item(r).cmu, rz.rows.item(r).height, resp.data.witness, rz.rows.item(r).saplingroot])


                        //Get all commitments after the decrypted note
                        var wz = await openRecordset(this.props.context.db, 'SELECT b.height, b.saplingroot, t.txid, t.txindex, s.outputindex, s.cmu, s.ephemeralKey, s.encCiphertext, s.outCiphertext '
                                                    +'FROM Blocks as b '
                                                    +'JOIN Transactions as t on b.height=t.height '
                                                    +'JOIN Shieldedoutputs as s on b.height=s.height and t.txid=s.txid '
                                                    +'WHERE b.height = ' + (rz.rows.item(r).height).toString() + ' '
                                                    +'  AND ((t.txindex = ' + (rz.rows.item(r).txindex).toString() +' and s.outputindex > ' + (rz.rows.item(r).outputindex).toString() + ')'
                                                    +'   OR (t.txindex > ' + (rz.rows.item(r).txindex).toString() +')) '
                                                    +'ORDER BY b.height ASC, t.txindex ASC, s.outputindex ASC')

                        //Increment for each addtional commitment
                        var inputWitness = resp.data.witness
                        for (var v = 0; v < wz.rows.length; v++) {
                          var witjsonz = {
                            "cmu": wz.rows.item(v).cmu,
                            "witness": inputWitness,
                            "root": "empty",
                            "returnroot" : false
                          }

                          var newWitnessz = await apiIncrementWitness(JSON.stringify(witjsonz))
                          var incrementedWitnessz = JSON.parse(newWitnessz)
                          inputWitness = incrementedWitnessz.witness

                          if (v == wz.rows.length - 1 ) {
                            //Delete aany old witnesses
                            await runSqlCommand(this.props.context.db, 'DELETE FROM Witnesses '
                                                   +'WHERE cmu = \'' + (rz.rows.item(r).cmu).toString() + '\' and height >= ' + rz.rows.item(r).height)
                            //Add New witness
                            await insertRecords(this.props.context.db, 'INSERT INTO Witnesses VALUES (?1, ?2, ?3, ?4)',
                              [rz.rows.item(r).cmu, rz.rows.item(r).height, incrementedWitnessz.witness,incrementedWitnessz.root])

                          }
                        }
                      }
                    }
                  }
                }

                // console.log('Load Blocks 5')
                if (unprocessedBlocks.rows.item(u).containsSpends > 0) {
                  var ns = await openRecordset(this.props.context.db, 'SELECT DISTINCT txid '
                                                                     +'From Shieldedspends as s '
                                                                     +'WHERE s.height = ' + (unprocessedBlocks.rows.item(u).height).toString())
                  this.props.context.db.executeSql('BEGIN')
                  for (var n = 0; n < ns.rows.length; n++) {
                  //Process Nullifiers

                    await runSqlCommand(this.props.context.db, 'UPDATE Wallet '
                                           +'SET spent = ' + (unprocessedBlocks.rows.item(u).height).toString() + ' '
                                           +', spenttxid =\'' + ns.rows.item(n).txid.toString() + '\' '
                                           +'WHERE nullifier in (SELECT s.nullifier '
                                                                +'From Shieldedspends as s '
                                                                +'WHERE s.height = ' + (unprocessedBlocks.rows.item(u).height).toString()
                                                                +' AND s.txid=\'' + ns.rows.item(n).txid.toString() + '\')')
                  }
                  this.props.context.db.executeSql('COMMIT')



                  //Decrypt Outgoing Transactions
                  var os = await openRecordset(this.props.context.db, 'SELECT DISTINCT o.height, o.txid, t.txindex, o.outputindex, o.cmu, o.cv, o.encCiphertext, o.ephemeralKey, o.outCiphertext '
                                                                     +'From Shieldedoutputs as o '
                                                                     +'Join Transactions as t on o.height = t.height AND t.txid = o.txid '
                                                                     +'Join Shieldedspends as s on s.height = t.height AND t.txid = s.txid '
                                                                     +'WHERE s.nullifier in (SELECT w.nullifier '
                                                                                           +'FROM Wallet as w '
                                                                                           +'WHERE spent = ' + (unprocessedBlocks.rows.item(u).height).toString() + ')')

                  for (var m = 0; m < os.rows.length; m++) {

                    var txo = {"height": os.rows.item(m).height,
                              "txindex" : os.rows.item(m).txindex,
                              "shieldedoutindex" : os.rows.item(m).outputindex,
                              "cmu" : os.rows.item(m).cmu,
                              "ephemeralKey" : os.rows.item(m).ephemeralKey,
                              "cv" : os.rows.item(m).cv,
                              "encCiphertext" : os.rows.item(m).encCiphertext,
                              "outCiphertext" : os.rows.item(m).outCiphertext}

                    //Decrypt
                    var jsontxo = await apiDecryptOutgoingTransaction(JSON.stringify(txo),this.props.context.zPrivateKey)




                  var rtxo = JSON.parse(jsontxo)
                  console.log(rtxo)

                  if (rtxo.decrypted && rtxo.value > 0) {

                    await runSqlCommand(this.props.context.db, 'DELETE FROM Wallet '
                                           +'WHERE txid = \'' + os.rows.item(m).txid + '\' '
                                           +'AND outputindex = \'' + os.rows.item(m).outputindex + '\' '
                                           +'AND type in (2,3) ')

                    //Add Transaction to the Wallet
                    await insertRecords(this.props.context.db, 'INSERT INTO Wallet VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)',
                      [Number(os.rows.item(m).height),
                        os.rows.item(m).txid,
                        os.rows.item(m).txindex,
                        os.rows.item(m).outputindex,
                        os.rows.item(m).cmu,
                        os.rows.item(m).cv,
                        os.rows.item(m).encCiphertext,
                        os.rows.item(m).ephemeralKey,
                        os.rows.item(m).outCiphertext,
                        '',
                        '',
                        Number(os.rows.item(m).height),
                        os.rows.item(m).txindex,
                        rtxo.value,
                        rtxo.memo,
                        rtxo.account,
                        3,
                        0,
                      ])
                    }

                  }

                  //Flag Change transactions
                  await runSqlCommand(this.props.context.db, 'UPDATE Wallet '
                                                            +'SET change = 1 '
                                                            +'WHERE address = \'' + this.props.context.zAddress + '\' '
                                                            +'  AND txid in '
                                                            +'(SELECT Distinct w.txid '
                                                            +' FROM Wallet as w '
                                                            +' WHERE w.height = ' + (unprocessedBlocks.rows.item(u).height).toString() + ' '
                                                            +'   AND w.address <> \'' + this.props.context.zAddress + '\' '
                                                            +'   AND type in (3))' )



                }
              }

              processedBlocks = unprocessedBlocks.rows.item(u).height
              if (processedBlocks % 100 == 0) {
                this.setDownloadPercentage((processedBlocks)/(maxBlock))
                this.props.setZHeight(processedBlocks)
              }
            }

            if (processedBlocks != 0) {
              this.setDownloadPercentage((processedBlocks)/(maxBlock))
              this.props.setZHeight(processedBlocks)
              if ((processedBlocks)/(maxBlock - 5) > 1) {
                this.props.setZSynced(true)
              } else {
                this.props.setZSynced(false)
              }
            }

            var deleteBlocks = processedBlocks - 1500
            if (deleteBlocks === null || isNaN(deleteBlocks)) {
              deleteBlocks = 0
            }

            await runSqlCommand(this.props.context.db, 'DELETE FROM Witnesses WHERE height < ' + deleteBlocks.toString())
            await runSqlCommand(this.props.context.db, 'DELETE FROM Blocks WHERE height < ' + deleteBlocks.toString())
            await runSqlCommand(this.props.context.db, 'DELETE FROM Transactions WHERE height < ' + deleteBlocks.toString())
            await runSqlCommand(this.props.context.db, 'DELETE FROM Shieldedoutputs WHERE height < ' + deleteBlocks.toString())
            await runSqlCommand(this.props.context.db, 'DELETE FROM Shieldedspends WHERE height < ' + deleteBlocks.toString())

            await runSqlCommand(this.props.context.db, 'UPDATE Blocks '
                                   +'SET Processed = 1 '
                                   +'WHERE height <= ' + processedBlocks + ' AND Processed = 0 ')

         }
       } catch(err) {
          console.log(err)
         if (process.env.NODE_ENV != 'production') {
           console.log(err)
         }
        }
          this.props.context.db.executeSql('VACUUM', [], function(response) {
            if (process.env.NODE_ENV != 'production') {
              console.log(response)
            }
        })

        // console.log('Load Blocks 13')
        this.setProcessing(0)
      }
    }



    async getBalance () {
      var balanceRecords = await openRecordset(this.props.context.db, 'SELECT sum(value) as value FROM Wallet WHERE spent = 0 AND height > 0 and type <> 2 ')

      var balance = balanceRecords.rows.item(0).value
      if (balance === null || isNaN(balance)) {
        balance = 0/1e08
      }
      this.props.setZBalance(balance)
    }

    async decodeSingleTransaction(data) {
      if (data.spendDescs.length > 0 || data.outputDescs.length > 0) {
        if (this.props.context.zPrivateKey != '' && this.state.Processing == 0) {
          this.setProcessing(1)
          const txid = data.txid
          const response = await axios.get(this.props.settings.insightAPI + 'tx/' + txid)
          const invtx = response.data


          var ws = await openRecordset(this.props.context.db, 'SELECT txid '
                                      +'FROM Transactions as t '
                                      +'WHERE t.txid =\'' + txid + '\'')

          if (ws.rows.length == 0) {

            var nullifiers = []
            for (var q = 0; q < invtx.spendDescs.length; q++) {

              var nullifier = invtx.spendDescs[q].nullifier
              nullifiers.push('\'' + invtx.spendDescs[q].nullifier + '\'')

              //Process Nullifiers
              await runSqlCommand(this.props.context.db, 'UPDATE Wallet '
                                     +'SET spent = -1 '
                                     +', spenttxid = \'' + txid + '\' '
                                     +'WHERE nullifier =\'' + nullifier + '\' and type not in (2,3) ' )

            }






            for (var i = 0; i < invtx.outputDescs.length; i++) {
              var tx = {"height": 0,
                        "txindex" : 0,
                        "shieldedoutindex" : i,
                        "cmu" : invtx.outputDescs[i].cmu,
                        "ephemeralKey" : invtx.outputDescs[i].ephemeralKey,
                        "encCiphertext" : invtx.outputDescs[i].encCiphertext,
                        "outCiphertext" : invtx.outputDescs[i].outCiphertext}


                await runSqlCommand(this.props.context.db, 'DELETE FROM Wallet '
                                       +'WHERE txid = \'' + txid + '\' '
                                       +'AND cmu = \'' + invtx.outputDescs[i].cmu + '\' ')

              //Decrypt Inbound
              var jsontx = await apiDecryptTransaction(JSON.stringify(tx),this.props.context.zPrivateKey)
              var dtx = JSON.parse(jsontx)

              if (dtx.decrypted == "True") {
                await insertRecords(this.props.context.db, 'INSERT INTO Wallet VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9 , ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)',
                [-1,
                  txid,
                  -1,
                  i,
                  invtx.outputDescs[i].cmu,
                  invtx.outputDescs[i].cv,
                  invtx.outputDescs[i].encCiphertext,
                  invtx.outputDescs[i].ephemeralKey,
                  invtx.outputDescs[i].outCiphertext,
                  '',
                  '',
                  0,
                  0,
                  dtx.value,
                  '',
                  this.props.context.zAddress,
                  0,
                  0
                ])
              }


              //Decrypt Outbound Transaction
              var nullifierString = nullifiers.join(',')
              console.log(nullifierString)

              var ns = await openRecordset(this.props.context.db, 'SELECT txid '
                                          +'FROM Wallet as w '
                                          +'WHERE w.nullifier in (' + nullifierString + ')')


              if (ns.rows.length != 0) {
                tx.cv = invtx.outputDescs[i].cv
                var rjsontx = await apiDecryptOutgoingTransaction(JSON.stringify(tx),this.props.context.zPrivateKey)
                var rdtx = JSON.parse(rjsontx)

                if (rdtx.decrypted == "True") {
                  await insertRecords(this.props.context.db, 'INSERT INTO Wallet VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9 , ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17, ?18)',
                  [-1,
                    txid,
                    -1,
                    i,
                    invtx.outputDescs[i].cmu,
                    invtx.outputDescs[i].cv,
                    invtx.outputDescs[i].encCiphertext,
                    invtx.outputDescs[i].ephemeralKey,
                    invtx.outputDescs[i].outCiphertext,
                    '',
                    '',
                    0,
                    0,
                    rdtx.value,
                    rdtx.memo,
                    rdtx.account,
                    2,
                    0
                  ])
                }
              }

            }
          }


          await this.getBalance()
          this.setProcessing(0)
        }
      }
    }

    async syncChain() {
      await this.syncBlocks()
      await this.getBalance()
    }

    runSyncChain(data) {
      this.syncChain()
      if (process.env.NODE_ENV != 'production') {
        console.log(data)
      }
    }

    async getAddress(seed) {
      try {
        var address = await apiGetAddress(seed)
        this.setKeys(address)
      } catch (error) {
        this.setKeysError(error)
      }
      this.syncChain()
    }

    setupSocket() {
      if (!this.state.Socket) {
        if (this.props.context.insightSocket != false) {
          this.setState({Socket: true})
          var socket = this.props.context.insightSocket
          socket.on('tx', this.decodeSingleTransaction)
          socket.on('block', this.runSyncChain)
          clearInterval(this.setSocketSID)
          this.setSocketSID = setInterval(() => this.setupSocket(),120000)
        } else {
          console.log('Chain Sync Socket not set, waiting')
        }
      }
    }

    componentDidMount() {
      const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
      const decryptedPhrase = decrypt(this.props.secrets.secretPhrase, keyHash)
      // const phraseHash = saltHashPassword(decryptedPhrase, coins[this.props.settings.currentCoin].networkname)
      // this.getAddress(phraseHash)
      this.getAddress(decryptedPhrase)

      this.getBalance()
      //this.zBalanceID = setInterval(() => this.getBalance(),30000)
      this.setSocketSID = setInterval(() => this.setupSocket(),500)
      this.setSyncID = setInterval(() => this.runSyncChain,30000)
    }

    componentWillUnmount() {
        //clearInterval(this.zBalanceID)
        clearInterval(this.setSocketSID)
        clearInterval(this.setSyncID)
    }

    render () {

      if (this.props.context.reindex > 0 && this.state.Processing == 0) {
        this.syncChain()
      }

      var syncStatus
      // console.log('Synced ' + this.props.context.zSynced)
      if (this.props.context.zSynced) {
        syncStatus =
        <ChainSyncStatus synced = {this.props.context.zSynced}>
          {'Wallet Synced'}
        </ChainSyncStatus>
      } else {
        syncStatus =
        <ChainSyncStatus synced = {this.props.context.zSynced}>
          {'Syncing ' + this.props.context.zHeight + ' ' + (this.state.DownloadPercentage * 100).toFixed(2) + '%'}
        </ChainSyncStatus>
      }

      // console.log("Render ChainSync")
      return (
        <ChainSyncDiv>
          {syncStatus}
          <ChainSyncUSD>
            {(this.props.context.currencyValue * this.props.context.zBalance / 1e08).toFixed(4) + 'USD'}
          </ChainSyncUSD>
          <ChainSyncCurrentBalance>
          </ChainSyncCurrentBalance>
          <ChainSyncBTC>
            {(this.props.context.BTCValue * this.props.context.zBalance / 1e08).toFixed(8) + 'BTC'}
          </ChainSyncBTC>
          <ChainSyncBalanceLogo>
            <ChainSyncBalanceLogoImg src={pirateLogo}/>
          </ChainSyncBalanceLogo>
          <ChainSyncBalance>
            {(this.props.context.zBalance / 1e08).toFixed(8)}
          </ChainSyncBalance>
          <ChainSyncBalanceUnits>
            ARRR
          </ChainSyncBalanceUnits>
        </ChainSyncDiv>
      )
    }
}


ChainOps.propTypes = {
  setInsightAPI: PropTypes.func.isRequired,
  setInsightZMQ: PropTypes.func.isRequired,
  setInsightSocket: PropTypes.func.isRequired,
  setInsightExplorer: PropTypes.func.isRequired,
  setMinimumBlock: PropTypes.func.isRequired,
  setZHeight: PropTypes.func.isRequired,
  setZAddress: PropTypes.func.isRequired,
  setZPrivateKey: PropTypes.func.isRequired,
  setZBalance: PropTypes.func.isRequired,
  setZSynced: PropTypes.func.isRequired,
  setReindex: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
}


function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setZHeight,
      setZAddress,
      setZPrivateKey,
      setZBalance,
      setZSynced,
      setReindex,
      setMinimumBlock,
      setInsightAPI,
      setInsightZMQ,
      setInsightSocket,
      setInsightExplorer,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChainOps)
