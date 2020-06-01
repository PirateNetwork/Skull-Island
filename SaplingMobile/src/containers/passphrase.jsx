import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/svg/QR_Logo.svg'

import {
  setZMainPage,
  setPassPhrasePage,} from '../actions/MainSubPage'

import {
  decrypt,
  saltHashPassword,
  KeySalt}from '../utils/hash'

import {
  apiCheckPassPhrase} from '../utils/sapling'

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
        bip39Compatible: true

      }

      this.scrollRef = React.createRef()

      //State Updates
      this.setPassword = this.setPassword.bind(this)
      this.setReset = this.setReset.bind(this)
      this.resetScroll = this.resetScroll.bind(this)

    }

    async setPassword (p) {
      // if (p.length >= 8) {
      //   p = p.substring(0,8)
      // }

      if (p.length >= 8) {
        if (p == this.props.context.activePassword) {
          const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
          const decryptedPhrase = decrypt(this.props.secrets.secretPhrase, keyHash)

          var validPhrase = await apiCheckPassPhrase(decryptedPhrase)
          validPhrase = JSON.parse(validPhrase)
          if (validPhrase.passPhraseCheck == "Ok") {
            this.setState({bip39Compatible: true})
          } else {
            this.setState({bip39Compatible: false})
          }

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

        var qrData = JSON.stringify({passphrase: this.state.passphrase, height: this.props.settings.minimumBlock[this.props.settings.currentCoin]})

        if (this.props.mainSubPage.passPhrasePage == 'none' && !this.state.reset) {
          this.resetScroll(0)
          this.setReset()
        }

        var bip39Message
        if (this.state.bip39Compatible) {
          bip39Message = ''
        } else {
          bip39Message = 'Phrase incompatible with Lite Wallet!!!'
        }

        return (
          <PassPhraseDiv visible={this.props.mainSubPage.passPhrasePage}>
            <PassPhraseSectionOverscroll ref = {this.scrollRef}>
              <PassPhraseSection visible={this.state.pin}>
                <PassPhraseTitle>
                  {'Wallet Passphrase'}
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
                  {'Wallet Passphrase'}
                </PassPhraseTitle>
                <PassPhrasePWTitle>
                  {'Passphrase:'}
                </PassPhrasePWTitle>
                <PassPhraseArea>
                  <PassPhraseGradientCapLeft />
                  <PassPhraseInput>
                    <PassPhraseInnerInput>
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
                    {this.props.settings.minimumBlock[this.props.settings.currentCoin]}
                  </PassPhraseHeightInput>
                  <PassPhrasePWGradientCapRight/>
                </PassPhraseHeightArea>

                <PassPhraseCopyButton

                    onClick={() => {
                    cordova.plugins.clipboard.copy(qrData)
                  }}>
                  {'Copy'}
                </PassPhraseCopyButton>
                <PassPhraseNote1>
                  {'Passphrase is used to recover or transfer'}
                </PassPhraseNote1>
                <PassPhraseNote2>
                  {'your wallet to another device.'}
                </PassPhraseNote2>
                <PassPhraseQRTitle>
                  {'QR Code:'}
                </PassPhraseQRTitle>
                <PassPhraseQRBase>
                  <PassPhraseQR>
                    <QRCode value={qrData}
                           quietZone = {'0'}
                           size = {(this.props.context.dimensions.width * 0.550)}
                           bgColor = {'rgba(187,150,69,1)'}
                           logoImage = {logo}
                           ecLevel = "H"
                              />
                  </PassPhraseQR>
                </PassPhraseQRBase>
                <PassPhraseBackButton
                  onClick={() => {
                      this.props.setZMainPage('visible')
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


// <ReceiveGrid sc={screenDim} visible={this.props.mainSubPage.passPhrasePage}>
//   <PinSection visible={this.state.pin}>
//     <ReceiveSection sc={screenDim}>
//       <ConfirmPassword>
//         <br/><br/><br/><br/>
//         Enter 8-Digit Pin to Unlock Passphrase
//         <br/><br/>
//         <ConfirmPin
//           sc={screenDim}
//           type="password"
//           value={this.state.password}
//           onChange={e => this.setPassword(e.target.value)} />
//       </ConfirmPassword>
//       <br/>
//       <ReceiveGreyButton sc={screenDim}
//         onClick={() => {
//           this.props.setZMainPage('visible')
//           this.setState({pin: 'visible',key: 'none',password: ''})
//           this.props.setPassPhrasePage('none')
//         }}>
//         Close
//       </ReceiveGreyButton>
//     </ReceiveSection>
//   </PinSection>
//
//   <KeySection visible={this.state.key}>
//     <ReceiveSection sc={screenDim}>
//       <ReceiveAddress sc={screenDim}
//         value={decryptedPhrase}
//         onChange={() => {
//           //console.log('address text area is static')
//         }}
//         >
//       </ReceiveAddress>
//       <ReceiveQR sc={screenDim}>
//         <QRCode value={decryptedPhrase}
//            size = {(screenDim.width * 0.70) - 20}
//            logoImage = {logo}
//            ecLevel = "H"
//               />
//       </ReceiveQR>
//       <ReceiveButtonSection sc={screenDim}>
//         <ReceiveGreyButton sc={screenDim}
//           onClick={() => {
//             cordova.plugins.clipboard.copy(decryptedPhrase)
//           }}>
//           Copy Phrase
//         </ReceiveGreyButton>
//         <ReceiveGreyButton sc={screenDim}
//           onClick={() => {
//             if (this.props.context.activeType == 'Z') {
//               this.props.setZMainPage('visible')
//             } else if (this.props.context.activeType == 'T') {
//               this.props.setTMainPage('visible')
//             }
//             this.setState({pin: 'visible',key: 'none',password: ''})
//             this.props.setPassPhrasePage('none')
//           }}>
//           Close
//         </ReceiveGreyButton>
//       </ReceiveButtonSection>
//     </ReceiveSection>
//   </KeySection>
// </ReceiveGrid>


PassPhrase.propTypes = {
  setPassPhrasePage: PropTypes.func.isRequired,
  setZMainPage: PropTypes.func.isRequired,
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
      setZMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(PassPhrase)
