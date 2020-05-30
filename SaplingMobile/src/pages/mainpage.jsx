import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ZMain from '../containers/zmain'
import TMain from '../containers/tmain'
import Send from '../containers/send'
import Receive from '../containers/receive'
import PrivateKey from '../containers/privatekey'
import PassPhrase from '../containers/passphrase'
import Reindex from '../containers/reindex'
import Qr from '../containers/qr'

class MainPage extends React.Component {

  constructor (props) {
    super(props)

  }

    render () {

      const mainStyle =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0'}

      return (
        <div>
          <div style={mainStyle}>
            <ZMain />
            <TMain />
            <Send />
            <Receive />
            <PrivateKey />
            <PassPhrase />
            <Reindex />
          </div>
          <Qr />
        </div>
      )
    }
  }

MainPage.propTypes = {
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(MainPage)
