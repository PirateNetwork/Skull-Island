import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/svg/QR_Logo.svg'

import {
  setZMainPage,
  setReceivePage} from '../actions/MainSubPage'

  import {
    ReceiveDiv,
    ReceiveSectionOverscroll,
    ReceiveSection,
    ReceiveTitle,
    ReceiveAddressTitle,
    ReceiveAddressArea,
    ReceiveAddressInput,
    ReceiveCopyButton,
    ReceiveNote1,
    ReceiveNote2,
    ReceiveQRTitle,
    ReceiveQRBase,
    ReceiveQR,
    ReceiveBackButton,
  } from '../components/receive'

class Receive extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      flash: false
    }

    this.scrollRef = React.createRef()
    this.resetScroll = this.resetScroll.bind(this)

    this.beginFlash = this.beginFlash.bind(this)
    this.removeFlash = this.removeFlash.bind(this)
    }

    beginFlash () {
      this.setState({flash: true})
      this.setFlashId = setInterval(() => this.removeFlash(),125)
    }

    removeFlash () {
      this.setState({flash: false})
      clearInterval(this.setFlashId)
    }

    resetScroll (p) {
      try {
        this.scrollRef.current.scrollTop = p
      } catch {
        console.log('Unable to set scroll on receive page')
      }
    }

    componentDidMount() {

    }

    render () {

        if (this.props.mainSubPage.receivePage == 'none') {
          this.resetScroll(0)
        }

        // console.log("Render Receive")
        return (
        <ReceiveDiv visible={this.props.mainSubPage.receivePage}>
          <ReceiveSectionOverscroll ref = {this.scrollRef}>
            <ReceiveSection>
              <ReceiveTitle>
                {'Receiving'}
              </ReceiveTitle>
              <ReceiveAddressTitle>
                {'Your Pirate address:'}
                <br/>
              </ReceiveAddressTitle>
              <ReceiveAddressArea>
                <ReceiveAddressInput flash = {this.state.flash}>
                  {this.props.context.zAddress}
                </ReceiveAddressInput>
              </ReceiveAddressArea>
              <ReceiveCopyButton
                  onClick={() => {
                  cordova.plugins.clipboard.copy(this.props.context.zAddress)
                  this.beginFlash()
                }}>
                {'Copy'}
              </ReceiveCopyButton>
              <ReceiveNote1>
                {'Others can send ARRR to your address. Copy'}
              </ReceiveNote1>
              <ReceiveNote2>
                {'the text above or show the QR code below.'}
              </ReceiveNote2>
              <ReceiveQRTitle>
                {'QR Code:'}
              </ReceiveQRTitle>
              <ReceiveQRBase>
                <ReceiveQR>
                  <QRCode value={this.props.context.zAddress}
                         quietZone = {'0'}
                         size = {(this.props.context.dimensions.width * 0.550)}
                         bgColor = {'rgba(187,150,69,1)'}
                         logoImage = {logo}
                         ecLevel = "H"
                            />
                </ReceiveQR>
              </ReceiveQRBase>
              <ReceiveBackButton
                onClick={() => {
                    this.props.setZMainPage('visible')
                    this.props.setReceivePage('none')
                }}>
                {'Back'}
              </ReceiveBackButton>
            </ReceiveSection>
          </ReceiveSectionOverscroll>
        </ReceiveDiv>
      )
  }
}

Receive.propTypes = {
  setReceivePage: PropTypes.func.isRequired,
  setZMainPage: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setReceivePage,
      setZMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Receive)
