import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import axios from 'axios'

import {newZAddress} from '../utils/litewallet'

import {
  setZerInBtcValue,
  setZerInCurrencyValue,
  setQrScanning,
  setAddressScanning} from '../actions/Context'

import {
  setMainPage,
  setSendPage,
  setReceivePage,
  setPassPhrasePage,
  setReindexPage,
  setTransactionScroll,} from '../actions/MainSubPage'

  import {
    setSendToAddress,} from '../actions/SendTo'

import Qr from '../containers/qr'

import {
    BlackBackgroundQR,
  }  from '../pagecomponents/PirateShared'

import {
  ZMainDiv,
  ZMainMenu,
  ZMainSVG,
  ZMainMenuZSynced,
  ZMainMenuButton,
  ZMainMenuButtonImg,
  ZMainMenuContentButtons,
  ZMainCenteredDiv,
  ZMainMenuContent,
  ZMainMenuContentImg,
  ZMainMenuButtonLine,
  ZMainAddressListHeader,
  ZMainAddressList,
  ZMainTransactionListHeader,
  ZMainTransactionList,
  ZMainMiddleSection,
  ZMainSyncIndicator,
  ZMainLowerSection} from '../components/zmain'

import menuIcon from '../assets/svg/menu_icon.svg'
import menuPopup from '../assets/svg/modal_popup.svg'


import ZTransactionList from '../containers/ztransactionlist'
import ZAddressList from '../containers/zaddresslist'

