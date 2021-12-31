import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/svg/QR_Logo.svg'

import {
  setMainPage,
  setPassPhrasePage,} from '../actions/MainSubPage'

import {
  decrypt,
  saltHashPassword,
  KeySalt}from '../utils/hash'

import {
  PassPhraseDiv,
  PassPhraseSection,
  PassPhraseSectionOverscroll,
  PassPhraseTitle,
  PassPhrasePWTitle,
  PassPhrasePWArea,
  PassPhrasePWInput,
  PassPhrasePWGradientCapLeft,
  PassPhrasePWGradientCapRight,
  PassPhrasePWRedText,
  PassPhraseArea,
  PassPhraseInput,
  PassPhraseInnerInput,
  PassPhraseGradientCapLeft,
  PassPhraseGradientCapRight,
  PassPhraseRedText,
  PassPhraseHeightTitle,
  PassPhraseHeightArea,
  PassPhraseHeightInput,
  PassPhraseCopyButton,
  PassPhraseNote1,
  PassPhraseNote2,
  PassPhraseQRTitle,
  PassPhraseQRBase,
  PassPhraseQR,
  PassPhraseBackButton,
} from '../components/passphrase'

class PassPhrase extends React.Component {

  constructor (props) {
    super(props)

      this.state = {
        pin: 'visible',
        key: 'none',
        password: '',
        passphrase: '',
        reset: true,
        bip39Compatible: true,
        flash: false
      }

      this.scrollRef = React.createRef()

      //State Updates
      this.setPassword = this.setPassword.bind(this)
      this.setReset = this.setReset.bind(this)
      this.resetScroll = this.resetScroll.bind(this)
      this.beginFlash = this.beginFlash.bind(this)
      this.removeFlash = this.removeFlash.bind(this)
    }

    beginFlash () {
      this.setState({flash: true})
      this.setFlashPassPhraseId = setInterval(() => this.removeFlash(),125)
    }

    removeFlash () {
      this.setState({flash: false})
      clearInterval(this.setFlashPassPhraseId)
    }

    async setPassword (p) {
      // if (p.length >= 8) {
      //   p = p.substring(0,8)
      // }

      if (p.length >= 8) {
        if (p == this.props.context.activePassword) {
          const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
          const decryptedPhrase = decrypt(this.props.settings.passPhrase, keyHash)

          // var validPhrase = await apiCheckPassPhrase(decryptedPhrase)
          // validPhrase = JSON.parse(validPhrase)
          // if (validPhrase.passPhraseCheck == "Ok") {
          //   this.setState({bip39Compatible: true})
          // } else {
          //   this.setState({bip39Compatible: false})
          // }

          this.setState({
            pin: 'none',
            key: 'visible',
            password: '',
            passphrase: decryptedPhrase,
            reset: false
          })
        } else {
          this.setState({
            pin: 'visible',
            key: 'none',
            passphrase: '',
            password: p,
            reset: true
          })
        }
      } else {
        this.setState({
          password: p,
          reset: false
        })
      }
    }

    setReset() {
      this.setState({
        pin: 'visible',
        key: 'none',
        password: '',
        passphrase: '',
        reset: true
      })
    }

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }

    componentDidMount() {
    }


    render () {

        var qrData = JSON.stringify({passphrase: this.state.passphrase, height: this.props.secrets.birthday})

        if (this.props.mainSubPage.passPhrasePage == 'none' && !this.state.reset) {
          this.resetScroll(0)
          this.setReset()
        }

        var bip39Message
        if (this.state.bip39Compatible) {
          bip39Message = ''
        } else {
          bip39Message = 'Seed phrase incompatible with the Lite Wallet!'
        }

        return (
          <PassPhraseDiv visible={this.props.mainSubPage.passPhrasePage}>
            <PassPhraseSectionOverscroll ref = {this.scrollRef}>
              <PassPhraseSection visible={this.state.pin}>
                <PassPhraseTitle>
                  {/*Changed to match the terminology of the Treasure Chest full node wallet*/}
                  {'Export Seed Phrase'}
                </PassPhraseTitle>
                <PassPhrasePWTitle>
                  {'Password:'}
                </PassPhrasePWTitle>

                <PassPhrasePWArea>
                  <PassPhrasePWGradientCapLeft/>
                  <PassPhrasePWInput
                    type='password'
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)}
                    onClick = {() => {
                      this.resetScroll(0)
                    }} />
                  <PassPhrasePWGradientCapRight/>
                </PassPhrasePWArea>

                <PassPhrasePWRedText>
                  {'Enter your wallet password.'}
                </PassPhrasePWRedText>

              </PassPhraseSection>
              <PassPhraseSection visible={this.state.key}>
                <PassPhraseTitle>
                  {/*Change to match the terminology of the Treasure Chest full node wallet*/}
                  {'Export Seed Phrase'}
                </PassPhraseTitle>
                <PassPhrasePWTitle>
                  {'Mneumonic:'}
                </PassPhrasePWTitle>
                <PassPhraseArea>
                  <PassPhraseGradientCapLeft />
                  <PassPhraseInput>
                    <PassPhraseInnerInput flash = {this.state.flash}>
                      {this.state.passphrase}
                    </PassPhraseInnerInput>
                  </PassPhraseInput>
                  <PassPhraseGradientCapRight />
                </PassPhraseArea>
                <PassPhraseRedText>
                  {bip39Message}
                </PassPhraseRedText>

                <PassPhraseHeightTitle>
                  {'Recovery Height:'}
                </PassPhraseHeightTitle>
                <PassPhraseHeightArea>
                  <PassPhrasePWGradientCapLeft/>
                  <PassPhraseHeightInput>
                    {this.props.secrets.birthday}
                  </PassPhraseHeightInput>
                  <PassPhrasePWGradientCapRight/>
                </PassPhraseHeightArea>

                <PassPhraseCopyButton

                    onClick={() => {
                    cordova.plugins.clipboard.copy(qrData)
                    this.beginFlash()
                  }}>
                  {'Copy'}
                </PassPhraseCopyButton>
                <PassPhraseNote1>
                  {/*Changed to match the terminology of the Treasure Chest full node wallet*/}
                  {'The seed phrase is the only way to restore'}
                </PassPhraseNote1>
                <PassPhraseNote2>
                  {'your wallet. Please back it up securely'}
                </PassPhraseNote2>
                <PassPhraseQRTitle>
                  {'QR Code:'}
                </PassPhraseQRTitle>
                <PassPhraseQRBase>
                  <PassPhraseQR>
                    <QRCode value={qrData}
                        quietZone = {(this.props.context.dimensions.width * 0.025)}
                        size = {(this.props.context.dimensions.width * 0.850)}
                        bgColor = {'rgba(187,150,69,1)'}
                        logoImage = {logo}
                        ecLevel = "H"
                              />
                  </PassPhraseQR>
                </PassPhraseQRBase>
                <PassPhraseBackButton
                  onClick={() => {
                      this.props.setMainPage('visible')
                      this.props.setPassPhrasePage('none')
                  }}>
                  {'Back'}
                </PassPhraseBackButton>
              </PassPhraseSection>
            </PassPhraseSectionOverscroll>
          </PassPhraseDiv>
        )
  }

}



PassPhrase.propTypes = {
  setPassPhrasePage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setPassPhrasePage,
      setMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(PassPhrase)
