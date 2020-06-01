import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/svg/QR_Logo.svg'

import {
  setZMainPage,
  setPrivateKeyPage,} from '../actions/MainSubPage'

  import {
    PrivateKeyDiv,
    PrivateKeySection,
    PrivateKeySectionOverscroll,
    PrivateKeyTitle,
    PrivateKeyPWTitle,
    PrivateKeyPWArea,
    PrivateKeyPWInput,
    PrivateKeyPWGradientCapLeft,
    PrivateKeyPWGradientCapRight,
    PrivateKeyPWRedText,
    PrivateKeyArea,
    PrivateKeyInput,
    PrivateKeyCopyButton,
    PrivateKeyNote1,
    PrivateKeyNote2,
    PrivateKeyQRTitle,
    PrivateKeyQRBase,
    PrivateKeyQR,
    PrivateKeyBackButton,
  } from '../components/privatekey'

class PrivateKey extends React.Component {

  constructor (props) {
    super(props)

      this.state = {
        pin: 'visible',
        key: 'none',
        password: '',
        reset: true
      }

      this.scrollRef = React.createRef()

      //State Updates
      this.setPassword = this.setPassword.bind(this)
      this.setReset = this.setReset.bind(this)
      this.resetScroll = this.resetScroll.bind(this)

    }

    setPassword (p) {
      // if (p.length >= 8) {
      //   p = p.substring(0,8)
      // }

      if (p.length >= 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            pin: 'none',
            key: 'visible',
            password: '',
            reset: false
          })
        } else {
          this.setState({
            pin: 'visible',
            key: 'none',
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

        if (this.props.mainSubPage.privateKeyPage == 'none' && !this.state.reset) {
          this.resetScroll(0)
          this.setReset()
        }

        return (
          <PrivateKeyDiv visible={this.props.mainSubPage.privateKeyPage}>
            <PrivateKeySectionOverscroll ref = {this.scrollRef}>
              <PrivateKeySection visible={this.state.pin}>
                <PrivateKeyTitle>
                  {'Private Key'}
                </PrivateKeyTitle>
                <PrivateKeyPWTitle>
                  {'Password:'}
                </PrivateKeyPWTitle>

                <PrivateKeyPWArea>
                  <PrivateKeyPWGradientCapLeft/>
                  <PrivateKeyPWInput
                    type='password'
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)}
                    onClick = {() => {
                      this.resetScroll(0)
                    }} />
                  <PrivateKeyPWGradientCapRight/>
                </PrivateKeyPWArea>

                <PrivateKeyPWRedText>
                  {'Enter your wallet password.'}
                </PrivateKeyPWRedText>

              </PrivateKeySection>
              <PrivateKeySection visible={this.state.key}>
                <PrivateKeyTitle>
                  {'Private Key'}
                </PrivateKeyTitle>
                <PrivateKeyPWTitle>
                  {'Key:'}
                </PrivateKeyPWTitle>
                <PrivateKeyArea>
                  <PrivateKeyInput>
                    {this.props.context.zPrivateKey}
                  </PrivateKeyInput>
                </PrivateKeyArea>
                <PrivateKeyCopyButton

                    onClick={() => {
                    cordova.plugins.clipboard.copy(this.props.context.zPrivateKey)
                  }}>
                  {'Copy'}
                </PrivateKeyCopyButton>
                <PrivateKeyNote1>
                  {'Private Key is used to recover or transfer'}
                </PrivateKeyNote1>
                <PrivateKeyNote2>
                  {'your address to a full node wallet.'}
                </PrivateKeyNote2>
                <PrivateKeyQRTitle>
                  {'QR Code:'}
                </PrivateKeyQRTitle>
                <PrivateKeyQRBase>
                  <PrivateKeyQR>
                    <QRCode value={this.props.context.zPrivateKey}
                           quietZone = {(this.props.context.dimensions.width * 0.025)}
                           size = {(this.props.context.dimensions.width * 0.850)}
                           bgColor = {'rgba(187,150,69,1)'}
                           logoImage = {logo}
                           ecLevel = "H"
                              />
                  </PrivateKeyQR>
                </PrivateKeyQRBase>
                <PrivateKeyBackButton
                  onClick={() => {
                      this.props.setZMainPage('visible')
                      this.props.setPrivateKeyPage('none')
                  }}>
                  {'Back'}
                </PrivateKeyBackButton>
              </PrivateKeySection>
            </PrivateKeySectionOverscroll>
          </PrivateKeyDiv>

        )
  }

}


// <ReceiveGrid sc={screenDim} visible={this.props.mainSubPage.privateKeyPage}>
//   <PinSection visible={this.state.pin}>
//     <ReceiveSection sc={screenDim}>
//       <ConfirmPassword>
//         <br/><br/><br/><br/>
//         Enter 8-Digit Pin to Unlock Keys
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
//           if (this.props.context.activeType == 'Z') {
//             this.props.setZMainPage('visible')
//           } else if (this.props.context.activeType == 'T') {
//             this.props.setTMainPage('visible')
//           }
//           this.setState({pin: 'visible',key: 'none',password: ''})
//           this.props.setPrivateKeyPage('none')
//         }}>
//         Close
//       </ReceiveGreyButton>
//     </ReceiveSection>
//   </PinSection>
//
//   <KeySection visible={this.state.key}>
//     <ReceiveSection sc={screenDim}>
//       <ReceiveAddress sc={screenDim}
//         value={key}
//         onChange={() => {
//           //console.log('address text area is static')
//         }}
//         >
//       </ReceiveAddress>
//       <ReceiveQR sc={screenDim}>
//         <QRCode value={key}
//            size = {(screenDim.width * 0.70) - 20}
//            logoImage = {logo}
//            ecLevel = "H"
//               />
//       </ReceiveQR>
//       <ReceiveButtonSection sc={screenDim}>
//         <ReceiveGreyButton sc={screenDim}
//           onClick={() => {
//             cordova.plugins.clipboard.copy(key)
//           }}>
//           Copy Key
//         </ReceiveGreyButton>
//         <ReceiveGreyButton sc={screenDim}
//           onClick={() => {
//             if (this.props.context.activeType == 'Z') {
//               this.props.setZMainPage('visible')
//             } else if (this.props.context.activeType == 'T') {
//               this.props.setTMainPage('visible')
//             }
//             this.setState({pin: 'visible',key: 'none',password: ''})
//             this.props.setPrivateKeyPage('none')
//           }}>
//           Close
//         </ReceiveGreyButton>
//       </ReceiveButtonSection>
//     </ReceiveSection>
//   </KeySection>
// </ReceiveGrid>

PrivateKey.propTypes = {
  setPrivateKeyPage: PropTypes.func.isRequired,
  setZMainPage: PropTypes.func.isRequired,
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
      setPrivateKeyPage,
      setZMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateKey)
