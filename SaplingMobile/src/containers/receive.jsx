import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { QRCode } from 'react-qrcode-logo'
import logo from '../assets/logo-white-QR.png'

import {
  setZMainPage,
  setTMainPage,
  setReceivePage} from '../actions/MainSubPage'

  import {
    ReceiveGrid,
    ReceiveSection,
    ReceiveAddress,
    ReceiveQR,
    ReceiveButtonSection,
    ReceiveGreyButton} from '../components/receive'

class Receive extends React.Component {

  constructor (props) {
    super(props)

    }


    componentDidMount() {
    }

    render () {
        var screenDim = this.props.context.dimensions
        var address
        if (this.props.context.activeType == 'Z') {this.props.context.zAddress
          address = this.props.context.zAddress
        } else if (this.props.context.activeType == 'T') {
          address = this.props.context.tAddress
        }
        return (
        <ReceiveGrid sc={screenDim} visible={this.props.mainSubPage.receivePage}>
          <ReceiveSection sc={screenDim}>
            <ReceiveAddress sc={screenDim}
              value={address}
              onChange={() => {
                //console.log('address text area is static')
                }
              }
              >
            </ReceiveAddress>
            <ReceiveQR sc={screenDim}>
              <QRCode value={address}
                 size = {(screenDim.width * 0.70) - 20}
                 logoImage = {logo}
                 ecLevel = "H"
                    />
            </ReceiveQR>
            <ReceiveButtonSection sc={screenDim}>
              <ReceiveGreyButton sc={screenDim}
                onClick={() => {
                  cordova.plugins.clipboard.copy(address)
                }}>
                Copy Address
              </ReceiveGreyButton>
              <ReceiveGreyButton sc={screenDim}
                onClick={() => {
                  if (this.props.context.activeType == 'Z') {
                    this.props.setZMainPage('visible')
                  } else if (this.props.context.activeType == 'T') {
                    this.props.setTMainPage('visible')
                  }
                  this.props.setReceivePage('none')
                }}>
                Close
              </ReceiveGreyButton>
            </ReceiveButtonSection>
          </ReceiveSection>
        </ReceiveGrid>

        )
  }

}

Receive.propTypes = {
  setReceivePage: PropTypes.func.isRequired,
  setZMainPage: PropTypes.func.isRequired,
  setTMainPage: PropTypes.func.isRequired,
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
      setTMainPage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Receive)
