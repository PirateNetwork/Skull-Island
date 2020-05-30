import React from 'react'
import PropTypes from 'prop-types'
import io from 'socket.io-client'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import axios from 'axios'

import {
  setTAddress,
  setTPrivateKey,
  setTBalance} from '../actions/Context'

import { setInsightAPI } from '../actions/Settings'

import { ChainSyncGrid,
         TitleDiv,
         AddressDiv,
         ImgDiv,
         LogoImg,
         SyncDiv,
         BalanceDiv,
         BalanceNumberDiv,
         CurrencyDiv} from '../components/chainsync'

import { coins } from '../utils/coins.js'


class ChainTApi extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      blockHeight: 0
    }

    this.getBalance = this.getBalance.bind(this)
    this.setBlockHeight = this.setBlockHeight.bind(this)
    this.getBlockHeight = this.getBlockHeight.bind(this)
    this.getChainInfo = this.getChainInfo.bind(this)
  }

    setBlockHeight(n) {this.setState({blockHeight: n})}

    async getBalance() {
      try {
        const address = this.props.secrets.items[0].address
        const response = await axios.get(this.props.settings.insightAPI + 'insight-api-zero/addr/' + address + '/' )
        const balance = parseFloat(response.data.balance) * 1e08
        this.props.setTBalance(balance)
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }

    async getBlockHeight() {
      try {
        const response = await axios.get(this.props.settings.insightAPI + 'insight-api-zero/status')
        this.setBlockHeight(response.data.info.blocks)
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }

    getChainInfo() {
      this.getBalance()
      this.getBlockHeight()
    }

    componentDidMount() {

      this.getChainInfo()

      this.props.setTAddress(this.props.secrets.items[0].address)
      this.props.setTPrivateKey(this.props.secrets.items[0].privateKey)

      // this.ChainApiID = setInterval(
      //   () => this.getChainInfo(),
      //   120000
      // )

      var socket = io(this.props.settings.insightZMQ)
      socket.on('connect', function() {
        // Join the room.
        socket.emit('subscribe', 'inv')
      })
      socket.on('tx', this.getChainInfo)
      socket.on('block', this.getChainInfo)

    }

    componentWillUnmount() {
    }




    render () {

      var screenDim = this.props.context.dimensions
      const address = this.props.secrets.items[0].address
      //const privateKey = this.props.secrets.items[0].privateKey

      return (
        <ChainSyncGrid sc={screenDim}>
            <TitleDiv sc={screenDim}>
              Transparent Address
            </TitleDiv>
            <AddressDiv sc={screenDim}>
              {address.substring(0,8) + '...' + address.substring(address.length-8,address.length)}
            </AddressDiv>
            <SyncDiv sc={screenDim}>
              Block Height
              <br/>
              {this.state.blockHeight}
            </SyncDiv>
            <BalanceDiv sc={screenDim}>
                Zer Balance
                <br/>
              <BalanceNumberDiv sc={screenDim}>
                {(this.props.context.tBalance / 1e08).toFixed(8)}
              </BalanceNumberDiv>
              <CurrencyDiv sc={screenDim}>
                {((this.props.context.tBalance / 1e08) * this.props.context.BTCValue).toFixed(8) + ' BTC'}
                <br/>
                {((this.props.context.tBalance / 1e08)  * this.props.context.currencyValue).toFixed(6) + ' USD'}
              </CurrencyDiv>
              <br/>
            </BalanceDiv>
            <ImgDiv sc={screenDim}>
              <LogoImg src={coins['zero'].icon} sc={screenDim} />
            </ImgDiv>
        </ChainSyncGrid>
      )
    }
}


ChainTApi.propTypes = {
  setInsightAPI: PropTypes.func.isRequired,
  setTAddress: PropTypes.func.isRequired,
  setTPrivateKey: PropTypes.func.isRequired,
  setTBalance: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired
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
      setTAddress,
      setTPrivateKey,
      setTBalance,
      setInsightAPI
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChainTApi)
