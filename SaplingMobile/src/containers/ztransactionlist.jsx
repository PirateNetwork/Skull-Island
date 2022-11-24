import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setWalletInUse,
  setTx,
  setViewingTx} from '../actions/Context'

import {
  setMainPage,
  setTransactionPage,} from '../actions/MainSubPage'

import {
  setTransactionScrollPos} from '../actions/MainSubPage'

import {
  ZTransactionListMain,
  ZTransactionListOverScroll,
  ZTransactionListUl,
  ZTransactionListLi,
  Col1Div,
  Col2Div,
  Col2All,
  Col3Div,
  Col3Top,
  Col4Div,
  Col4Top,
  Col5Div,
  Col5All,
  Col6Div,
  Col7Div,
  Col7All,
  Spacer,
  ZTransactionListBottomSpacer,
  ZTransactionListImg,
  ZTransactionMemoImg,
  ZTransactionMemoButton,
  ZTransactionListImgDiv,
  } from '../components/transactionList'

import pirateCoinIcon from '../assets/svg/pirate_coin_icon_darkgrey.svg'
import memoIcon from '../assets/svg/blog_icon.svg'

class ZTransactionList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      transactionList: null,
      txList: null,
      address: '',
      txType: 0,
      transactionTimer: null,
    }

    this.scrollRef = React.createRef()
    this.resetScroll = this.resetScroll.bind(this)

    this.setTransactionList= this.setTransactionList.bind(this)
    this.setTxList= this.setTxList.bind(this)
    this.createTransactionList = this.createTransactionList.bind(this)
    this.setTxType = this.setTxType.bind(this)
    this.setTxLocal = this.setTxLocal.bind(this)
    this.updateTransactions = this.updateTransactions.bind(this)
  }

    setTransactionList (b) {this.setState({transactionList: b})}
    setTxList (b) {this.setState({txList: b})}
    setAddress (b) {this.setState({address: b})}
    setTxType (b) {this.setState({txType: b})}

    setTxLocal(b) {
      this.props.setTx(b)
      this.props.setViewingTx(true)
      this.props.setMainPage('none')
      this.props.setTransactionPage('visible')
    }

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }

    createTransactionList () {

      var transactions = []
      var index = 0
      var transactionList = this.props.context.txList
      this.setTxList(transactionList)

      if (transactionList != null) {
          try {

              for (var t = 0; t < transactionList.length; t++) {
                  var md
                  var meta
                  if (transactionList[t].incoming_metadata != null) {
                      meta = transactionList[t].incoming_metadata
                      for (md = 0; md < meta.length; md++) {
                          var itransaction = {
                                id: transactionList[t].txid + '-imd' + '-' + md,
                                txid: transactionList[t].txid,
                                address: meta[md].address,
                                value: meta[md].value,
                                memo: meta[md].memo == null ? '' : meta[md].memo,
                                block: transactionList[t].block_height == null ? -1 : transactionList[t].block_height,
                                type: 0,
                                index: index
                          }
                          index++
                          transactions.push(itransaction)
                      }
                  }

                  if (transactionList[t].outgoing_metadata != null) {
                      meta = transactionList[t].outgoing_metadata
                      for (md = 0; md < meta.length; md++) {
                          var otransaction = {
                                id: transactionList[t].txid + '-omd' + '-' + md,
                                txid: transactionList[t].txid,
                                address: meta[md].address,
                                value: meta[md].value * (-1),
                                memo: meta[md].memo == null ? '' : meta[md].memo,
                                block: transactionList[t].block_height == null ? -1 : transactionList[t].block_height,
                                type: 1,
                                index: index
                          }
                          index++
                          transactions.push(otransaction)
                      }
                  }

              }
          } catch (err) {
              if (process.env.NODE_ENV != 'production') {
                console.log(err)
              }
          }
      }

      var transactionDisplay = transactions.map((tx) => (
        <ZTransactionListUl key={tx.id} header={false}>

            <ZTransactionMemoButton
              onClick = {() => {
                this.setTxLocal(tx)
              }}>
                <ZTransactionListLi>
                  <Col1Div></Col1Div>
                  <Col2Div>
                    <Col2All>
                      <ZTransactionListImgDiv inbound = {tx.type==0 ? true : false}>
                        <ZTransactionListImg src={pirateCoinIcon}/>
                      </ZTransactionListImgDiv>
                    </Col2All>
                  </Col2Div>
                  <Col3Div>
                    <Col3Top>
                      {(tx.block == -1 ? 'unconfirmed' : tx.block)}
                    </Col3Top>

                  </Col3Div>
                  <Col4Div>
                    <Col4Top>
                        <ZTransactionMemoImg src={memoIcon} opacity = {tx.memo != '' ? 1 : 0}/>
                    </Col4Top>
                  </Col4Div>
                  <Col5Div>
                    <Col5All inbound = {tx.type==0 ? true : false}>
                      {(tx.type==0 ? '+' : '') + (tx.value/1e08).toFixed(8).toString()}
                    </Col5All>
                  </Col5Div>
                  <Col6Div></Col6Div>
                  <Col7Div>
                    <Col7All></Col7All>
                  </Col7Div>
                </ZTransactionListLi>
            </ZTransactionMemoButton>
            <Spacer/>
        </ZTransactionListUl>
        ))

        this.setTransactionList(transactionDisplay)
    }

    updateTransactions() {
        if (this.state.txList != this.props.context.txList) {
            this.createTransactionList()
        }

        const transactionTimerIDLong = setTimeout(
          () => {
            this.updateTransactions()
          },
          50
        )
        this.setState({transactionTimer: transactionTimerIDLong})
    }

    componentDidMount() {
        this.updateTransactions()
    }

    componentWillUnmount() {
        clearTimeout(this.state.transactionTimer)
    }


    render () {
        return (
          <ZTransactionListMain>
            <ZTransactionListOverScroll>
              {this.state.transactionList == null
              ? <div></div>
              : this.state.transactionList}
              <br/>
              <ZTransactionListBottomSpacer />
            </ZTransactionListOverScroll>
          </ZTransactionListMain>
        )
    }
  }




ZTransactionList.propTypes = {
  setTx: PropTypes.func.isRequired,
  setViewingTx: PropTypes.func.isRequired,
  setWalletInUse: PropTypes.func.isRequired,
  setTransactionScrollPos: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setTransactionPage: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setTx,
      setViewingTx,
      setWalletInUse,
      setTransactionScrollPos,
      setMainPage,
      setTransactionPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ZTransactionList)
