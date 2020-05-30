import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Qr from '../containers/qr'

import axios from 'axios'

import { setSecretPhrase, setSecretItems } from '../actions/Secrets'
import {
  encrypt,
  saltHashPassword,
  KeySalt}from '../utils/hash'

import { setMinimumBlock } from '../actions/Settings'

import {setQrScanning} from '../actions/Context'

import RandomWords from 'random-words'

import { LoginGrid,
         LoginForm,
         LoginFormOpaque,
         LoginHeading,
         LoginHeadingImg,
         LoginPassword} from '../components/login'

 import { WalletKey,
          WalletButtonContainer,
          WalletPhraseButton,
          WalletQRButton,
          WalletSetButton} from '../components/wallet'

import heading from '../assets/zero-logo-white.png'

class SetWalletPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      tempSecretPhrase: '',
      currentHeight: 0
    }

    this.handleLoadWallet = this.handleLoadWallet.bind(this)
    this.handleNewWallet = this.handleNewWallet.bind(this)
    this.setTempSecretPhrase = this.setTempSecretPhrase.bind(this)
    this.setCurrentHeight = this.setCurrentHeight.bind(this)
    this.setWalletToCurrentBlock = this.setWalletToCurrentBlock.bind(this)
    this.getCurrentBlock = this.getCurrentBlock.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
  }

  setTempSecretPhrase (p) {this.setState({tempSecretPhrase: p})}
  setCurrentHeight(p) {this.setState({currentHeight: p})}

  setWalletToCurrentBlock () {

    var minBlock = this.props.settings.minimumBlock
    minBlock[this.props.settings.currentCoin] = this.state.currentHeight
    this.props.setMinimumBlock(minBlock)
    this.handleLoadWallet(this.state.tempSecretPhrase)
  }

  async getCurrentBlock () {
    if (this.state.currentHeight == 0) {
      try {
        var response = await axios.get(this.props.settings.insightAPI + 'insight-api-zero/status')
        this.setCurrentHeight(Number(response.data.info.blocks))
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }
  }

  handleNewWallet () {
    // generate random phrase
    var randomPhrase = RandomWords({exactly: 16, minLength: 4})
    randomPhrase = randomPhrase.join(' ')
    this.setTempSecretPhrase(randomPhrase)
  }

  handleLoadWallet (phrase) {
    //console.log(this.props.context.activePassword)
    var keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
    var encryptedPhrase = encrypt(phrase, keyHash)
    this.props.setSecretPhrase(encryptedPhrase)
    this.props.setHasExistingWallet(true)
  }

  handleQRScan () {
    // Prepare QR Scanner
    QRScanner.prepare(function (err, status) {
      // Oh no!
      if (err) {
        alert(JSON.stringify(err))
      }

      // If we are authorized to scan, then only do we invoke
      // the scan method
      if (status.authorized) {
        // Start scanning
        QRScanner.scan(function (err, address) {
          // an error occurred, or the scan was canceled (error code `6`)
          if (err) {
            alert(JSON.stringify(err))
          } else {
            // The scan completed, display the contents of the QR code
            this.setState({
              tempSecretPhrase: address
            })
          }

          // Set finished scanning
          this.props.setQrScanning(false)
          QRScanner.destroy()
        }.bind(this))

        // Show scanning preview
        QRScanner.show()

        // Set transparency
        this.props.setQrScanning(true)
      } else if (status.denied) {
        // const CUR_LANG = this.props.settings.language
        // alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
        QRScanner.openSettings()
      } else {
        // we didn't get permission, but we didn't get permanently denied. (On
        // Android, a denial isn't permanent unless the user checks the "Don't
        // ask again" box.) We can ask again at the next relevant opportunity.
      }
    }.bind(this))
  }

  safeReleaseCamera () {
    // Destroy QR scanner if user goes back
    // while scanning
    if (this.props.context.qrScanning) {
      QRScanner.destroy()
      this.props.setQrScanning(false)
    }
  }

  componentDidMount () {
    this.handleNewWallet()
    this.getCurrentBlock()
  }

  componentWillUnmount () {
    this.safeReleaseCamera()
  }

    render () {
      const mainStyle =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0'}
      const screenDim = this.props.context.dimensions

      var buttonDisplay = 'none'
      if (this.state.tempSecretPhrase.length >= 16 && this.state.currentHeight != 0) {
        buttonDisplay = 'visible'
      }

      return (
      <div>
        <div style={mainStyle}>
          <LoginGrid sc={screenDim}>
            <LoginForm sc={screenDim}>
            </LoginForm>
            <LoginFormOpaque sc={screenDim} visible={'visible'}>
              <br/>
              <LoginHeading>
                <LoginHeadingImg src={heading} sc={screenDim}/>
              </LoginHeading>
              <br/>
              <LoginPassword>
                Set Wallet Key Phrase
                <br/>
                <WalletKey sc={screenDim}
                  value={this.state.tempSecretPhrase}
                  onChange={e => this.setTempSecretPhrase(e.target.value)}>
                </WalletKey>
                <br/><br/>
                <WalletButtonContainer sc={screenDim}>
                  <WalletPhraseButton sc={screenDim}
                    onClick={() => this.handleNewWallet()}>
                    New Phrase
                  </WalletPhraseButton>
                  <WalletQRButton sc={screenDim}
                    onClick={() => {this.handleQRScan()}}>
                    Scan Phrase
                  </WalletQRButton>
                </WalletButtonContainer>
                <br/><br/>
                <WalletButtonContainer sc={screenDim}>
                  <WalletSetButton sc={screenDim} display={buttonDisplay}
                     onClick={() => this.setWalletToCurrentBlock()}>
                     Create New Wallet
                  </WalletSetButton>
                </WalletButtonContainer>
                <br/><br/>
                <WalletButtonContainer sc={screenDim}>
                  <WalletSetButton sc={screenDim} display={buttonDisplay}
                    onClick={() => this.handleLoadWallet(this.state.tempSecretPhrase)}>
                    Recover Wallet
                 </WalletSetButton>
                </WalletButtonContainer>
              </LoginPassword>
            </LoginFormOpaque>
          </LoginGrid>
        </div>
        <Qr/>
      </div>
      )
    }
  }


SetWalletPage.propTypes = {
  setQrScanning: PropTypes.func.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setMinimumBlock: PropTypes.func.isRequired,
  setHasExistingWallet: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setQrScanning,
      setSecretPhrase,
      setSecretItems,
      setMinimumBlock,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetWalletPage)
