import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/logo-white-QR.png'

import {
  setZMainPage,
  setTMainPage,
  setPassPhrasePage,} from '../actions/MainSubPage'

import {
  decrypt,
  saltHashPassword,
  KeySalt}from '../utils/hash'

import {
    ReceiveGrid,
    ReceiveSection,
    ReceiveAddress,
    ReceiveQR,
    ReceiveButtonSection,
    ReceiveGreyButton,
    PinSection,
    KeySection,
    } from '../components/receive'

import {
    ConfirmPin,
    ConfirmPassword
    } from '../components/send'

class PassPhrase extends React.Component {

  constructor (props) {
    super(props)

      this.state = {
        pin: 'visible',
        key: 'none',
        password: ''
      }

      //State Updates
      this.setPassword = this.setPassword.bind(this)

    }

    setPassword (p) {
      if (p.length >= 8) {
        p = p.substring(0,8)
      }

      if (p.length == 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            pin: 'none',
            key: 'visible',
            password: ''
          })
        } else {
          this.setState({
            pin: 'visible',
            key: 'none',
            password: ''
          })
        }
      } else {
        this.setState({
          password: p
        })
      }
    }



    componentDidMount() {
    }


    render () {
        var screenDim = this.props.context.dimensions

        const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
        const decryptedPhrase = decrypt(this.props.secrets.secretPhrase, keyHash)

        return (
        <ReceiveGrid sc={screenDim} visible={this.props.mainSubPage.passPhrasePage}>
          <PinSection visible={this.state.pin}>
            <ReceiveSection sc={screenDim}>
              <ConfirmPassword>
                <br/><br/><br/><br/>
                Enter 8-Digit Pin to Unlock Passphrase
                <br/><br/>
                <ConfirmPin
                  sc={screenDim}
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setPassword(e.target.value)} />
              </ConfirmPassword>
              <br/>
              <ReceiveGreyButton sc={screenDim}
                onClick={() => {
                  if (this.props.context.activeType == 'Z') {
                    this.props.setZMainPage('visible')
                  } else if (this.props.context.activeType == 'T') {
                    this.props.setTMainPage('visible')
                  }
                  this.setState({pin: 'visible',key: 'none',password: ''})
                  this.props.setPassPhrasePage('none')
                }}>
                Close
              </ReceiveGreyButton>
            </ReceiveSection>
          </PinSection>

          <KeySection visible={this.state.key}>
            <ReceiveSection sc={screenDim}>
              <ReceiveAddress sc={screenDim}
                value={decryptedPhrase}
                onChange={() => {
                  //console.log('address text area is static')
                }}
                >
              </ReceiveAddress>
              <ReceiveQR sc={screenDim}>
                <QRCode value={decryptedPhrase}
                   size = {(screenDim.width * 0.70) - 20}
                   logoImage = {logo}
                   ecLevel = "H"
                      />
              </ReceiveQR>
              <ReceiveButtonSection sc={screenDim}>
                <ReceiveGreyButton sc={screenDim}
                  onClick={() => {
                    cordova.plugins.clipboard.copy(decryptedPhrase)
                  }}>
                  Copy Phrase
                </ReceiveGreyButton>
                <ReceiveGreyButton sc={screenDim}
                  onClick={() => {
                    if (this.props.context.activeType == 'Z') {
                      this.props.setZMainPage('visible')
                    } else if (this.props.context.activeType == 'T') {
                      this.props.setTMainPage('visible')
                    }
                    this.setState({pin: 'visible',key: 'none',password: ''})
                    this.props.setPassPhrasePage('none')
                  }}>
                  Close
                </ReceiveGreyButton>
              </ReceiveButtonSection>
            </ReceiveSection>
          </KeySection>
        </ReceiveGrid>

        )
  }

}

PassPhrase.propTypes = {
  setPassPhrasePage: PropTypes.func.isRequired,
  setZMainPage: PropTypes.func.isRequired,
  setTMainPage: PropTypes.func.isRequired,
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
      setTMainPage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(PassPhrase)
