import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Qr from '../containers/qr'

import axios from 'axios'

import { coins } from '../utils/coins.js'
import { setSecretPhrase, setSecretItems } from '../actions/Secrets'
import {
  encrypt,
  saltHashPassword,
  KeySalt}from '../utils/hash'

import { setMinimumBlock } from '../actions/Settings'

import {
  setQrScanning,
  setReindex} from '../actions/Context'

// import RandomWords from 'random-words'

import {
  apiGetPassPhrase,
  apiCheckPassPhrase} from '../utils/sapling'

import {
    BlackBackgroundQR,
  }  from '../pagecomponents/PirateShared'

 import {
   WalletMainSection,
   WalletHeaderFade,
   WalletFade,
   WalletTitle,
   WalletSubSection,
   WalletNewButton,
   WalletRecoverButton,
   WalletPassPhraseTitle,
   WalletPassPhraseArea,
   WalletPassPhraseInput,
   WalletPassPhraseInnerInput,
   WalletPassPhraseGradientCapLeft,
   WalletPassPhraseGradientCapRight,
   WalletPassPhraseRedText,
   WalletBackButton,
   WalletNewPhraseButton,
   WalletCreateButton,
   WalletHeightTitle,
   WalletHeightArea,
   WalletHeightInput,
   WalletGradientCapLeft,
   WalletGradientCapRight,
  } from '../components/wallet'

// import heading from '../assets/zero-logo-white.png'

class SetWalletPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      tempSecretPhrase: '',
      bip39Compatible: true,
      currentHeight: 0,
      options: 'visible',
      newWallet: 'none',
      recoverWallet: 'none',
      recoveryHeight: coins[this.props.settings.currentCoin].branchHeight['sapling'] - 1
    }

    this.setNewWallet = this.setNewWallet.bind(this)
    this.setRecoverWallet = this.setRecoverWallet.bind(this)
    this.setRecoveryHeight = this.setRecoveryHeight.bind(this)
    this.handleLoadWallet = this.handleLoadWallet.bind(this)
    this.handleNewWallet = this.handleNewWallet.bind(this)
    this.setTempSecretPhrase = this.setTempSecretPhrase.bind(this)
    this.setCurrentHeight = this.setCurrentHeight.bind(this)
    this.setWalletToCurrentBlock = this.setWalletToCurrentBlock.bind(this)
    this.setWalletToRecoveryBlock = this.setWalletToRecoveryBlock.bind(this)
    this.getCurrentBlock = this.getCurrentBlock.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
  }

  async setTempSecretPhrase (p) {
    this.setState({tempSecretPhrase: p})
    var validPhrase = await apiCheckPassPhrase(p)
    validPhrase = JSON.parse(validPhrase)
    if (validPhrase.passPhraseCheck == "Ok") {
      this.setState({bip39Compatible: true})
    } else {
      this.setState({bip39Compatible: false})
    }

  }
  setCurrentHeight(p) {this.setState({currentHeight: p})}
  setRecoveryHeight(p) {
    try {
      p = Math.floor(+p)
    } catch {
      p = coins[this.props.settings.currentCoin].branchHeight['sapling'] - 1
    }

    this.setState({recoveryHeight: Number(p).toString()})
  }

  setNewWallet() {
    this.handleNewWallet()
    this.setState({
      options: 'none',
      newWallet: 'visible'
    })
  }

  setRecoverWallet() {
    this.setState({
      options: 'none',
      recoverWallet: 'visible'
    })
  }

  setOptions() {
    this.setState({
      options: 'visible',
      recoverWallet: 'none',
      newWallet: 'none',
      tempSecretPhrase: ''
    })
  }

  setWalletToCurrentBlock () {
    var minBlock = this.props.settings.minimumBlock
    minBlock[this.props.settings.currentCoin] = this.state.currentHeight
    this.props.setMinimumBlock(minBlock)
    this.props.setReindex(this.state.currentHeight)
    this.handleLoadWallet(this.state.tempSecretPhrase)
  }

  setWalletToRecoveryBlock () {
    var minBlock = this.props.settings.minimumBlock
    minBlock[this.props.settings.currentCoin] = this.state.recoveryHeight
    this.props.setMinimumBlock(minBlock)
    this.props.setReindex(this.state.recoveryHeight)
    this.handleLoadWallet(this.state.tempSecretPhrase)
  }

  async getCurrentBlock () {
    if (this.state.currentHeight == 0) {
      try {
        var response = await axios.get(this.props.settings.insightAPI + 'status')
        this.setCurrentHeight(Number(response.data.info.blocks))
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }
  }

  async handleNewWallet () {
    var randomPhrase = await apiGetPassPhrase()
    randomPhrase = JSON.parse(randomPhrase)
    this.setTempSecretPhrase(randomPhrase.pass_phrase)
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
        QRScanner.scan(function (err, data) {
          // an error occurred, or the scan was canceled (error code `6`)
          if (err) {
            alert(JSON.stringify(err))
          } else {
            // The scan completed, display the contents of the QR code
            const qrReadData = JSON.parse(data)
            this.setState({
              tempSecretPhrase: qrReadData.passphrase,
              recoveryHeight: qrReadData.height
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
    this.getCurrentBlock()
  }

  componentWillUnmount () {
    this.safeReleaseCamera()
  }

    render () {
      const scanning =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0', display: 'visible'}

      var buttonDisplay = 'none'
      if (this.state.tempSecretPhrase.length >= 64 && this.state.currentHeight != 0) {
        buttonDisplay = 'visible'
      }

      var bip39Message
      if (this.state.bip39Compatible) {
        bip39Message = ''
      } else {
        bip39Message = 'Phrase incompatible with Lite Wallet!!!'
      }

      // console.log("Render Wallet")
      return (
        <div>
          <BlackBackgroundQR qrScanning = {scanning}>
            <WalletMainSection qrScanning = {scanning} >
              <WalletHeaderFade>
                <WalletTitle>
                  {'Create Wallet'}
                </WalletTitle>
              </WalletHeaderFade>
              <WalletFade>
              </WalletFade>

              <WalletSubSection visible = {this.state.options}>
                <WalletNewButton
                  onClick={() => {
                  this.setNewWallet()
                }}>
                  {'New Wallet'}
                </WalletNewButton>
                <WalletRecoverButton
                  onClick={() => {
                  this.setRecoverWallet()
                }}>
                  {'Recover Wallet'}
                </WalletRecoverButton>
              </WalletSubSection>

              <WalletSubSection visible = {this.state.newWallet}>
                <WalletPassPhraseTitle>
                  {'New Passphrase:'}
                </WalletPassPhraseTitle>
                <WalletPassPhraseArea>
                  <WalletPassPhraseGradientCapLeft />
                  <WalletPassPhraseInput>
                    <WalletPassPhraseInnerInput
                      value={this.state.tempSecretPhrase}
                      onChange={e => this.setTempSecretPhrase(e.target.value)}/>
                  </WalletPassPhraseInput>
                  <WalletPassPhraseGradientCapRight />
                </WalletPassPhraseArea>
                <WalletPassPhraseRedText>
                  {bip39Message}
                </WalletPassPhraseRedText>


                <WalletNewPhraseButton
                  onClick={() => this.handleNewWallet()}>
                  {'New Phrase'}
                </WalletNewPhraseButton>
                <WalletBackButton
                  onClick={() => this.setOptions()}>
                  {'Back'}
                </WalletBackButton>
                <WalletCreateButton visible = {buttonDisplay}
                  onClick={() => this.setWalletToCurrentBlock()}>
                  {'Create Wallet'}
                </WalletCreateButton>
              </WalletSubSection>

              <WalletSubSection visible = {this.state.recoverWallet}>
                <WalletPassPhraseTitle>
                  {'Enter Passphrase:'}
                </WalletPassPhraseTitle>
                <WalletPassPhraseArea>
                  <WalletPassPhraseGradientCapLeft />
                  <WalletPassPhraseInput>
                    <WalletPassPhraseInnerInput
                      value={this.state.tempSecretPhrase}
                      onChange={e => this.setTempSecretPhrase(e.target.value)}/>
                  </WalletPassPhraseInput>
                  <WalletPassPhraseGradientCapRight />
                </WalletPassPhraseArea>
                <WalletPassPhraseRedText>
                  {bip39Message}
                </WalletPassPhraseRedText>

                <WalletHeightTitle>
                 {'Recovery Height:'}
                </WalletHeightTitle>
                <WalletHeightArea>
                  <WalletGradientCapLeft />
                  <WalletHeightInput
                    type = "number"
                    value={this.state.recoveryHeight}
                    onChange={e => this.setRecoveryHeight(e.target.value)} />
                  <WalletGradientCapRight />
                </WalletHeightArea>

                <WalletNewPhraseButton
                  onClick={() => this.handleQRScan()}>
                  {'Scan QR'}
                </WalletNewPhraseButton>
                <WalletBackButton
                  onClick={() => this.setOptions()}>
                  {'Back'}
                </WalletBackButton>
                <WalletCreateButton visible = {buttonDisplay}
                  onClick={() => this.setWalletToRecoveryBlock()}>
                  {'Recover Wallet'}
                </WalletCreateButton>
              </WalletSubSection>
            </WalletMainSection>
          </BlackBackgroundQR>
          <Qr/>
        </div>
      )
    }
  }



  // <div style={mainStyle}>
  //   <LoginGrid sc={screenDim}>
  //     <LoginForm sc={screenDim}>
  //     </LoginForm>
  //     <LoginFormOpaque sc={screenDim} visible={'visible'}>
  //       <br/>
  //       <LoginHeading>
  //         <LoginHeadingImg src={heading} sc={screenDim}/>
  //       </LoginHeading>
  //       <br/>
  //       <LoginPassword>
  //         Set Wallet Key Phrase
  //         <br/>
  //         <WalletKey sc={screenDim}
  //           value={this.state.tempSecretPhrase}
  //           onChange={e => this.setTempSecretPhrase(e.target.value)}>
  //         </WalletKey>
  //         <br/><br/>
  //         <WalletButtonContainer sc={screenDim}>
  //           <WalletPhraseButton sc={screenDim}
  //             onClick={() => this.handleNewWallet()}>
  //             New Phrase
  //           </WalletPhraseButton>
  //           <WalletQRButton sc={screenDim}
  //             onClick={() => {this.handleQRScan()}}>
  //             Scan Phrase
  //           </WalletQRButton>
  //         </WalletButtonContainer>
  //         <br/><br/>
  //         <WalletButtonContainer sc={screenDim}>
  //           <WalletSetButton sc={screenDim} display={buttonDisplay}
  //              onClick={() => this.setWalletToCurrentBlock()}>
  //              Create New Wallet
  //           </WalletSetButton>
  //         </WalletButtonContainer>
  //         <br/><br/>
  //         <WalletButtonContainer sc={screenDim}>
  //           <WalletSetButton sc={screenDim} display={buttonDisplay}
  //             onClick={() => this.handleLoadWallet(this.state.tempSecretPhrase)}>
  //             Recover Wallet
  //          </WalletSetButton>
  //         </WalletButtonContainer>
  //       </LoginPassword>
  //     </LoginFormOpaque>
  //   </LoginGrid>
  // </div>





SetWalletPage.propTypes = {
  setQrScanning: PropTypes.func.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setMinimumBlock: PropTypes.func.isRequired,
  setHasExistingWallet: PropTypes.func.isRequired,
  setReindex: PropTypes.func.isRequired,
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
      setReindex,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetWalletPage)
