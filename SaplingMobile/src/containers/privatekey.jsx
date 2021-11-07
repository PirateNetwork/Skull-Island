import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/svg/QR_Logo.svg'

// import { privateKey } from '../utils/litewallet'

import {
  setMainPage,
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
        showkey: 'none',
        password: '',
        reset: true,
        flash: false
      }

      this.scrollRef = React.createRef()

      //State Updates
      this.setPassword = this.setPassword.bind(this)
      this.setReset = this.setReset.bind(this)
      this.resetScroll = this.resetScroll.bind(this)
      this.beginFlash = this.beginFlash.bind(this)
      this.removeFlash = this.removeFlash.bind(this)
      // this.setPrivateKey = this.setPrivateKey.bind(this)

    }

    beginFlash () {
      this.setState({flash: true})
      this.setFlashPrivateKeyId = setInterval(() => this.removeFlash(),125)
    }

    removeFlash () {
      this.setState({flash: false})
      clearInterval(this.setFlashPrivateKeyId)
    }

  //   async setPrivateKey() {
  //     var pk = await privateKey(this.props.context.address)
  //     pk = JSON.parse(pk)
  //     this.setState({key: pk[0].private_key})
  // }

    setPassword (p) {
      if (p.length >= 8) {
        if (p == this.props.context.activePassword) {
          this.setPrivateKey
          this.setState({
            pin: 'none',
            showkey: 'visible',
            password: '',
            reset: false
          })
        } else {
          this.setState({
            pin: 'visible',
            showkey: 'none',
            password: p,
            reset: true
          })
        }
      } else {
        this.setState({
          showkey: 'none',
          password: p,
          reset: false
        })
      }
    }

    setReset() {
      this.setState({
        pin: 'visible',
        showkey: 'none',
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
                  {/* Changed to match the terminology of the Treasure Chest full node wallet*/}
                  {'Export Spending Key'}
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
              <PrivateKeySection visible={this.state.showkey}>
                <PrivateKeyTitle>
                  {/* Changed to match the terminology of the Treasure Chest full node wallet */}
                  {'Export Spending Key'}
                </PrivateKeyTitle>
                <PrivateKeyPWTitle>
                  {'Private key:'}
                </PrivateKeyPWTitle>
                <PrivateKeyArea>
                  <PrivateKeyInput flash = {this.state.flash}>
                    {this.props.context.privateKey}
                  </PrivateKeyInput>
                </PrivateKeyArea>
                <PrivateKeyCopyButton
                    onClick={() => {
                    cordova.plugins.clipboard.copy(this.props.context.privateKey)
                    this.beginFlash()
                  }}>
                  {'Copy'}
                </PrivateKeyCopyButton>
                <PrivateKeyNote1>
                  {'The recovery info of your Pirate address.'}
                </PrivateKeyNote1>
                <PrivateKeyNote2>
                  {'It can be imported in a full node wallet.'}
                </PrivateKeyNote2>
                <PrivateKeyQRTitle>
                  {'QR Code:'}
                </PrivateKeyQRTitle>
                <PrivateKeyQRBase>
                  <PrivateKeyQR>
                    <QRCode value={this.props.context.privateKey}
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
                      this.props.setMainPage('visible')
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


PrivateKey.propTypes = {
  setPrivateKeyPage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
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
      setMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(PrivateKey)
