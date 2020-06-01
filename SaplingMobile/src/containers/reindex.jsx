import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { coins } from '../utils/coins.js'
import logo from '../assets/svg/QR_Logo.svg'

import {
  setZMainPage,
  setReindexPage} from '../actions/MainSubPage'

import {
  setReindex,} from '../actions/Context'

import {
    ReindexDiv,
    ReindexSection,
    ReindexSectionOverscroll,
    ReindexTitle,
    ReindexPWTitle,
    ReindexPWArea,
    ReindexPWInput,
    ReindexPWGradientCapLeft,
    ReindexPWGradientCapRight,
    ReindexPWRedText,
    ReindexNote1,
    ReindexNote2,
    ReindexFirstKnownButton,
    ReindexFirstNote,
    ReindexFullButton,
    ReindexFullNote,
    ReindexButton,
    ReindexBackButton,
    ReindexButtonImg,
} from '../components/reindex'


class ReindexPage extends React.Component {

  constructor (props) {
    super(props)

      this.state = {
        pin: 'visible',
        key: 'none',
        password: '',
        height: this.props.settings.minimumBlock[this.props.settings.currentCoin],
        reset: true
      }

      this.scrollRef = React.createRef()

      //State Updates
      this.setPassword = this.setPassword.bind(this)
      this.setReset = this.setReset.bind(this)
      this.resetScroll = this.resetScroll.bind(this)
      this.setHeight = this.setHeight.bind(this)
    }

    setHeight (n) {
      this.setState({
        height: n
      })
    }

    setPassword (p) {
      // if (p.length >= 8) {
      //   p = p.substring(0,8)
      // }

      if (p.length >= 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            pin: 'none',
            key: 'visible',
            password: '',
            reset: false
          })
        } else {
          this.setState({
            pin: 'visible',
            key: 'none',
            password: p,
            reset: true
          })
        }
      } else {
        this.setState({
          password: p,
          reset: false
        })
      }
    }

    setReset() {
      this.setState({
        pin: 'visible',
        key: 'none',
        password: '',
        passphrase: '',
        reset: true
      })
    }

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }

    componentDidMount() {

    }


    render () {

      if (this.props.mainSubPage.reindexPage == 'none' && !this.state.reset) {
        this.resetScroll(0)
        this.setReset()
      }

      return (
        <ReindexDiv visible={this.props.mainSubPage.reindexPage}>
          <ReindexSectionOverscroll ref = {this.scrollRef}>
            <ReindexSection visible={this.state.pin}>
              <ReindexTitle>
                {'Rescan Wallet'}
              </ReindexTitle>
              <ReindexPWTitle>
                {'Password:'}
              </ReindexPWTitle>

              <ReindexPWArea>
                <ReindexPWGradientCapLeft/>
                <ReindexPWInput
                  type='password'
                  value={this.state.password}
                  onChange={e => this.setPassword(e.target.value)}
                  onClick = {() => {
                    this.resetScroll(0)
                  }} />
                <ReindexPWGradientCapRight/>
              </ReindexPWArea>

              <ReindexPWRedText>
                {'Enter your wallet password.'}
              </ReindexPWRedText>
            </ReindexSection>

            <ReindexSection visible={this.state.key}>
              <ReindexTitle>
                {'Rescan Wallet'}
              </ReindexTitle>
              <ReindexPWTitle>
                {'Rescan from height:'}
              </ReindexPWTitle>
              <ReindexPWArea>
                <ReindexPWGradientCapLeft/>
                <ReindexPWInput
                  value={this.state.height}
                  onChange={e => this.setHeight(e.target.value)}
                  onClick = {() => {
                    this.resetScroll(0)
                  }} />
                <ReindexPWGradientCapRight/>

              </ReindexPWArea>

              <ReindexNote1>
                {'Enter a custom rescan height or'}
                <br/>
                {'use one of the prefixed heights below'}
              </ReindexNote1>
              <ReindexNote2>
                <br/>
                {'This scans the blockchain from the given'}
                <br/>
                {'height for all transactions of the wallet'}
                <br/>
                {'and can be used if historic transactions'}
                <br/>
                {'are missing in the transaction history.'}
              </ReindexNote2>
              <ReindexFirstKnownButton
                onClick = {() => {
                  this.setHeight(this.props.settings.minimumBlock[this.props.settings.currentCoin] - 1)
                }}>
                <ReindexButtonImg src = {logo}/>
              </ReindexFirstKnownButton>
              <ReindexFirstNote>
                {'First known transaction'}
              </ReindexFirstNote>
              <ReindexFullButton
                onClick = {() => {
                  this.setHeight(coins[this.props.settings.currentCoin].branchHeight['sapling'] - 1)
                }}>
                <ReindexButtonImg src = {logo}/>
              </ReindexFullButton>
              <ReindexFullNote>
                {'Full sapling rescan'}
              </ReindexFullNote>
              <ReindexButton
              onClick = {() => {
                this.props.setReindex(Number(this.state.height))
                this.props.setReindexPage('none')
                this.props.setZMainPage('visible')
              }}>
                {'Rescan'}
              </ReindexButton>
              <ReindexBackButton
                onClick = {() => {
                  this.props.setReindexPage('none')
                  this.props.setZMainPage('visible')
                }}>
                {'Back'}
              </ReindexBackButton>
            </ReindexSection>

          </ReindexSectionOverscroll>
        </ReindexDiv>
      )
    }

  }

  // var reindexbutton = this.state.confirmPasswordValid == true ? <LoginButton sc={screenDim}
  //                                                             onClick={() => {
  //                                                               this.props.setReindex(2)
  //                                                               this.closePage()
  //                                                             }}>
  //                                                             Rescan
  //                                                             </LoginButton>
  //                                                             : ''
  //
  // var rescanbutton = this.state.confirmPasswordValid == true ? <LoginButton sc={screenDim}
  //                                                             onClick={() => {
  //                                                               this.props.setReindex(1)
  //                                                               this.closePage()
  //                                                             }}>
  //                                                             Rescan
  //                                                             </LoginButton>
  //                                                             : ''

  // <ReindexSection visible={this.props.mainSubPage.reindexPage}>
  //   <LoginGrid sc={screenDim}>
  //     <LoginForm sc={screenDim}>
  //     </LoginForm>
  //     <LoginFormOpaque sc={screenDim} visible={'visible'}>
  //       <br/><br/>
  //       <LoginPassword>
  //         Enter 8-Digit Pin to Enable Reindex
  //         <br/>
  //         <LoginInput
  //           sc={screenDim}
  //           type="password"
  //           value={this.state.password}
  //           onChange={e => this.setPassword(e.target.value)} />
  //       </LoginPassword>
  //       <br/><br/>
  //       <LoginPassword>
  //         Re-Scan chain from
  //         <br/>
  //         first known transaction
  //         <br/>
  //         {rescanbutton}
  //       </LoginPassword>
  //       <br/><br/>
  //       <LoginPassword>
  //         Re-Scan chain from
  //         <br/>
  //         first Sapling block
  //         <br/>
  //         {reindexbutton}
  //       </LoginPassword>
  //       <br/><br/>
  //       <LoginPassword>
  //         <LoginButton sc={screenDim}
  //           onClick={() => this.closePage()}>
  //           Cancel
  //           </LoginButton>
  //       </LoginPassword>
  //     </LoginFormOpaque>
  //   </LoginGrid>
  // </ReindexSection>

ReindexPage.propTypes = {
  setReindex: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
  setZMainPage: PropTypes.func.isRequired,
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
      setReindex,
      setReindexPage,
      setZMainPage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ReindexPage)
