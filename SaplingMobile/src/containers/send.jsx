import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import axios from 'axios'
import { openRecordset }  from '../database/sqlite'
import { apiBuildTransaction } from '../utils/sapling'
import {
  getBaseDirectoryEntry,
  getDirectoryEntry,
  getFileEntry,
  writeDataToFile} from '../utils/fileops'

import {
  setTMainPage,
  setZMainPage,
  setSendPage} from '../actions/MainSubPage'

import {
  setActiveType,
  setQrScanning} from '../actions/Context'

import {
  setNoteInputs,
  setProcessTime} from '../actions/Settings'

import RingSpinner from '../containers/spinner'

import {
  SendGrid,
  SendSection,
  AddressSelectSection,
  AddressSelectLabel,
  AddressSelectHeading,
  AddressToggleButton,
  ConfirmHeading,
  ConfirmDataSection,
  ConfirmData,
  ConfirmButtonSection,
  ConfirmSendButton,
  ConfirmCancelButton,
  ConfirmPin,
  ConfirmPassword,
  ConfirmPasswordSection,
  SendSectionOpaque,
  SendAddress,
  SendAddressSection,
  AmountSection,
  AmountInput,
  FeeSection,
  ButtonSection,
  QRButton,
  TransactionLink,
  AddressBalanceNumberDiv,
  AddressCurrencyDiv,
  SpinnerSection} from '../components/send'

import { GreyButton } from '../components/button'

