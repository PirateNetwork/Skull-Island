import React from 'react';
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {list} from '../utils/litewallet'
import {setWalletInUse} from '../actions/Context'

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
  }


  setTransactionData (d) {this.setState({transactionData: d})}

  async createGraphData (manualRefresh) {

    var minPoint = this.props.settings.minimumBlock[this.props.settings.currentCoin]
    var maxPoint = this.props.context.height
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

    this.props.setWalletInUse(true)
    var transactionList = await list()
    this.props.setWalletInUse(false)

    try {
        transactionList = JSON.parse(transactionList)

        for (var t = 0; t < transactionList.length; t++) {
            var md
            var meta
            var j

            if (transactionList[t].incoming_metadata != null) {
                meta = transactionList[t].incoming_metadata
                for (md = 0; md < meta.length; md++) {
                    for (j = 0; j < points.length; j++){
                        if (points[j].block >= transactionList[t].block_height) {
                            points[j].balance += meta[md].value/1e08
                            if ((points[j].balance > points[j].value && j < points.length - 1) || j == points.length - 1) {
                              points[j].value = points[j].balance
                            }
                        }
                    }
                }
            }


            if (transactionList[t].outgoing_metadata != null) {
                meta = transactionList[t].outgoing_metadata
                for (md = 0; md < meta.length; md++) {
                    for (j = 0; j < points.length; j++){
                        if (points[j].block >= transactionList[t].block_height) {
                            points[j].balance += (meta[md].value/1e08) * (-1)
                            if ((points[j].balance > points[j].value && j < points.length - 1) || j == points.length - 1) {
                              points[j].value = points[j].balance
                            }
                        }
                    }
                }
            }
        }
    } catch (err) {
        if (process.env.NODE_ENV != 'production') {
            console.log(err)
        }
    }

    this.setTransactionData(points)
    if (!manualRefresh) {
      clearTimeout(this.GraphID)
      if (maxPoint == 0) {
        this.GraphID = setTimeout(() => {this.createGraphData(false)},500)
      } else {
        this.GraphID = setTimeout(() => {this.createGraphData(false)},5000)
      }
    }
  }

  componentDidMount() {
    this.createGraphData(false)
  }

  componentWillUnmount() {
    clearTimeout(this.GraphID)
  }

  render() {

    var graphStatus
    if (this.props.mainSubPage.mainPage == 'visible') {
      graphStatus = this.props.mainSubPage.graphOpen
    } else {
      graphStatus = false
    }

    return (
      <BalanceGraphDiv graphOpen = {graphStatus}>
        <BalanceGraphBackground graphOpen = {graphStatus} zmain={this.props.mainSubPage.mainPage}>
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
              this.createGraphData(true)
            }}>
            Hour
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 1}
            onClick = {() => {
              this.range = 'day'
              this.createGraphData(true)
            }}>
            Day
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 2}
            onClick = {() => {
              this.range = 'week'
              this.createGraphData(true)
            }}>
            Week
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 3}
            onClick = {() => {
              this.range = 'month'
              this.createGraphData(true)
            }}>
            Month
          </BalanceGraphButton>
          <BalanceGraphButton graphOpen = {graphStatus} hPosition={0.19 * 4}
            onClick = {() => {
              this.range = 'all'
              this.createGraphData(true)
            }}>
            All
          </BalanceGraphButton>
        </BalanceGraphButtonDiv>
      </BalanceGraphDiv>
    )


  }
}


BalanceGraph.propTypes = {
  setWalletInUse: PropTypes.func.isRequired,
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
      setWalletInUse
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(BalanceGraph)
