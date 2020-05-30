import React from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//import axios from 'axios'
//import tdb from '../database/transactions'

import { openRecordset }  from '../database/sqlite'

import {
  ListDiv,
  TransactionUl,
  TransactionLi,
  Col1Div,
  Col2Div,
  Col3Div,
  Col4Div,
  Col5Div,
  Spacer,
  ArrowImg,
  TransactionListLink} from '../components/transactionList'

import inArrow from '../assets/green_arrow.png'
import outArrow from '../assets/red_arrow.png'

class ZTransactionList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      transactionList: null
    }

    this.setTransactionList= this.setTransactionList.bind(this)
    this.createTransactionList = this.createTransactionList.bind(this)
  }

    setTransactionList (b) {
      this.setState({
        transactionList: b
      })
    }



     async createTransactionList () {
      var screenDim = this.props.context.dimensions

      var transactions = []

      //console.log('pre')
      const rs =  await openRecordset(this.props.context.db, 'SELECT txid, outputindex, spent, value, block, type, height '
                                                            +'FROM ('
                                                            +'SELECT txid, outputindex, spent, value, height as block, 0 as type, '
                                                            +'case when height = -1 then 9999999 else height end as height '
                                                            +'FROM Wallet '
                                                            +'Union All '
                                                            +'SELECT spenttxid as txid, 0 as outputindex, spent, sum(value) as value, spent as block, 1 as type, '
                                                            +'case when spent = -1 then 9999999 else spent end as height '
                                                            +'FROM Wallet '
                                                            +'WHERE spent <> 0 '
                                                            +'GROUP BY spenttxid, spent, '
                                                            +'case when spent = -1 then 9999999 else spent end) x '
                                                            +'ORDER BY height DESC, type ASC, outputindex DESC'  )

      //console.log('post')
      for (var r = 0; r < rs.rows.length; r++) {
        if (rs.rows.item(r).txid != null) {
          var transaction = {
            id: rs.rows.item(r).txid + '-' + rs.rows.item(r).outputindex + '-' + rs.rows.item(r).type,
            txid: rs.rows.item(r).txid,
            spent: rs.rows.item(r).spent,
            value: rs.rows.item(r).value,
            block: rs.rows.item(r).block,
            type: rs.rows.item(r).type
          }
          transactions.push(transaction)
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
                            {tx.type==0 ? 'Inbound Private' : 'Outbound Private'}
                          </TransactionListLink>
                        </Col1Div>
                        <Col2Div sc={screenDim}>
                          <ArrowImg src={tx.type==0 ? inArrow : outArrow} sc={screenDim}/>
                        </Col2Div>
                        <Col3Div sc={screenDim}>{tx.block == -1 ? 'U' : 'C'}</Col3Div>
                        <Col4Div sc={screenDim}>{(tx.value/1e08).toFixed(8).toString()}</Col4Div>
                        <Col5Div sc={screenDim}>{tx.type == 0 ? (tx.spent !== 0 ? 'S' : 'U') : ''}</Col5Div>
                      </TransactionLi>
                      <Spacer sc={screenDim}/>
                  </TransactionUl>
                  ))}
            </ListDiv>
        )
    }


    componentDidMount() {
      this.createTransactionList()

      var socket = io(this.props.settings.insightZMQ)
      socket.on('connect', function() {
        socket.emit('subscribe', 'inv')
      })
      socket.on('tx', this.createTransactionList)
      socket.on('block', this.createTransactionList)

      this.ProcessID = setInterval(
        () => this.createTransactionList(),
        5000
      );

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


ZTransactionList.propTypes = {
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
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

export default connect(mapStateToProps, matchDispatchToProps)(ZTransactionList)