class Send extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      sendToAddress: '',
      fee: 0.0001,
      amount: 0.0000,
      spendPath: '',
      outputPath: '',
      transactionInput: 'visible',
      transactionConfirm: 'none',
      transactionSuccess: false,
      transactionFailed: false,
      txid: '',
      password: '',
      validPassword: false,
      noteQty: 0,
      showButtons: false,
      building: false,
      estimatedBuildTime: 0,
      actualBuildTime: 0,
      start: 0

    }

    //State Updates
    this.setSendToAddress = this.setSendToAddress.bind(this)
    this.setFee = this.setFee.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setSpendPath = this.setSpendPath.bind(this)
    this.setOutputPath = this.setOutputPath.bind(this)
    this.setTransactionInput = this.setTransactionInput.bind(this)
    this.setTransactionConfirm = this.setTransactionConfirm.bind(this)
    this.setTransactionSuccess = this.setTransactionSuccess.bind(this)
    this.setTransactionFailed = this.setTransactionFailed.bind(this)
    this.setTxid = this.setTxid.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setValidPassword = this.setValidPassword.bind(this)
    this.setNoteQty = this.setNoteQty.bind(this)
    this.setShowButtons = this.setShowButtons.bind(this)
    this.setBuilding = this.setBuilding.bind(this)
    this.setEstimatedBuildTime = this.setEstimatedBuildTime.bind(this)
    this.setActualBuildTime = this.setActualBuildTime.bind(this)
    this.buildTimer = this.buildTimer.bind(this)
    this.clearBuildTimer = this.clearBuildTimer.bind(this)
    this.setStart = this.setStart.bind(this)

    //Other Functions
    this.createSpend = this.createSpend.bind(this)
    this.resetSpend = this.resetSpend.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
    this.getInputs = this.getInputs.bind(this)
    this.msToTime = this.msToTime.bind(this)
  }

    //State Updates
    setSendToAddress (s) {this.setState({sendToAddress: s})}
    setFee (s) {this.setState({fee: s})}
    setAmount (s) {this.setState({amount: s})}
    setTransactionInput (s) {this.setState({transactionInput: s})}
    setTransactionConfirm (s) {this.setState({transactionConfirm: s})}
    setTransactionSuccess (s) {this.setState({transactionSuccess: s})}
    setTransactionFailed (s) {this.setState({transactionFailed: s})}
    setValidPassword (s) {this.setState({validPassword: s})}
    setTxid (s) {this.setState({txid: s})}
    setNoteQty (s) {this.setState({noteQty: s})}
    setShowButtons (s) {this.setState({showButtons: s})}
    setBuilding (s) {this.setState({building: s})}
    setEstimatedBuildTime (s) {this.setState({estimatedBuildTime: s})}
    setActualBuildTime (s) {this.setState({actualBuildTime: s})}
    setStart (s) {this.setState({start: s})}

    setPassword (p) {
      if (p.length >= 8) {
        p = p.substring(0,8)
      }

      if (p.length == 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            validPassword: true,
            showButtons: true,
            password: p
          })
        } else {
          this.setState({
            validPassword: false,
            password: ''
          })
        }
      } else {
        this.setState({
          password: p
        })
      }
    }

    //Takes Cordova FileEntry
    setSpendPath (s) {this.setState({spendPath: s.fullPath})}
    setOutputPath (s) {this.setState({outputPath: s.fullPath})}

    handleQRScan () {
      // Prepare QR Scanner
      QRScanner.prepare(function (err, status) {
        // Oh no!
        if (err) {
          alert(JSON.stringify(err))
        }

        // If we are authorized to scan, then only do we invoke
        // the scan method
        if (status.authorized) {
          // Start scanning
          QRScanner.scan(function (err, address) {
            // an error occurred, or the scan was canceled (error code `6`)
            if (err) {
              alert(JSON.stringify(err))
            } else {
              // The scan completed, display the contents of the QR code
              this.setState({
                sendToAddress: address
              })
            }

            // Set finished scanning
            this.props.setQrScanning(false)
            QRScanner.destroy()
          }.bind(this))

          // Show scanning preview
          QRScanner.show()

          // Set transparency
          this.props.setQrScanning(true)
        } else if (status.denied) {
          // const CUR_LANG = this.props.settings.language
          // alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
          QRScanner.openSettings()
        } else {
          // we didn't get permission, but we didn't get permanently denied. (On
          // Android, a denial isn't permanent unless the user checks the "Don't
          // ask again" box.) We can ask again at the next relevant opportunity.
        }
      }.bind(this))
    }

    safeReleaseCamera () {
      // Destroy QR scanner if user goes back
      // while scanning
      if (this.props.context.qrScanning) {
        QRScanner.destroy()
        this.props.setQrScanning(false)
      }
    }

    async getInputs() {

      var witnessRecords = await openRecordset(this.props.context.db,'SELECT Max(height) as height from Witnesses')
      var witnessHeight = witnessRecords.rows.item(0).height
      if (witnessHeight === null || isNaN(witnessHeight)) {
        witnessHeight = 0
      }

      //var w = await openRecordset(this.props.context.db,'SELECT * from Wallet')

      // var filesystem = await getBaseDirectoryEntry()
      // var root_path = filesystem.root.nativeURL.replace("file://","")

      //var directoryEntry = await getDirectoryEntry(filesystem, 'inputs')

      // var txInputs = {
      //     "spend_path" : root_path + "params/sapling-spend.params",
      //     "output_path" : root_path + "params/sapling-output.params",
      //     "data_path" : root_path + "inputs/",
      //     "amount" : (this.state.amount*1e08).toString(),
      //     "input_type" : "0",
      //     "fee" : (this.state.fee*1e08).toString(),
      //     "payment_address" : this.state.sendToAddress,
      //     "height" : this.props.context.zHeight.toString(),
      //     "PrivateKey" : this.props.context.tPrivateKey,
      //     "extended_spending_key" : this.props.context.zPrivateKey
      //   }

        //var tFiles = {"filename" : []}
        //var zFiles = {"filename" : []}

        var totalAmount = Number(this.state.amount*1e08) + Number(this.state.fee*1e08)
        var unspentTotal = 0
        //var noteHeight = 0
        var txInputs = []

        if (this.props.context.activeType == 'Z') {
          var notesRecords = await openRecordset(this.props.context.db,'SELECT i.value, i.cmu, i.ephemeralKey, i.encCiphertext, w.witness '
                                                              + 'FROM Wallet as i '
                                                              + 'JOIN Witnesses as w on i.cmu = w.cmu '
                                                              + 'WHERE w.height = ' + (witnessHeight).toString() + ' and i.spent = 0 '
                                                              + 'ORDER BY i.height ASC')

            //Attampt Decryption of new transactions
          for (var n = 0; n < notesRecords.rows.length; n++) {
            if (notesRecords.rows.item(n).value != null) {

                if (unspentTotal < totalAmount) {
                  //var zFileInputs = {"z_inputs": []}

                  unspentTotal += Number(notesRecords.rows.item(n).value)

                  var txNotes = {
                      "witness" : notesRecords.rows.item(n).witness,
                      "cmu" : notesRecords.rows.item(n).cmu,
                      "ephemeralKey" : notesRecords.rows.item(n).ephemeralKey,
                      "encCiphertext" : notesRecords.rows.item(n).encCiphertext
                  }
                  txInputs.push(txNotes)

                }
              }
            }
          }

      //console.log(txInputs.length)
      this.setNoteQty(txInputs.length)
      this.setEstimatedBuildTime((this.state.noteQty * (this.props.settings.processTime/this.props.settings.noteInputs)))

      // console.log(this.state.noteQty)
      // console.log(this.props.settings.processTime)
      // console.log(this.props.settings.noteInputs)
    }

    async createSpend() {
      this.setBuilding(true)

      const status = await axios.get(this.props.settings.insightAPI + 'insight-api-zero/status')
      const blockHeight = status.data.info.blocks


      var witnessRecords = await openRecordset(this.props.context.db,'SELECT Max(height) as height from Witnesses')
      var witnessHeight = witnessRecords.rows.item(0).height
      if (witnessHeight === null || isNaN(witnessHeight)) {
        witnessHeight = 0
      }

      //var w = await openRecordset(this.props.context.db,'SELECT * from Wallet')

      var filesystem = await getBaseDirectoryEntry()
      var root_path = filesystem.root.nativeURL.replace("file://","")

      var directoryEntry = await getDirectoryEntry(filesystem, 'inputs')

      var txInputs = {
          "spend_path" : root_path + "params/sapling-spend.params",
          "output_path" : root_path + "params/sapling-output.params",
          "data_path" : root_path + "inputs/",
          "amount" : (this.state.amount*1e08).toString(),
          "input_type" : "0",
          "fee" : (this.state.fee*1e08).toString(),
          "payment_address" : this.state.sendToAddress,
          "height" : blockHeight.toString(),
          "PrivateKey" : this.props.context.tPrivateKey,
          "extended_spending_key" : this.props.context.zPrivateKey
        }

        var tFiles = {"filename" : []}
        var zFiles = {"filename" : []}

        var totalAmount = Number(txInputs.amount) + Number(txInputs.fee)
        var unspentTotal = 0
        //var noteHeight = 0


        if (this.props.context.activeType == 'Z') {


          var notesRecords = await openRecordset(this.props.context.db,'SELECT i.value, i.cmu, i.ephemeralKey, i.encCiphertext, w.witness '
                                                              + 'FROM Wallet as i '
                                                              + 'JOIN Witnesses as w on i.cmu = w.cmu '
                                                              + 'WHERE w.height = ' + (witnessHeight).toString() + ' and i.spent = 0 '
                                                              + 'ORDER BY i.height ASC')

            //Attampt Decryption of new transactions
          for (var n = 0; n < notesRecords.rows.length; n++) {
            if (notesRecords.rows.item(n).value != null) {

                if (unspentTotal < totalAmount) {
                  var zFileInputs = {"z_inputs": []}

                  unspentTotal += Number(notesRecords.rows.item(n).value)

                  var txNotes = {
                      "witness" : notesRecords.rows.item(n).witness,
                      "cmu" : notesRecords.rows.item(n).cmu,
                      "ephemeralKey" : notesRecords.rows.item(n).ephemeralKey,
                      "encCiphertext" : notesRecords.rows.item(n).encCiphertext
                  }
                  // console.log(txNotes)
                   zFileInputs.z_inputs.push(txNotes)
                   var zFileName = "zinputs" + n + ".json"
                   zFiles.filename.push(zFileName)
                   var zData = JSON.stringify(zFileInputs)
                   var zFileEntry = await getFileEntry(directoryEntry, zFileName)
                   await writeDataToFile(zFileEntry, zData)

                }
              }
            }
            txInputs.input_type = "1"
          }

        if (this.props.context.activeType == 'T') {
          var response = await axios.get(this.props.settings.insightAPI + 'insight-api-zero/addr/' + this.props.context.tAddress + '/utxo')
          for (var i = 0; i < response.data.length; i++) {
            if (unspentTotal < totalAmount) {
              if (response.data[i].confirmations > 0 ) {
                var tFileInputs = {
                  "t_inputs": []
                }

                unspentTotal += Number(response.data[i].satoshis)

                var utxo = {
                  "txid": response.data[i].txid,
                  "vout": response.data[i].vout.toString(),
                  "satoshis": response.data[i].satoshis.toString(),
                  "scriptPubKey": response.data[i].scriptPubKey
                }
                 // console.log(utxo)
                 tFileInputs.t_inputs.push(utxo)
                 var tFileName = "tinputs" + i + ".json"
                 tFiles.filename.push(tFileName)
                 var tData = JSON.stringify(tFileInputs)
                 var tFileEntry = await getFileEntry(directoryEntry, tFileName)
                 await writeDataToFile(tFileEntry, tData)
               }
            }
          }
          txInputs.input_type = "0"
        }


        // console.log(unspentTotal)
        // console.log(totalAmount)

        if ( unspentTotal >= totalAmount) {

          var tIn = JSON.stringify(tFiles)
          var zIn = JSON.stringify(zFiles)
          var txIn = JSON.stringify(txInputs)

          var start = Date.now()
          this.setStart(start)
          this.buildTimer()

          var saplingtx = await apiBuildTransaction(txIn, tIn, zIn)
          var processingTime = Date.now() - start
          this.setActualBuildTime(processingTime)
          this.clearBuildTimer()
          this.setShowButtons(true)
          this.setBuilding(false)

          var tx = JSON.parse(saplingtx)

          if (tx.error == "false") {
            try{
              this.props.setProcessTime(processingTime + this.props.settings.processTime)
              this.props.setNoteInputs(this.state.noteQty + this.props.settings.noteInputs)
              var sendtx = await axios.post(this.props.settings.insightAPI + 'insight-api-zero/tx/send',
                      {
                        rawtx: tx.result
                      },
                      {
                        headers: {
                          'Content-Type': 'application/json'
                        }
                      })
              if (sendtx.status == 200) {
                this.setTransactionSuccess(true)
                this.setTxid(sendtx.data.txid)
              } else {
                alert('Transaction send failed!! ')
                this.setTransactionFailed(true)
              }
            } catch (err) {
              //console.log(err)
              alert('Transaction send failed!! ' + err)
              this.setTransactionFailed(true)
            }
          } else {
            this.setTransactionFailed(true)
            alert('Tx build failure! ' + tx.result)
          }
        } else {
          this.setTransactionFailed(true)
          alert('Not enough coins!')
        }
      this.setShowButtons(true)
      this.setBuilding(false)
    }

    resetSpend() {
      this.setSendToAddress('')
      this.setFee(0.0001)
      this.setAmount(0)
      this.setPassword('')
      this.setValidPassword(false)
      this.setTxid('')
      this.setTransactionSuccess(false)
      this.setTransactionFailed(false)
      this.setShowButtons(false)
      this.setBuilding(false)
      this.setActualBuildTime(0)
    }

    buildTimer() {
      this.buildID = setInterval(
        () => this.setActualBuildTime(Date.now() - this.state.start),100
      )
    }

    clearBuildTimer() {
      clearInterval(this.buildID)
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

    componentDidMount() {
    }

    componentWillUnmount () {
      this.safeReleaseCamera()
      this.clearBuildTimer()
    }

    render () {
        var screenDim = this.props.context.dimensions
        var taddress = this.props.context.tAddress
        var zaddress = this.props.context.zAddress

        var displayT
        var displayZ
        if (this.props.context.activeType == 'Z' ) {
          displayZ = 'visible'
          displayT = 'none'
        } else if (this.props.context.activeType == 'T' ) {
          displayZ = 'none'
          displayT = 'visible'
        }

        var displayToggleButton
        if (this.props.context.zSynced == true) {
          displayToggleButton = <AddressToggleButton sc={screenDim}
            onClick={() => {
              if (this.props.context.activeType == 'Z') {
                this.props.setActiveType('T')
              } else {
                this.props.setActiveType('Z')
              }
              }}>
            T/Z
          </AddressToggleButton>
        } else {
          displayToggleButton = <AddressToggleButton disabled = {true} sc={screenDim}>
            T/Z
          </AddressToggleButton>
        }


        var displaySendButton
        var displaySendPassword
        var displayConfirm

        if (this.state.transactionSuccess == true) {
          displaySendPassword = 'none'
          displaySendButton = 'none'
          displayConfirm = 'visible'
        } else {
          displaySendPassword = 'visible'
          displaySendButton = 'visible'
          displayConfirm = 'none'
        }

        if (this.state.showButtons == false) {
          displayConfirm = 'none'
        }

        var displaySpinner = 'none'
        var spinner = ''
        if (this.state.building == true) {
          displaySendButton = 'none'
          displaySendPassword = 'none'
          displaySpinner = 'visible'
          spinner = <RingSpinner />
        }

        var sendButton
        if (this.state.validPassword == true) {
          displaySendPassword = 'none'
          sendButton = <ConfirmSendButton sc={screenDim}
                          onClick={() => {
                            this.setShowButtons(false)
                            this.createSpend()}}>
                          Send
                        </ConfirmSendButton>
        } else {
          sendButton = <ConfirmSendButton sc={screenDim} disabled = {true}>
                        Send
                        </ConfirmSendButton>
        }

        var preSendButton
        if (this.state.amount > 0) {
            preSendButton = <GreyButton sc={screenDim}
            onClick={() => {
              this.setTransactionConfirm('visible')
              this.setTransactionInput('none')
              this.getInputs()
            }}>
            Send
          </GreyButton>
        } else {
          preSendButton = <GreyButton sc={screenDim}  disabled = {true}>
            Send
          </GreyButton>
        }

        return (
          <SendGrid sc={screenDim} visible={this.props.mainSubPage.sendPage}>
          <SendSection sc={screenDim}>
          </SendSection>

          <SendSectionOpaque sc={screenDim} visible={this.state.transactionConfirm}>
            <ConfirmHeading sc={screenDim}>
              {"Confirm Transaction"}
            </ConfirmHeading>
            <ConfirmDataSection sc={screenDim}>


              <ConfirmData sc={screenDim}>
                {'Send from Address:'}
              </ConfirmData>

              <ConfirmData sc={screenDim}>
                {this.props.context.activeType == 'Z' ? zaddress : taddress}
              </ConfirmData>

              <br/>

              <ConfirmData sc={screenDim}>
                {'Send to Address:'}
              </ConfirmData>

              <ConfirmData sc={screenDim}>
                {this.state.sendToAddress}
              </ConfirmData>

              <br/>

              <ConfirmData sc={screenDim}>
                {'Amount: ' + (this.state.amount/1.0).toFixed(8)}
              </ConfirmData>
              <ConfirmData sc={screenDim}>
                {'Fee: ' + (this.state.fee/1.0).toFixed(8)}
              </ConfirmData>

              <br/>

              <ConfirmData sc={screenDim}>
                {'Estimated build time: ' + this.msToTime(this.state.estimatedBuildTime)}
              </ConfirmData>
              <ConfirmPasswordSection visible={'visible'}>
                <ConfirmData sc={screenDim}>
                  {'Actual build time: ' + this.msToTime(this.state.actualBuildTime)}
                </ConfirmData>
              </ConfirmPasswordSection>


              <ConfirmPasswordSection visible={displaySendPassword}>
                <ConfirmPassword>
                  Enter 8-Digit Pin to Send
                  <br/>
                  <ConfirmPin
                    sc={screenDim}
                    type="password"
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)} />
                </ConfirmPassword>
              </ConfirmPasswordSection>
              <ConfirmPasswordSection visible={displaySendButton}>
                <br/>
                <ConfirmButtonSection sc={screenDim}>
                  {sendButton}
                  <ConfirmCancelButton sc={screenDim}
                  onClick={() => {
                    this.setTransactionConfirm('none')
                    this.setTransactionInput('visible')
                    this.setTransactionFailed(false)
                    this.setPassword('')
                    this.setValidPassword(false)
                  }}>
                  Cancel
                  </ConfirmCancelButton>
                </ConfirmButtonSection>
              </ConfirmPasswordSection>


              <ConfirmPasswordSection visible={displayConfirm}>
                <br/>
                <TransactionLink sc={screenDim} href={this.props.settings.insightAPI + 'insight/tx/' + this.state.txid}>
                  Show Completed Transaction
                </TransactionLink>
                <br/><br/><br/>
                <ConfirmButtonSection sc={screenDim}>
                  <ConfirmSendButton sc={screenDim}
                  onClick={() => {
                    this.resetSpend()
                    this.setTransactionConfirm('none')
                    this.setTransactionInput('visible')
                  }}>
                  New
                  </ConfirmSendButton>
                  <ConfirmCancelButton sc={screenDim}
                  onClick={() => {
                    this.resetSpend()
                    this.setTransactionConfirm('none')
                    this.setTransactionInput('visible')
                    if (this.props.context.activeType == 'Z') {
                      this.props.setZMainPage('visible')
                    } else if (this.props.context.activeType == 'T') {
                      this.props.setTMainPage('visible')
                    }
                    this.props.setSendPage('none')
                  }}>
                  Done
                  </ConfirmCancelButton>
                </ConfirmButtonSection>
              </ConfirmPasswordSection>
            </ConfirmDataSection>
            <SpinnerSection sc={screenDim} visible = {displaySpinner}>
              {spinner}
            </SpinnerSection>
          </SendSectionOpaque>





          <SendSectionOpaque sc={screenDim} visible={this.state.transactionInput}>
            <AddressSelectSection sc={screenDim}>


              <AddressSelectLabel visible={displayZ} sc={screenDim}>
                <AddressSelectHeading sc={screenDim}>
                  {"Send from Private Address:"}
                </AddressSelectHeading>
                {zaddress.substring(0,8) + '...' + zaddress.substring(zaddress.length-8,zaddress.length)}
                <AddressBalanceNumberDiv sc={screenDim}>
                  {((this.props.context.zBalance / 1e08).toFixed(8)) + ' ' + this.props.settings.currentCoin}
                </AddressBalanceNumberDiv>
                <AddressCurrencyDiv sc={screenDim}>
                  {((this.props.context.zBalance / 1e08) * this.props.context.BTCValue).toFixed(8) + ' BTC'}
                  <br/>
                  {((this.props.context.zBalance / 1e08)  * this.props.context.currencyValue).toFixed(6) + ' USD'}
                </AddressCurrencyDiv>
              </AddressSelectLabel>


              <AddressSelectLabel visible={displayT} sc={screenDim}>
                <AddressSelectHeading sc={screenDim}>
                  {"Send from Transparent Address:"}
                </AddressSelectHeading>
                  {taddress.substring(0,8) + '...' + taddress.substring(taddress.length-8,taddress.length)}
                <AddressBalanceNumberDiv sc={screenDim}>
                  {((this.props.context.tBalance / 1e08).toFixed(8))  + ' ' + this.props.settings.currentCoin}
                </AddressBalanceNumberDiv>
                <AddressCurrencyDiv sc={screenDim}>
                  {((this.props.context.tBalance / 1e08) * this.props.context.BTCValue).toFixed(8) + ' BTC'}
                  <br/>
                  {((this.props.context.tBalance / 1e08)  * this.props.context.currencyValue).toFixed(6) + ' USD'}
                </AddressCurrencyDiv>
              </AddressSelectLabel>
              {displayToggleButton}
            </AddressSelectSection>


            <SendAddressSection sc={screenDim}>
              {"Send to Address:"}
              <br/>
              <SendAddress sc={screenDim}
                value={this.state.sendToAddress}
                onChange={e => this.setSendToAddress(e.target.value)}  />
            </SendAddressSection>
            <AmountSection sc={screenDim}>
              {"Amount: "}
              <AmountInput type="number" sc={screenDim}
                value={this.state.amount}
                onChange={e => this.setAmount(e.target.value)} />
            </AmountSection>
            <FeeSection sc={screenDim}>
              {"Fee: "}
              <AmountInput type="number" sc={screenDim}
                value={this.state.fee}
                onChange={e => this.setFee(e.target.value)} />
            </FeeSection>

            <QRButton sc={screenDim}
              onClick={() => {
                this.handleQRScan()
                }}>
              QR
            </QRButton>

            <ButtonSection sc={screenDim}>
              {preSendButton}

              <GreyButton sc={screenDim}
                onClick={() => {
                  this.resetSpend()
                  if (this.props.context.activeType == 'Z') {
                    this.props.setZMainPage('visible')
                  } else if (this.props.context.activeType == 'T') {
                    this.props.setTMainPage('visible')
                  }
                  this.props.setSendPage('none')
                  }}>
                Cancel
              </GreyButton>
            </ButtonSection>
          </SendSectionOpaque>
          </SendGrid>
        )
    }

  }


Send.propTypes = {
  setZMainPage: PropTypes.func.isRequired,
  setTMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired,
  setActiveType: PropTypes.func.isRequired,
  setNoteInputs: PropTypes.func.isRequired,
  setProcessTime: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setSendPage,
      setZMainPage,
      setTMainPage,
      setActiveType,
      setQrScanning,
      setNoteInputs,
      setProcessTime
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Send)
