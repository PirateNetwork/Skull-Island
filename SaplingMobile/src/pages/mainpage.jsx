import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ChainOps from '../containers/chainsync'
import BalanceGraph from '../containers/balancegraph'
import LowerBar from '../containers/lowerbar'
import ZMain from '../containers/zmain'
// import TMain from '../containers/tmain'
import Send from '../containers/send'
import Receive from '../containers/receive'
import PrivateKey from '../containers/privatekey'
import PassPhrase from '../containers/passphrase'
import Reindex from '../containers/reindex'
import Qr from '../containers/qr'

import {BlackBackground} from '../pagecomponents/PirateShared'

class MainPage extends React.Component {

  constructor (props) {
    super(props)
  }

    render () {

      const mainStyle =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0'}

      // console.log("Render Main")
      return (
        <div>
          <div style={mainStyle}>
            <BlackBackground>
              <BalanceGraph />
              <ChainOps />
              <ZMain />
              <Send />
              <Receive />
              <Reindex />
              <PassPhrase />
              <PrivateKey />
              <LowerBar />
            </BlackBackground>
          </div>
          <Qr />
        </div>
      )
    }
  }

MainPage.propTypes = {
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage
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
