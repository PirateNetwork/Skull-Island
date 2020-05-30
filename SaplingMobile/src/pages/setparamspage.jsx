import React from 'react'
import PropTypes from 'prop-types'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setSecretItems } from '../actions/Secrets'
import { phraseToSecretItems } from '../utils/wallet'

import {
  decrypt,
  saltHashPassword,
  KeySalt}from '../utils/hash'

import { coins } from '../utils/coins.js'

import {
  getOutputFileEntry,
  getSpendingFileEntry,
  getSpendingParam,
  getOutputParam,
  getMD5,
  SAPLING_SPEND_MD5CHKSUM,
  SAPLING_OUTPUT_MD5CHKSUM,
  SAPLING_SPEND_FILENAME,
  SAPLING_OUTPUT_FILENAME } from '../utils/params'

import {
  setSaplingSpendVerified,
  setSaplingOutputVerified } from '../actions/Context'

import {
  LoginGrid,
  LoginForm,
  LoginFormOpaque,
  LoginHeading,
  LoginHeadingImg,
  LoginInfo,
  LoginSocialContainer,
  LoginSocial,} from '../components/login'

import zerologo from '../assets/logo-white.png'
import github from '../assets/github-white.png'
import twitter from '../assets/twitter-white.png'
import telegram from '../assets/telegram-white.png'
import discord from '../assets/discord-white.png'
import heading from '../assets/zero-logo-white.png'

class SetParamsPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      spendingDownloadPercentage: 0,
      outputDownloadPercentage: 0,
    }

    this.createTransparentKeys = this.createTransparentKeys.bind(this)
    this.setSpendingDownloadPercentage = this.setSpendingDownloadPercentage.bind(this)
    this.setOutputDownloadPercentage = this.setOutputDownloadPercentage.bind(this)
    this.checkOutputFileEntry = this.checkOutputFileEntry.bind(this)
    this.checkSpendingFileEntry = this.checkSpendingFileEntry.bind(this)
    this.setDownloadProgress = this.setDownloadProgress.bind(this)
    this.update = this.update.bind(this)
  }


    setSpendingDownloadPercentage (result) {this.setState({spendingDownloadPercentage: result})}
    setOutputDownloadPercentage (result) {this.setState({outputDownloadPercentage: result})}


    createTransparentKeys () {
      const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
      const decryptedPhrase = decrypt(this.props.secrets.secretPhrase, keyHash)
      const phraseHash = saltHashPassword(decryptedPhrase, coins[this.props.settings.currentCoin].networkname)
      const secretItems = phraseToSecretItems(phraseHash, coins[this.props.settings.currentCoin] )
      this.props.setSecretItems(secretItems)
    }


    async checkOutputFileEntry() {
      try {
        var response = await getOutputFileEntry()
        this.setOutputDownloadPercentage(100)
        var md5 = await getMD5(response)
        if (md5 == SAPLING_OUTPUT_MD5CHKSUM) {
          this.props.setSaplingOutputVerified(true)
        } else {
          this.setOutputDownloadPercentage(0)
          getOutputParam()
          //document.addEventListener("DOWNLOADER_downloadProgress", this.setDownloadProgress)
        }
      } catch (err) {
        this.setOutputDownloadPercentage(0)
          getOutputParam()
          //document.addEventListener("DOWNLOADER_downloadProgress", this.setDownloadProgress)
      }
    }

    async checkSpendingFileEntry() {
      try {
        var response = await getSpendingFileEntry()
        this.setSpendingDownloadPercentage(100)
        var md5 = await getMD5(response)
        if (md5 == SAPLING_SPEND_MD5CHKSUM) {
          this.props.setSaplingSpendVerified(true)
        } else {
          this.setSpendingDownloadPercentage(0)
          getSpendingParam()

        }
      } catch (err) {
          this.setSpendingDownloadPercentage(0)
          getSpendingParam()
          //document.addEventListener("DOWNLOADER_downloadProgress", this.setDownloadProgress)
      }
    }


    setDownloadProgress (event) {
      var data = event.data
      if (data[1] == SAPLING_SPEND_FILENAME) {
          this.setSpendingDownloadPercentage(data[0])
          if (data[0] == 100) {
            this.checkSpendingFileEntry()
          }
      } else if (data[1] == SAPLING_OUTPUT_FILENAME) {
          this.setOutputDownloadPercentage(data[0])
          if (data[0] == 100) {
              this.checkOutputFileEntry()
          }
      }
    }

    update(){
      this.checkOutputFileEntry()
      this.checkSpendingFileEntry()
    }

    componentDidMount() {
      this.update()
      document.addEventListener("DOWNLOADER_downloadProgress", this.setDownloadProgress)
    }

    componentWillUnmount() {
      document.removeEventListener("DOWNLOADER_downloadProgress", this.setDownloadProgress)
    }

    render () {

      var screenDim = this.props.context.dimensions

      if (this.props.context.saplingspendverified && this.props.context.saplingoutputverified && this.props.secrets.items.length == 0) {
        this.createTransparentKeys()
      }

        return (
          <LoginGrid sc={screenDim}>
            <LoginForm sc={screenDim}>
            </LoginForm>
            <LoginFormOpaque sc={screenDim} visible={'visible'}>
              <br/>
              <LoginHeading>
                <LoginHeadingImg src={heading} sc={screenDim}/>
              </LoginHeading>
              <br/>
              <LoginInfo sc={screenDim}>
                {'Spending Verified: ' + this.props.context.saplingspendverified}
              </LoginInfo>
              <LoginInfo sc={screenDim}>
                {'Download spend %' + this.state.spendingDownloadPercentage}
              </LoginInfo>
              <br/>
              <LoginInfo sc={screenDim}>
                {'Output Verified: ' + this.props.context.saplingoutputverified}
              </LoginInfo>
              <LoginInfo sc={screenDim}>
                {'Download output %' + this.state.outputDownloadPercentage}
              </LoginInfo>
              <br/>
              <LoginInfo sc={screenDim}>
                {this.props.secrets.items.length > 0 ? 'Private Keys Generated.' : 'Generating Private Keys.'}
              </LoginInfo>
              <LoginSocialContainer sc={screenDim}>
                <a href="https://www.zerocurrency.io">
                  <LoginSocial src={zerologo} sc={screenDim}/>
                </a>
                <a href="https://github.com/zerocurrency">
                  <LoginSocial src={github} sc={screenDim}/>
                </a>
                <a href="https://twitter.com/ZeroCurrencies">
                  <LoginSocial src={twitter} sc={screenDim}/>
                </a>
                <a href="https://t.me/zerocurrency">
                  <LoginSocial src={telegram} sc={screenDim}/>
                </a>
                <a href="https://discordapp.com/invite/Jq5knn5">
                  <LoginSocial src={discord} sc={screenDim}/>
                </a>
              </LoginSocialContainer>
            </LoginFormOpaque>
          </LoginGrid>
        )
    }
  }


SetParamsPage.propTypes = {
  setSecretItems:  PropTypes.func.isRequired,
  setSaplingSpendVerified: PropTypes.func.isRequired,
  setSaplingOutputVerified: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    secrets: state.secrets
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setSaplingSpendVerified,
      setSaplingOutputVerified,
      setSecretItems,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetParamsPage)
