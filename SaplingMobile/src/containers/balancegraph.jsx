import React from 'react';
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { openRecordset }  from '../database/sqlite'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  YAxis,} from 'recharts'

import {
  BalanceGraphDiv,
  BalanceGraphArea,
  BalanceGraphBackground,
  BalanceGraphButtonDiv,
  BalanceGraphButton} from '../components/balancegraph'

class BalanceGraph extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      transactionData: [{block: 0, value: 0, balance: 0}],
    }

    this.range = 'all'
    this.setTransactionData = this.setTransactionData.bind(this)
    this.createGraphData = this.createGraphData.bind(this)
    this.setupSocket = this.setupSocket.bind(this)
  }


  setTransactionData (d) {this.setState({transactionData: d})}

  async createGraphData () {

    var minPoint = this.props.settings.minimumBlock[this.props.settings.currentCoin]
    var maxPoint = this.props.context.zHeight
    var blockTime = 60
    var interval

    switch (this.range) {
      case 'hour':
          interval = ((60 * 60)/blockTime)/10
          minPoint = (maxPoint - (interval*10))
        break;
      case 'day':
          interval = ((60 * 60 * 24)/blockTime)/10
          minPoint = (maxPoint - (interval*10))
        break;
      case 'week':
          interval = ((60 * 60 * 24 * 7)/blockTime)/10
          minPoint = (maxPoint - (interval*10))
        break;
      case 'month':
          interval = ((60 * 60 * 24 * 30)/blockTime)/10
          minPoint = (maxPoint - (interval*10))
        break;
      default:
          interval = (maxPoint - minPoint)/10
    }

    if (minPoint < this.props.settings.minimumBlock[this.props.settings.currentCoin]) {
      minPoint = this.props.settings.minimumBlock[this.props.settings.currentCoin]
      interval = (maxPoint - minPoint)/10
    }

    var points =[]

    points.push({
      block: Math.floor(minPoint),
      balance: 0,
      value: 0
    })
    for (var i = 1; i < 9; i++) {
      points.push({
        block: Math.floor(minPoint + (i*interval)),
        balance: 0,
        value: 0
      })
    }
    points.push({
      block: Math.floor(maxPoint),
      balance: 0,
      value: 0
    })

    const rs =  await openRecordset(this.props.context.db, 'SELECT sum(case when type = 0 then value else -value end) as value, block '
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
                                                          +'WHERE height<>9999999 '
                                                          +'GROUP BY block '
                                                          +'ORDER BY height ASC '  )

    if (rs != null) {
      for (var r = 0; r < rs.rows.length; r++) {
        if (rs.rows.item(r).block != null) {
          for (var j = 0; j < points.length; j++){
            if (points[j].block >= rs.rows.item(r).block) {
              points[j].balance += rs.rows.item(r).value/1e08
              if ((points[j].balance > points[j].value && j < points.length - 1) || j == points.length - 1) {
                points[j].value = points[j].balance
              }
            }
          }
        }
      }
    }
    this.setTransactionData(points)

    if (maxPoint == 0) {
      setTimeout(() => {this.createGraphData()},500)
    }
  }

  setupSocket() {
    if (!this.state.Socket) {
      if (this.props.context.insightSocket != false) {
        if (this.props.context.zSynced) {
          this.setState({Socket: true})
          var socket = this.props.context.insightSocket
          socket.on('tx', this.createGraphData)
          socket.on('block', this.createGraphData)
          clearInterval(this.setSocketGID)
          this.setSocketGID = setInterval(() => this.setupSocket(),120000)
        } else {
          this.createGraphData()
          clearInterval(this.setSocketGID)
          this.setSocketGID = setInterval(() => this.setupSocket(),120000)
        }
      } else {
        console.log('Transaction List Socket not set, waiting')
      }
    }
  }

  componentDidMount() {
    this.range = 'all'
    this.createGraphData()
    this.setSocketGID = setInterval(() => this.setupSocket(),500)
    this.setBalanceID = setInterval(() => this.createGraphData,30000)
  }

  componentWillUnmount() {
      clearInterval(this.setSocketGID)
      clearInterval(this.setBalanceID)
  }

  render() {

    var graphStatus
    if (this.props.mainSubPage.zmainPage == 'visible') {
      graphStatus = this.props.mainSubPage.graphOpen
    } else {
      graphStatus = false
    }

    return (
      <BalanceGraphDiv graphOpen = {graphStatus}>
        <BalanceGraphBackground graphOpen = {graphStatus} zmain={this.props.mainSubPage.zmainPage}>
          <BalanceGraphArea graphOpen = {graphStatus}>
            <ResponsiveContainer>
              <AreaChart data={this.state.transactionData}
                margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                <defs>
                  <linearGradient id="blocks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#bb9645" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#bb9645" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <YAxis mirror = {true} tickLine = {false}/>
                <Area type="monotone" dataKey="value" stroke="#bb9645" fill="url(#blocks)"  />
              </AreaChart>
            </ResponsiveContainer>
          </BalanceGraphArea>
        </BalanceGraphBackground>
        <BalanceGraphButtonDiv graphOpen = {graphStatus}>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 0}
            onClick = {() => {
              this.range = 'hour'
              this.createGraphData()
            }}>
            Hour
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 1}
            onClick = {() => {
              this.range = 'day'
              this.createGraphData()
            }}>
            Day
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 2}
            onClick = {() => {
              this.range = 'week'
              this.createGraphData()
            }}>
            Week
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 3}
            onClick = {() => {
              this.range = 'month'
              this.createGraphData()
            }}>
            Month
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 4}
            onClick = {() => {
              this.range = 'all'
              this.createGraphData()
            }}>
            All
          </BalanceGraphButton>
        </BalanceGraphButtonDiv>
      </BalanceGraphDiv>
    )


  }
}


BalanceGraph.propTypes = {
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
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(BalanceGraph)
