import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/svg/QR_Logo.svg'

import {
  setMainPage,
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
      this.setFlashReceiveId = setInterval(() => this.removeFlash(),125)
    }

    removeFlash () {
      this.setState({flash: false})
      clearInterval(this.setFlashReceiveId)
    }

    resetScroll (p) {
      try {
        this.scrollRef.current.scrollTop = p
      } catch {
        if (process.env.NODE_ENV != 'production') {
          console.log('Unable to set scroll on receive page')
        }
      }
    }

    componentDidMount() {

    }

    render () {

        if (this.props.mainSubPage.receivePage == 'none') {
          this.resetScroll(0)
        }

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
                  {this.props.context.address}
                </ReceiveAddressInput>
              </ReceiveAddressArea>
              <ReceiveCopyButton
                  onClick={() => {
                  cordova.plugins.clipboard.copy(this.props.context.address)
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
                  <QRCode value={this.props.context.address}
                      quietZone = {(this.props.context.dimensionsWidth * 0.025)}
                      size = {(this.props.context.dimensionsWidth * 0.850)}
                      bgColor = {'rgba(187,150,69,1)'}
                      logoImage = {logo}
                      ecLevel = "H"
                            />
                </ReceiveQR>
              </ReceiveQRBase>
              <ReceiveBackButton
                onClick={() => {
                    this.props.setMainPage('visible')
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
  setMainPage: PropTypes.func.isRequired,
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
      setMainPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Receive)
