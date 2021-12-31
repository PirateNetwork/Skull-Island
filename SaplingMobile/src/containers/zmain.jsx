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
  setGraphOpen,
  setTransactionScroll,} from '../actions/MainSubPage'

  import {
    setSendToAddress,} from '../actions/SendTo'

import Qr from '../containers/qr'

import {GraphOpenPos, GraphClosedPos} from '../reducers/MainSubPage'

import {
    BlackBackgroundQR,
  }  from '../pagecomponents/PirateShared'

import {
  ZMainDiv,
  ZMainMenu,
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
      graphPosition: GraphClosedPos,
      localGraphState : true,
      tick: null,
      tickTimer: null,
    }

    this.getZerPrice = this.getZerPrice.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.toggleMenu = this.toggleMenu.bind(this)
    this.setGraphPosition = this.setGraphPosition.bind(this)
    this.setLocalGraphState = this.setLocalGraphState.bind(this)
    // this.handleQRScan = this.handleQRScan.bind(this)
    // this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
  }

    setLocalGraphState (b) {
      this.setState({localGraphState: b})
    }

    closeMenu () {
      this.setState({menuOpen: 'none'})
      this.props.setGraphOpen(this.state.localGraphState)
      this.setGraphPosition()
    }

    toggleMenu () {
      if (this.state.menuOpen == 'none') {
        this.props.setGraphOpen(false)
        this.setGraphPosition()
        this.setState({menuOpen: 'block'})
      } else {
        this.props.setGraphOpen(this.state.localGraphState)
        this.setGraphPosition()
        this.setState({menuOpen: 'none'})
      }
    }

    setGraphPosition () {
      if (this.props.mainSubPage.graphOpen) {
        this.setState({graphPosition : GraphOpenPos})
      } else {
        this.setState({graphPosition : GraphClosedPos})
      }
    }

    getZerPrice() {
      if (this.props.mainSubPage.mainPage != 'none') {
        var cmcZerInfoURL = 'https://api.coingecko.com/api/v3/simple/price?ids=pirate-chain&vs_currencies=usd'
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

    // handleQRScan () {
    //   this.props.setAddressScanning(false)
    //   this.props.setQrScanning(true)
    //   // Prepare QR Scanner
    //   QRScanner.prepare(function (err, status) {
    //     // Oh no!
    //     if (err) {
    //       alert(JSON.stringify(err))
    //     }
    //
    //     // If we are authorized to scan, then only do we invoke
    //     // the scan method
    //     if (status.authorized) {
    //       // Start scanning
    //       QRScanner.scan(function (err, address) {
    //         // an error occurred, or the scan was canceled (error code `6`)
    //         if (err) {
    //           alert(JSON.stringify(err))
    //         } else {
    //           // The scan completed, display the contents of the QR code
    //           this.props.setMainPage('none')
    //           this.props.setSendPage('visible')
    //           this.props.setSendToAddress(address)
    //         }
    //
    //         // Set finished scanning
    //         this.props.setQrScanning(false)
    //         QRScanner.destroy()
    //       }.bind(this))
    //
    //       // Show scanning preview
    //       QRScanner.show()
    //
    //       // Set transparency
    //       this.props.setQrScanning(true)
    //     } else if (status.denied) {
    //       // const CUR_LANG = this.props.settings.language
    //       // alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
    //       QRScanner.openSettings()
    //     } else {
    //       // we didn't get permission, but we didn't get permanently denied. (On
    //       // Android, a denial isn't permanent unless the user checks the "Don't
    //       // ask again" box.) We can ask again at the next relevant opportunity.
    //     }
    //   }.bind(this))
    // }
    //
    // safeReleaseCamera () {
    //   // Destroy QR scanner if user goes back
    //   // while scanning
    //   if (this.props.context.qrScanning) {
    //     QRScanner.destroy()
    //     this.props.setQrScanning(false)
    //   }
    // }

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
      // this.safeReleaseCamera()
      clearInterval(this.state.tickTimer)
    }

    render () {

      // if (this.props.context.addrScanning) {
      //    this.handleQRScan()
      // }

      var syncedIndicator

      if (this.props.context.synced) {
        syncedIndicator =
        <svg>
          <ellipse fill="rgba(149,198,35,1)" rx="10" ry="10" cx="10" cy="10">
          </ellipse>
        </svg>
      } else {
        syncedIndicator =
        <svg>
          <ellipse fill="rgba(229,66,18,1)" rx="10" ry="10" cx="10" cy="10">
          </ellipse>
        </svg>
      }

      var syncIndicatorText

      var downloaded
      var remainingBlocks
      // var refreshRemaining
      try {
        if (this.props.context.syncedBlocks == 0) {
          downloaded = 0
          remainingBlocks = -1
          // refreshRemaining = 0.0
        } else {
          downloaded = (this.props.context.syncedBlocks / this.props.context.height * 100).toFixed(2)
          remainingBlocks =  this.props.context.height - this.props.context.syncedBlocks
          if ((remainingBlocks>0) && (downloaded==100))	{
            downloaded=99.99
          }

          //Timeout in milliseconds
          // var refreshTimeout = this.props.context.refreshSecondsRemaining
          // var now = Date.now()
          // if (refreshTimeout>now) {
          //   refreshRemaining = ((refreshTimeout - now)/1000).toFixed(0)
          // } else {
          //   refreshRemaining = 0.0
          // }

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
        if (this.props.context.synced) {
          syncIndicatorText =
          <ZMainSyncIndicator synced = {this.props.context.synced}>
            {'Synced. Block height ' + this.props.context.height.toString()}
          </ZMainSyncIndicator>
        } else {
          if (remainingBlocks>0) {
            syncIndicatorText =
            <ZMainSyncIndicator synced = {this.props.context.synced}>
              { 'Syning ' + downloaded.toString() + '%. '+ remainingBlocks + ' blocks left.'}
            </ZMainSyncIndicator>
          } else {
            syncIndicatorText =
            <ZMainSyncIndicator synced = {this.props.context.synced}>
              {'Synced. Block height ' + this.props.context.height.toString()}
            </ZMainSyncIndicator>
          }
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
  setGraphOpen: PropTypes.func.isRequired,
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
      setGraphOpen,
      setTransactionScroll,
      setSendToAddress,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ZMain)
