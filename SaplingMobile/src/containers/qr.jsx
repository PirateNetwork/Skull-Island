import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {setQrScanning} from '../actions/Context'

import {
  QrSection,
  QrTop,
  QrBottom,
  QrLeft,
  QrRight,
  QrTopLeft,
  QrTopRight,
  QrBottomLeft,
  QrBottomRight,
  QrCancelButton} from '../components/qr'


class Qr extends React.Component {

  constructor (props) {
    super(props)

  }

    render () {
      const scanning =  this.props.context.qrScanning ? {opacity: '1.0', display: 'visible'} : {opacity: '0.0', display: 'none'}

      return (
          <QrSection qrScanning={scanning}>
            <QrTop />
            <QrBottom />
            <QrLeft />
            <QrRight />
            <QrTopLeft />
            <QrTopRight />
            <QrBottomLeft />
            <QrBottomRight />

            <QrCancelButton
            onClick={() => {
              QRScanner.destroy()
              this.props.setQrScanning(false)
            }}>
            Cancel
            </QrCancelButton>
          </QrSection>
      )
    }

  }

Qr.propTypes = {
  setQrScanning: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setQrScanning
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Qr)
