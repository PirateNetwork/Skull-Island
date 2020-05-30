import React from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import axios from 'axios'
//import tdb from '../database/transactions'

//import { openRecordset }  from '../database/sqlite'

import { ListDiv,
         TransactionUl,
         TransactionLi,
         Col1Div,
         Col2Div,
         Col3Div,
         Col4Div,
         //Col5Div,
         Spacer,
         ArrowImg,
         TransactionListLink} from '../components/transactionList'

import inArrow from '../assets/green_arrow.png'
import outArrow from '../assets/red_arrow.png'

class TTransactionList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      transactionList: null,
      connectionError: false, // Are we connected to the internet or nah.
      selectedAddressTxFrom: 0,
      selectedAddressTxTo: 50,
      selectedAddressScannedTxs: false,
      balance: 0

    }

    this.setTransactionList= this.setTransactionList.bind(this)
    this.createTransactionList = this.createTransactionList.bind(this)
    this.setAddressTxList = this.setAddressTxList.bind(this)

  }

    setTransactionList (b) {
      this.setState({
        transactionList: b
      })
    }

    // Sets information about tx
    setAddressTxList () {
      const address = this.props.secrets.items[0].address
      const txInfoURL = (this.props.settings.insightAPI + 'insight-api-zero/addrs/' + address + '/txs?from=' + this.state.selectedAddressTxFrom + '&to=' + this.state.selectedAddressTxTo)

      axios.get(txInfoURL)
        .then((resp) => {
          const newTxs = resp.data.items
          console.log(newTxs)
          this.createTransactionList(newTxs)
        })
        .catch((err) => {
          if (process.env.NODE_ENV != 'production') {
            console.log(err)
          }
          //this.setConnectionError(true)
          //this.props.setInsightAPI('')
        })
    }

    createTransactionList (rs) {
      var screenDim = this.props.context.dimensions
      var transactions = []

      //console.log(rs)

      for (var r = 0; r < rs.length; r++) {
        var totalIn = 0
        //var totalOut = 0

        for (var i = 0; i < rs[r].vin.length; i++) {
          if (rs[r].vin[i].addr == this.props.context.tAddress) {
            totalIn += rs[r].vin[i].value*1e08
          }
        }

        if (totalIn > 0 && rs[r].valueBalance < 0) {
          var zInTransaction = {
            id: rs[r].txid + '-' + i + '-private',
            txid: rs[r].txid,
            height: rs[r].blockheight,
            value: -rs[r].valueBalance*1e08,
            block:rs[r].blockheight,
            type: 1,
            address: 'Private Transaction'
          }
          transactions.push(zInTransaction)
        }

        if (totalIn > 0 && rs[r].fees*1e08 > 0) {
          var feeTransaction = {
            id: rs[r].txid + '-' + i + '-fees',
            txid: rs[r].txid,
            height: rs[r].blockheight,
            value: rs[r].fees*1e08,
            block:rs[r].blockheight,
            type: 1,
            address: 'Transaction Fee'
          }
          transactions.push(feeTransaction)
        }

        for (var o = 0; o < rs[r].vout.length; o++) {

          var address = rs[r].vout[o].scriptPubKey.addresses[0]

          if (totalIn > 0) {
            var tInTransaction = {
              id: rs[r].txid + '-' + i + '-vout1',
              txid: rs[r].txid,
              height: rs[r].blockheight,
              value: rs[r].vout[o].value*1e08,
              block: rs[r].blockheight,
              type: 1,
              address: address.substring(0,8) + '...' + address.substring(address.length-8,address.length)
            }
            transactions.push(tInTransaction)
          }

          if (address == this.props.context.tAddress) {
            var outTransaction = {
              id: rs[r].txid + '-' + i + '-vout0',
              txid: rs[r].txid,
              height: rs[r].blockheight,
              value: rs[r].vout[o].value*1e08,
              block: rs[r].blockheight,
              type: 0,
              address: address.substring(0,8) + '...' + address.substring(address.length-8,address.length)
            }
            transactions.push(outTransaction)
          }
        }
      }


          this.setTransactionList(
            <ListDiv sc={screenDim}>
                <TransactionUl header={true} sc={screenDim}>
                  <TransactionLi sc={screenDim}>
                    <Col1Div sc={screenDim}>Txid</Col1Div>
                    <Col2Div sc={screenDim}></Col2Div>
                    <Col3Div sc={screenDim}></Col3Div>
                    <Col4Div sc={screenDim}>Value</Col4Div>
                  </TransactionLi>
                </TransactionUl>
                {transactions.map((tx) => (
                  <TransactionUl key={tx.id} header={false} sc={screenDim}>
                      <TransactionLi  sc={screenDim}>
                        <Col1Div sc={screenDim}>
                          <TransactionListLink href={this.props.settings.explorerURL + 'tx/' + tx.txid}>
                            {tx.address}
                          </TransactionListLink>
                        </Col1Div>
                        <Col2Div sc={screenDim}>
                          <ArrowImg src={tx.type==0 ? inArrow : outArrow} sc={screenDim}/>
                        </Col2Div>
                        <Col3Div sc={screenDim}>{tx.block == -1 ? 'U' : 'C'}</Col3Div>
                        <Col4Div sc={screenDim}>{(tx.value/1e08).toFixed(8).toString()}</Col4Div>
                      </TransactionLi>
                      <Spacer sc={screenDim}/>
                  </TransactionUl>
                  ))}
            </ListDiv>
        )


    }

    componentDidMount() {
      this.setAddressTxList()

      // this.ProcessID = setInterval(
      //   () => this.createTransactionList(),
      //   5000
      // );


      var socket = io(this.props.settings.insightZMQ)
      socket.on('connect', function() {
        socket.emit('subscribe', 'inv')
      })
      socket.on('tx', this.setAddressTxList)
      socket.on('block', this.setAddressTxList)


      // this.ProcessTx = setInterval(
      //   () => this.setAddressTxList(),
      //   5000
      // );

    }

    render () {
        return (
          <div>
            {this.state.transactionList == null
            ? <div></div>
            : this.state.transactionList}
          </div>
        )
    }

  }


TTransactionList.propTypes = {
  secrets:  PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(TTransactionList)
