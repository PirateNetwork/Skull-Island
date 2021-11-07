import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {list} from '../utils/litewallet'
import {setWalletInUse} from '../actions/Context'

import {
  setTransactionScrollPos} from '../actions/MainSubPage'

import {
  ZTransactionListMain,
  ZTransactionListOverScroll,
  ZTransactionListUl,
  ZTransactionListLi,
  ZTransactionMemo,
  Col1Div,
  Col2Div,
  Col2All,
  Col3Div,
  Col3Top,
  Col3Bottom,
  Col4Div,
  Col4Top,
  Col4Bottom,
  Col5Div,
  Col5All,
  Col6Div,
  Spacer,
  ArrowImg,
  ZTransactionListBottomSpacer,
  ZTransactionListImg,
  ZTransactionMemoImg,
  ZTransactionMemoButton,
  ZTransactionMemoCloseButton,
  ZTransactionListImgDiv,
  ZTransactionListLink} from '../components/transactionList'

import pirateCoinIcon from '../assets/svg/pirate_coin_icon_darkgrey.svg'
import memoIcon from '../assets/svg/blog_icon.svg'
import linkArrow from '../assets/svg/link_arrow.svg'

class ZTransactionList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      transactionList: null,
      address: '',
      memo: '',
      displayMemo: false,
      txType: 0
    }

    this.scrollRef = React.createRef()
    this.resetScroll = this.resetScroll.bind(this)

    this.setTransactionList= this.setTransactionList.bind(this)
    this.createTransactionList = this.createTransactionList.bind(this)
    this.setMemo = this.setMemo.bind(this)
    this.setDisplayMemo = this.setDisplayMemo.bind(this)
    this.setTxType = this.setTxType.bind(this)
  }

    setTransactionList (b) {this.setState({transactionList: b})}
    setAddress (b) {this.setState({address: b})}
    setMemo (b) {this.setState({memo: b})}
    setDisplayMemo (b) {this.setState({displayMemo: b})}
    setTxType (b)      {this.setState({txType: b})}

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }

     async createTransactionList () {


      var transactions = []
      var index = 0

      this.props.setWalletInUse(true)
      var transactionList = await list()
      this.props.setWalletInUse(false)

      try {
          transactionList = JSON.parse(transactionList)
          transactionList.reverse()

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

              // if (transactionList[t].incoming_metadata_change != null) {
              //     meta = transactionList[t].incoming_metadata_change
              //     for (md = 0; md < meta.length; md++) {
              //         var ictransaction = {
              //               id: transactionList[t].txid + '-icmd' + '-' + md,
              //               txid: transactionList[t].txid,
              //               address: meta[md].address,
              //               value: meta[md].value,
              //               memo: meta[md].memo == null ? '' : meta[md].memo,
              //               block: transactionList[t].block_height == null ? 0 : transactionList[t].block_height,
              //               type: 0,
              //               index: index
              //         }
              //         index++
              //         transactions.push(ictransaction)
              //     }
              // }

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

              // if (transactionList[t].outgoing_metadata_change != null) {
              //     meta = transactionList[t].outgoing_metadata_change
              //     for (md = 0; md < meta.length; md++) {
              //         var octransaction = {
              //               id: transactionList[t].txid + '-ocmd' + '-' + md,
              //               txid: transactionList[t].txid,
              //               address: meta[md].address,
              //               value: meta[md].value * (-1),
              //               memo: meta[md].memo == null ? '' : meta[md].memo,
              //               block: transactionList[t].block_height == null ? 0 : transactionList[t].block_height,
              //               type: 1,
              //               index: index
              //         }
              //         index++
              //         transactions.push(octransaction)
              //     }
              // }


          }
        } catch (err) {
          if (process.env.NODE_ENV != 'production') {
            console.log(err)
          }
        }

      var transactionDisplay = transactions.map((tx) => (
        <ZTransactionListUl key={tx.id} header={false}>
            <ZTransactionListLi>
              <Col1Div>

              </Col1Div>
              <Col2Div>
                <Col2All>
                  <ZTransactionListImgDiv inbound = {tx.type==0 ? true : false}/>
                  <ZTransactionListImg src={pirateCoinIcon}/>
                </Col2All>
              </Col2Div>
              <Col3Div>
                <Col3Top>
                  {tx.type==0 ? 'Incoming' : 'Outgoing'}
                  <ZTransactionMemoButton display = {tx.memo.length + tx.type}
                    onClick = {() => {
                      this.setAddress(tx.address)
                      this.setMemo(tx.memo)
                      this.setDisplayMemo(true)
                      this.setTxType(tx.type)
                    }}>
                    <ZTransactionMemoImg src={memoIcon} />
                  </ZTransactionMemoButton>
                </Col3Top>
                <Col3Bottom inbound = {tx.type==0 ? true : false}>
                  {(tx.type==0 ? '+' : '') + (tx.value/1e08).toFixed(8).toString()}
                </Col3Bottom>
              </Col3Div>
              <Col4Div>
                <Col4Top>
                  {(tx.block == -1 ? 'unconfirmed' : tx.block)}
                </Col4Top>
                <Col4Bottom>
                  {'$' + ((tx.value*this.props.context.currencyValue)/1e08).toFixed(2).toString()}
                </Col4Bottom>
              </Col4Div>
              <Col5Div></Col5Div>
                <Col5All>
                  <ZTransactionListLink href={this.props.settings.explorerURL + 'tx/' + tx.txid}>
                    <ArrowImg src={linkArrow}/>
                  </ZTransactionListLink>
                </Col5All>
              <Col6Div></Col6Div>
            </ZTransactionListLi>
            <Spacer/>
        </ZTransactionListUl>
        ))

        if (this.state.transactionList != transactionDisplay) {
          this.setTransactionList(transactionDisplay)
        }

    }

    componentDidMount() {
      this.createTransactionList()

      //This code gets triggered only once during 'DidMount()'. Set timeout
      //to to the 'synced' refreshtime of 60 seconds. Don't bother to increase
      //refresh interval while syncing
      var refreshTimeout=60000
      console.log('LITEWALLET ztransactionlist createTransactionList() Refresh '+refreshTimeout+' seconds')

      this.ProcessID = setInterval(
        () => this.createTransactionList(),
        refreshTimeout
      );
    }

    componentWillUnmount() {
      clearInterval(this.ProcessID)
    }


    render () {

        var displayMemoSection
        var displayListSection
        if (this.state.displayMemo) {
          displayMemoSection = 'visible'
          displayListSection = 'none'
        } else {
          displayMemoSection = 'none'
          displayListSection = 'visible'
        }

        var addressDescription
        //0='Incoming', 1='Outgoing'
        if (this.state.txType==0) {
          addressDescription="Received ARRR on our Pirate address:"
        } else {
          addressDescription="Sent ARRR to Pirate address:"
        }
        return (
          <ZTransactionListMain>
            <ZTransactionListOverScroll ref = {this.scrollRef} visible = {displayMemoSection}>
              <ZTransactionMemo>
                <br/>
                {addressDescription}
                <br/>
                {this.state.address}
                <br/><br/>
                {'Memo:'}
                <br/>
                {this.state.memo}
                <br/><br/><br/>
                <ZTransactionMemoCloseButton
                  onClick = {() => {
                    this.resetScroll(0)
                    this.setAddress('')
                    this.setMemo('')
                    this.setDisplayMemo(false)
                    this.setTxType(0)
                  }}>
                  {'Close'}
                </ZTransactionMemoCloseButton>
                <br/>
                <ZTransactionListBottomSpacer />
                <ZTransactionListBottomSpacer />
              </ZTransactionMemo>
            </ZTransactionListOverScroll>
            <ZTransactionListOverScroll visible = {displayListSection}>
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
  setWalletInUse: PropTypes.func.isRequired,
  setTransactionScrollPos: PropTypes.func.isRequired,
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
      setWalletInUse,
      setTransactionScrollPos,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ZTransactionList)