class ZMain extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      menuOpen: 'none',
      scrollPosition: 0,
      tick: null,
      tickTimer: null,
    }

    this.getZerPrice = this.getZerPrice.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
  }

    getZerPrice() {
      if (this.props.mainSubPage.mainPage != 'none') {
        var cmcZerInfoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=pirate-chain&vs_currencies=usd'
        try {
          axios.get(cmcZerInfoURL)
            .then((resp) => {
              try {
                const coinmarketcapData = resp.data
                const priceCurrency = parseFloat(coinmarketcapData['pirate-chain'].usd)
                this.props.setZerInCurrencyValue(priceCurrency)

              } catch (err) {
                if (process.env.NODE_ENV != 'production') {
                  console.log(err)
                }
              }
          })
        } catch (err) {
          if (process.env.NODE_ENV != 'production') {
            console.log(err)
          }
        }

        cmcZerInfoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=pirate-chain&vs_currencies=btc'
        axios.get(cmcZerInfoURL)
          .then((resp) => {
            try {
              const coinmarketcapData = resp.data
              const priceBtc = parseFloat(coinmarketcapData['pirate-chain'].btc)
              this.props.setZerInBtcValue(priceBtc)
            } catch (err) {
              if (process.env.NODE_ENV != 'production') {
                console.log(err)
              }
            }
        })
      }
    }

    closeMenu () {
      this.setState({menuOpen: 'none'})
    }

    toggleMenu () {
      if (this.state.menuOpen == 'none') {
        this.setState({menuOpen: 'block'})
      } else {
        this.setState({menuOpen: 'none'})
      }
    }

    componentDidMount() {
      window.addEventListener("click", this.closeMenu)

      this.getZerPrice()
      this.PriceID = setInterval(() => this.getZerPrice(),30000)

      const updateTickIDLong = setInterval(
        () => {
          this.setState({tick: Date.now()})
        },
        1000
      )
      this.setState({tickTimer: updateTickIDLong})

    }

    componentWillUnmount() {
      window.removeEventListener("click", this.closeMenu)
      clearInterval(this.PriceID)
      clearInterval(this.state.tickTimer)
    }

    render () {

      var syncedIndicator

      if (this.props.context.synced) {
        syncedIndicator =
        <ZMainSVG>
          <ellipse fill="rgba(149,198,35,1)" rx="10" ry="10" cx="10" cy="10">
          </ellipse>
        </ZMainSVG>
      } else {
        syncedIndicator =
        <ZMainSVG>
          <ellipse fill="rgba(229,66,18,1)" rx="10" ry="10" cx="10" cy="10">
          </ellipse>
        </ZMainSVG>
      }

      var syncIndicatorText
      var downloaded
      var remainingBlocks

      try {
        if (this.props.context.syncedBlocks == 0) {
          downloaded = 0
          remainingBlocks = -1
        } else {
          downloaded = (this.props.context.syncedBlocks / this.props.context.height * 100).toFixed(2)
          remainingBlocks =  this.props.context.height - this.props.context.syncedBlocks
          if ((remainingBlocks>0) && (downloaded==100))	{
            downloaded=99.99
          }

        }
      } catch (err) {
        downloaded = 0
        remainingBlocks = -1
        // refreshTimeout = -1
      }

      if (this.props.context.walletError)
      {
        syncIndicatorText =
        <ZMainSyncIndicator synced = {0}>
            { 'Wallet Error' }
        </ZMainSyncIndicator>
      } else {
        try {
          if (this.props.context.synced) {
            syncIndicatorText =
            <ZMainSyncIndicator synced = {this.props.context.synced}>
              {'Synced. Block height ' + this.props.context.height.toString()}
            </ZMainSyncIndicator>
          } else {
            if (remainingBlocks>0) {
              syncIndicatorText =
              <ZMainSyncIndicator synced = {this.props.context.synced}>
                { 'Syncing ' + downloaded.toString() + '%. '+ remainingBlocks + ' blocks left.'}
              </ZMainSyncIndicator>
            } else {
              syncIndicatorText =
              <ZMainSyncIndicator synced = {this.props.context.synced}>
                {'Synced. Block height ' + this.props.context.height.toString()}
              </ZMainSyncIndicator>
            }
          }
        } catch {
            <ZMainSyncIndicator synced = {0}>
                { 'Wallet Error' }
            </ZMainSyncIndicator>
        }
      }
      const scanning =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0', display: 'visible'}

      return (
        <ZMainDiv visible={this.props.mainSubPage.mainPage}>
          <BlackBackgroundQR qrScanning = {scanning}>
            <ZMainMenu>
              <ZMainMenuButton
                onClick={ e => {
                  e.stopPropagation()
                  this.toggleMenu()}}>
                <ZMainCenteredDiv>
                  <ZMainMenuButtonImg src={menuIcon}/>
                </ZMainCenteredDiv>
              </ZMainMenuButton>

              <ZMainMenuZSynced>
                {syncedIndicator}
                {syncIndicatorText}
              </ZMainMenuZSynced>

              <ZMainMenuContent visible={this.state.menuOpen} size={3}>
                <ZMainMenuContentImg src={menuPopup}/>
                <ZMainMenuContentButtons>
                  <ZMainMenuButtonLine pos={3.0}
                  onClick={() => {
                    this.props.setMainPage('none')
                    this.props.setPassPhrasePage('visible')
                  }}
                  >
                  {'Seed Phrase'}
                  </ZMainMenuButtonLine>

                  <ZMainMenuButtonLine pos={0.5}
                  onClick={() => {
                    this.props.setMainPage('none')
                    this.props.setReindexPage('visible')
                  }}
                  >
                  {'Rescan'}
                  </ZMainMenuButtonLine>
                  <ZMainMenuButtonLine pos={-2.0}
                  onClick={() => {
                    newZAddress()
                  }}
                  >
                  {'New Address'}
                  </ZMainMenuButtonLine>
                </ZMainMenuContentButtons>
              </ZMainMenuContent>
            </ZMainMenu>

            <ZMainMiddleSection>
              <ZMainAddressListHeader>
                {'Wallet Addresses'}
              </ZMainAddressListHeader>
              <ZMainAddressList>
                <ZAddressList/>
              </ZMainAddressList>
            </ZMainMiddleSection>

            <ZMainLowerSection>
              <ZMainTransactionListHeader>
                {'Wallet Transactions'}
              </ZMainTransactionListHeader>
              <ZMainTransactionList>
                <ZTransactionList/>
              </ZMainTransactionList>
            </ZMainLowerSection>

          </BlackBackgroundQR>
          <Qr />

        </ZMainDiv>
      )
    }

  }


ZMain.propTypes = {
  setZerInBtcValue: PropTypes.func.isRequired,
  setZerInCurrencyValue: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setPassPhrasePage: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired,
  setAddressScanning: PropTypes.func.isRequired,
  setTransactionScroll: PropTypes.func.isRequired,
  setSendToAddress:  PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setZerInBtcValue,
      setZerInCurrencyValue,
      setReindexPage,
      setMainPage,
      setSendPage,
      setReceivePage,
      setPassPhrasePage,
      setQrScanning,
      setAddressScanning,
      setTransactionScroll,
      setSendToAddress,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ZMain)
