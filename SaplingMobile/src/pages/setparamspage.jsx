import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
  BlackBackground,
  SkullImg,
  SkullCenteredDiv,} from '../pagecomponents/PirateShared'

import {
  ParamTitle,
  ParamHeaderFade,
  ParamFade,
  ParamInfo,} from '../pagecomponents/PirateParams'

import heading from '../assets/Pirate_Logo_Skull_Gold@2x.png'

class SetParamsPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      spendingDownloadPercentage: 0,
      outputDownloadPercentage: 0,
    }

    this.setSpendingDownloadPercentage = this.setSpendingDownloadPercentage.bind(this)
    this.setOutputDownloadPercentage = this.setOutputDownloadPercentage.bind(this)
    this.checkOutputFileEntry = this.checkOutputFileEntry.bind(this)
    this.checkSpendingFileEntry = this.checkSpendingFileEntry.bind(this)
    this.setDownloadProgress = this.setDownloadProgress.bind(this)
    this.update = this.update.bind(this)
  }

    setSpendingDownloadPercentage (result) {this.setState({spendingDownloadPercentage: result})}
    setOutputDownloadPercentage (result) {this.setState({outputDownloadPercentage: result})}

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
        }
      } catch (err) {
        this.setOutputDownloadPercentage(0)
          getOutputParam()
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
        // console.log("Render Params")
        return (
          <BlackBackground>
            <ParamHeaderFade>
              <ParamTitle>
                <SkullCenteredDiv>
                  <SkullImg src={heading}/>
                </SkullCenteredDiv>
              </ParamTitle>
            </ParamHeaderFade>
            <ParamFade>
            </ParamFade>
            <ParamInfo vPosition={0.35}>
             {'Spending Param Verified: ' + this.props.context.saplingspendverified}
           </ParamInfo>
           <ParamInfo vPosition={0.40}>
             {'Downloading Spending Param %' + this.state.spendingDownloadPercentage}
           </ParamInfo>
           <ParamInfo vPosition={0.50}>
             {'Output Param Verified: ' + this.props.context.saplingoutputverified}
           </ParamInfo>
           <ParamInfo vPosition={0.55}>
             {'Downloading Output Param %' + this.state.outputDownloadPercentage}
           </ParamInfo>
        </BlackBackground>
        )
    }
  }

SetParamsPage.propTypes = {
  setSaplingSpendVerified: PropTypes.func.isRequired,
  setSaplingOutputVerified: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    context: state.context,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setSaplingSpendVerified,
      setSaplingOutputVerified,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetParamsPage)
