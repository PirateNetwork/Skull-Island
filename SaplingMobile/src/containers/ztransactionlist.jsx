import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { openRecordset }  from '../database/sqlite'

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
      memo: '',
      displayMemo: false
      // localScroll: false,
    }

    // this.scrollRef = React.createRef()
    // this.localScrollPosition = 0

    this.setTransactionList= this.setTransactionList.bind(this)
    this.createTransactionList = this.createTransactionList.bind(this)
    this.setupSocket = this.setupSocket.bind(this)
    this.setMemo = this.setMemo.bind(this)
    this.setDisplayMemo = this.setDisplayMemo.bind(this)
    // this.checkScroll = this.checkScroll.bind(this)
    // this.setLocalScroll = this.setLocalScroll.bind(this)
  }

    setTransactionList (b) {this.setState({transactionList: b})}
    setMemo (b) {this.setState({memo: b})}
    setDisplayMemo (b) {this.setState({displayMemo: b})}
    // setLocalScroll (b) {this.setLocalScroll({localScroll: b})}

     async createTransactionList () {

      var transactions = []

      const rs =  await openRecordset(this.props.context.db, 'SELECT address, txid, outputindex, spent, value, block, type, height, memo '
                                                            +'FROM ('
                                                            +'SELECT address, txid, outputindex, spent, value, height as block, 0 as type, memo, '
                                                            +'case when height = -1 then 9999999 else height end as height '
                                                            +'FROM Wallet '
                                                            +'Where type in (0,1  and change = 0) '
                                                            +'Union All '
                                                            +'SELECT address, txid, outputindex, spent, value, height as block, 1 as type, memo, '
                                                            +'case when height = -1 then 9999999 else height end as height '
                                                            +'FROM Wallet '
                                                            +'Where type in (2,3) and change = 0) x '
                                                            +'Where value <> 0 '
                                                            +'ORDER BY height DESC, type ASC, outputindex DESC'  )



      for (var r = 0; r < rs.rows.length; r++) {
        if (rs.rows.item(r).txid != null) {
          var transaction = {
            id: rs.rows.item(r).txid + '-' + rs.rows.item(r).outputindex + '-' + rs.rows.item(r).type,
            txid: rs.rows.item(r).txid,
            spent: rs.rows.item(r).spent,
            value: rs.rows.item(r).value,
            block: rs.rows.item(r).block,
            type: rs.rows.item(r).type,
            memo: rs.rows.item(r).memo
          }
          transactions.push(transaction)
        }
      }

      var transactionList = transactions.map((tx) => (
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
                  <ZTransactionMemoButton display = {tx.memo.length}
                    onClick = {() => {
                      this.setMemo(tx.memo)
                      this.setDisplayMemo(true)
                    }}>
                    <ZTransactionMemoImg src={memoIcon} />
                  </ZTransactionMemoButton>
                </Col3Top>
                <Col3Bottom inbound = {tx.type==0 ? true : false}>
                  {(tx.type==0 ? '+' : '-') + (tx.value/1e08).toFixed(8).toString()}
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

        if (this.state.transactionList != transactionList) {
          this.setTransactionList(transactionList)
        }

    }

    setupSocket() {
      if (!this.state.Socket) {
        if (this.props.context.insightSocket != false) {
          if (this.props.context.zSynced) {
            this.setState({Socket: true})
            var socket = this.props.context.insightSocket
            socket.on('tx', this.createTransactionList)
            socket.on('block', this.createTransactionList)
            clearInterval(this.setSocketTID)
            this.setSocketTID = setInterval(() => this.setupSocket(),120000)
          } else {
            this.createTransactionList()
            clearInterval(this.setSocketTID)
            this.setSocketTID = setInterval(() => this.setupSocket(),120000)
          }
        } else {0
          console.log('Transaction List Socket not set, waiting')
        }
      }
    }


    componentDidMount() {
      this.createTransactionList()
      this.setSocketTID = setInterval(() => this.setupSocket(),500)
      this.setTransactionID = setInterval(() => this.createTransactionList,30000)
    }

    componentWillUnmount() {
        clearInterval(this.setSocketTID)
        clearInterval(this.setTransactionID)
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


        return (
          <ZTransactionListMain>
            <ZTransactionListOverScroll visible = {displayMemoSection}>
              <ZTransactionMemo>
                <br/>
                {'Memo:'}
                <br/><br/>
                {this.state.memo}
                <br/><br/><br/>
                <ZTransactionMemoCloseButton
                  onClick = {() => {
                    this.setMemo('')
                    this.setDisplayMemo(false)
                  }}>
                  {'Close Memo'}
                </ZTransactionMemoCloseButton>
                <br/>
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
      setTransactionScrollPos,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ZTransactionList)
