import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ChainOps from '../containers/chainsync'
import LowerBar from '../containers/lowerbar'
import ZMain from '../containers/zmain'
import Send from '../containers/send'
import Receive from '../containers/receive'
import PrivateKey from '../containers/privatekey'
import PassPhrase from '../containers/passphrase'
import Reindex from '../containers/reindex'
import Qr from '../containers/qr'
import ZTransaction from '../containers/ztransaction'
import Reconnect from '../containers/reconnect'

import {BlackBackground} from '../pagecomponents/PirateShared'

class MainPage extends React.Component {

  constructor (props) {
    super(props)
  }

    render () {

      const mainStyle =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0'}

      var page

      if (this.props.mainSubPage.mainPage == 'visible') {
        page = <div>
                <ChainOps />
                <ZMain />
              </div>
      } else if (this.props.mainSubPage.receivePage == 'visible') {
        page = <Receive />
      } else if (this.props.mainSubPage.privateKeyPage == 'visible') {
        page = <PrivateKey />
      } else if (this.props.mainSubPage.passPhrasePage == 'visible') {
        page = <PassPhrase />
      } else if (this.props.mainSubPage.reindexPage == 'visible') {
        page = <Reindex />
      } else if (this.props.mainSubPage.transactionPage == 'visible') {
        page = <ZTransaction />
      } else if (this.props.mainSubPage.reconnectPage == 'visible') {
        page = <Reconnect />
      }


      return (
        <div>
          <div style={mainStyle}>
            <BlackBackground>
              {page}
              <Send />
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
