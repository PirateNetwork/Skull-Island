import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {saltHashPassword,
        PwSalt}from '../utils/hash'

import {
    BlackBackground,
  }  from '../pagecomponents/PirateShared'

import {
    LoginSectionOverscroll,
    LoginSection,
    LoginHeaderFade,
    LoginFade,
    LoginTitle,
    LoginPWTitle,
    LoginPWArea,
    LoginPWInput,
    LoginPWGradientCapLeft,
    LoginPWGradientCapRight,
    LoginPWRedText,
    LoginConfirmTitle,
    LoginConfirmArea,
    LoginConfirmInput,
    LoginConfirmGradientCapLeft,
    LoginConfirmGradientCapRight,
    LoginConfirmRedText,
    LoginEyeButton,
    LoginEyeImg,
    LoginSetPWButton,
    getLoginConfirmAreaScroll,
  }  from '../pagecomponents/PirateLogin'

import eye from '../assets/svg/eye.svg'

import { setWalletPassword } from '../actions/Settings'
import { setActivePassword } from '../actions/Context'

class SetPasswordPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      newPassword: '',
      newPasswordValid: false,
      newPasswordText:'Must be at least 8 digits',
      confirmPassword: '',
      confirmPasswordValid: false,
      confirmPasswordText: '',
      type: 'password'
    }

    this.scrollRef = React.createRef()

    this.setNewPassword = this.setNewPassword.bind(this)
    this.setConfirmPassword = this.setConfirmPassword.bind(this)
    this.handleSetPassword = this.handleSetPassword.bind(this)
    this.toggleType = this.toggleType.bind(this)
    this.resetScroll = this.resetScroll.bind(this)
  }

    toggleType () {
      if (this.state.type == 'password') {
        this.setState({
          type: 'text'
        })
      } else {
        this.setState({
          type: 'password'
        })
      }
    }

    setNewPassword (p) {
      this.setState({
        newPassword: p
      })

      if (p.length >= 8) {
        this.setState({
          newPasswordValid: true,
          newPasswordText:''
        })
      } else {
        this.setState({
          newPasswordValid: false,
          newPasswordText:'Must be at least 8 digits'
        })
      }
    }

    setConfirmPassword (p) {
      this.setState({
        confirmPassword: p
      })
      if (this.state.newPasswordValid == true && this.state.newPassword == p) {
        this.setState({
          confirmPasswordValid: true,
          confirmPasswordText: ''
        })
      } else {
        this.setState({
          confirmPasswordValid: false,
          confirmPasswordText: 'Confirmation invalid'
        })
      }
    }

    handleSetPassword () {
      var pwHash = saltHashPassword(this.state.newPassword, PwSalt)
      this.props.setWalletPassword(pwHash)
      this.props.setActivePassword(this.state.newPassword)
      this.setState({
        newPassword: '',
        confirmPassword: '',
      })
      this.props.onComplete()
    }

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }

    componentDidMount() {
    }

    render () {
      var height = this.props.context.dimensions.height
      var width = this.props.context.dimensions.width

      var loginbutton = this.state.confirmPasswordValid == true ? <LoginSetPWButton
                                                                  onClick={() => this.handleSetPassword()}>
                                                                    {'Set Password'}
                                                                  </LoginSetPWButton>
                                                    : ''
      // console.log("Render Password")
      return (

        <BlackBackground>
          <LoginHeaderFade>
            <LoginTitle>
              {'Set Wallet Password'}
            </LoginTitle>
          </LoginHeaderFade>
          <LoginFade>
          </LoginFade>
          <LoginSectionOverscroll ref = {this.scrollRef}>
            <LoginSection>
              <LoginPWTitle>
                New Password:
              </LoginPWTitle>
              <LoginPWArea>
                <LoginPWGradientCapLeft/>
                <LoginPWInput
                  type={this.state.type}
                  value={this.state.newPassword}
                  onChange={e => {
                    this.setConfirmPassword('')
                    this.setNewPassword(e.target.value)
                    this.setState({
                      confirmPasswordValid: false
                    })
                  }}
                  onClick = {() => {
                    this.resetScroll(0)
                  }} />
                  <LoginPWGradientCapRight/>
                  <LoginEyeButton
                    onClick = {() => {
                      this.toggleType()
                    }} >
                    <LoginEyeImg src = {eye}/>
                  </LoginEyeButton>
              </LoginPWArea>
              <LoginPWRedText>
                {this.state.newPasswordText}
              </LoginPWRedText>

              <LoginConfirmTitle>
                Confirm Password:
              </LoginConfirmTitle>
              <LoginConfirmArea>
                <LoginConfirmGradientCapLeft/>
                <LoginConfirmInput
                  type={this.state.type}
                  value={this.state.confirmPassword}
                  onChange={e => {
                    this.setConfirmPassword(e.target.value)
                  }}
                  onClick = {() => {
                    var scrollPos = getLoginConfirmAreaScroll(height,width)
                    this.resetScroll(scrollPos)
                  }} />
                  <LoginConfirmGradientCapRight/>
              </LoginConfirmArea>
              <LoginConfirmRedText>
                {this.state.confirmPasswordText}
              </LoginConfirmRedText>

              {loginbutton}
            </LoginSection>
          </LoginSectionOverscroll>
        </BlackBackground>

      )
    }

  }

  // <LoginGrid sc={screenDim}>
  //   <LoginFormOpaque sc={screenDim} visible={'visible'}>
  //     <br/>
  //     <LoginHeading>
  //       <LoginHeadingImg src={heading} sc={screenDim}/>
  //     </LoginHeading>
  //     <br/>
  //     <LoginPassword>
  //       Set New Password
  //       <br/>
  //       <LoginInput
  //         sc={screenDim}
  //         type="password"
  //         value={this.state.newPassword}
  //         onChange={e => {
  //           this.setConfirmPassword('')
  //           this.setNewPassword(e.target.value)
  //           this.setState({
  //             confirmPasswordValid: false
  //           })
  //         }} />
  //       <br/><br/>
  //       Confirm Password
  //       <br/>
  //       <LoginInput
  //         sc={screenDim}
  //         type="password"
  //         value={this.state.confirmPassword}
  //         onChange={e => this.setConfirmPassword(e.target.value)} />
  //       <br/><br/>
  //       {loginbutton}
  //     </LoginPassword>
  //   </LoginFormOpaque>
  // </LoginGrid>

SetPasswordPage.propTypes = {
  setWalletPassword: PropTypes.func.isRequired,
  setActivePassword: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
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
      setWalletPassword,
      setActivePassword
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetPasswordPage)
