import React from 'react';
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setMainPage,
  setSendPage,
  setReceivePage,
  setPassPhrasePage,
  setPrivateKeyPage,
  setReindexPage,} from '../actions/MainSubPage'

import {
  LowerBarDiv,
  LowerBarCenterButton,
  LowerBarCenterButtonImg,
  LowerBarSection,
  LowerBarButton,
  LowerBarButtonImg,
  LowerBarButtonText,
  LowerBarCenteredDiv} from '../components/lowerbar'

import walletIcon from '../assets/svg/wallet_icon.svg'
import sendIcon from '../assets/svg/send_icon.svg'
import receiveIcon from '../assets/svg/receive_icon.svg'
import explorerIcon from '../assets/svg/explorer_icon.svg'
import pirateCoinIcon from '../assets/png/pirate_coin_icon.png'

class LowerBar extends React.Component {
  constructor(props) {
    super(props)

    this.setCloseMenu = this.setCloseMenu.bind(this)
  }

  setCloseMenu() {
    this.props.setPassPhrasePage('none')
    this.props.setPrivateKeyPage('none')
    this.props.setReindexPage('none')
  }

  render() {

    var sendVisible
    if (this.props.context.synced == true) {
      sendVisible = 1
    } else {
      sendVisible = 0.5
    }

    return (

        <LowerBarDiv>
          <LowerBarCenterButton>
            <LowerBarCenterButtonImg src={pirateCoinIcon}/>
          </LowerBarCenterButton>

          <LowerBarSection>
            <LowerBarButton opacity = {1} hPosition = {0.04}
              onClick={e => {
                e.stopPropagation()
                this.props.setMainPage('visible')
                this.props.setSendPage('none')
                this.props.setReceivePage('none')
                this.setCloseMenu()
              }}>
              <LowerBarCenteredDiv>
                <LowerBarButtonImg src={walletIcon}/>
              </LowerBarCenteredDiv>
              <LowerBarButtonText active = {this.props.mainSubPage.mainPage}>
                Wallet
              </LowerBarButtonText>
            </LowerBarButton>
            <LowerBarButton opacity = {sendVisible} hPosition = {0.20}
              onClick={e => {
                e.stopPropagation()
                if (sendVisible == 1) {
                  this.props.setMainPage('none')
                  this.props.setSendPage('visible')
                  this.props.setReceivePage('none')
                  this.setCloseMenu()
                }
              }}>
              <LowerBarCenteredDiv>
                <LowerBarButtonImg src={sendIcon}/>
              </LowerBarCenteredDiv>
              <LowerBarButtonText active = {this.props.mainSubPage.sendPage}>
                Send
              </LowerBarButtonText>
            </LowerBarButton>
            <LowerBarButton opacity = {1} hPosition = {0.54}
              onClick={e => {
                e.stopPropagation()
                this.props.setMainPage('none')
                this.props.setSendPage('none')
                this.props.setReceivePage('visible')
                this.setCloseMenu()
              }}>
              <LowerBarCenteredDiv>
                <LowerBarButtonImg src={receiveIcon}/>
              </LowerBarCenteredDiv>
              <LowerBarButtonText active = {this.props.mainSubPage.receivePage}>
                Receive
              </LowerBarButtonText>
            </LowerBarButton>
            <LowerBarButton opacity = {1} hPosition = {0.70}
                onClick={e => {
                  e.stopPropagation()
                  window.location.href=this.props.settings.explorerURL
              }}>
              <LowerBarCenteredDiv>
                <LowerBarButtonImg src={explorerIcon}/>
              </LowerBarCenteredDiv>
              <LowerBarButtonText>
                Explorer
              </LowerBarButtonText>
            </LowerBarButton>
          </LowerBarSection>
          </LowerBarDiv>

    )
  }
}


LowerBar.propTypes = {
  setMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setPassPhrasePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
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
      setMainPage,
      setSendPage,
      setReceivePage,
      setPassPhrasePage,
      setPrivateKeyPage,
      setReindexPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(LowerBar)
