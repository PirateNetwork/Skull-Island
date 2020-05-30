import React from 'react'
import PropTypes from 'prop-types'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//import axios from 'axios'

import {saltHashPassword,
        PwSalt}from '../utils/hash'

import { LoginGrid,
         LoginForm,
         LoginFormOpaque,
         LoginHeading,
         LoginHeadingImg,
         LoginPassword,
         LoginInput,
         LoginSocialContainer,
         LoginSocial,
         LoginButton} from '../components/login'

import { setWalletPassword } from '../actions/Settings'
import { setActivePassword } from '../actions/Context'

import zerologo from '../assets/logo-white.png'
import github from '../assets/github-white.png'
import twitter from '../assets/twitter-white.png'
import telegram from '../assets/telegram-white.png'
import discord from '../assets/discord-white.png'
import heading from '../assets/zero-logo-white.png'


class SetPasswordPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      newPassword: '',
      newPasswordValid: false,
      confirmPassword: '',
      confirmPasswordValid: false,
      noteVisible: 'visible',
      loginVisible: 'none'
    }

    this.setNewPassword = this.setNewPassword.bind(this)
    this.setConfirmPassword = this.setConfirmPassword.bind(this)
    this.handleSetPassword = this.handleSetPassword.bind(this)
    this.confirmNote = this.confirmNote.bind(this)
  }

  confirmNote () {
    this.setState({
      noteVisible: 'none',
      loginVisible: 'visible'
    })
  }

    setNewPassword (p) {
      if (p.length >= 8) {
        p = p.substring(0,8)
      }
      this.setState({
        newPassword: p
      })
      if (p.length == 8) {
        this.setState({
          newPasswordValid: true
        })
      } else {
        this.setState({
          newPasswordValid: false
        })
      }
    }

    setConfirmPassword (p) {
      if (p.length >= 8) {
        p = p.substring(0,8)
      }
      this.setState({
        confirmPassword: p
      })
      if (this.state.newPasswordValid == true && this.state.newPassword == p) {
        this.setState({
          confirmPasswordValid: true
        })
      } else {
        this.setState({
          confirmPasswordValid: false
        })
      }
    }

    handleSetPassword () {
      var pwHash = saltHashPassword(this.state.newPassword, PwSalt)
      this.props.setWalletPassword(pwHash)
      this.props.setActivePassword(this.state.newPassword)
      this.props.onComplete()
    }

    componentDidMount() {
    }

    render () {
      var screenDim = this.props.context.dimensions

      var loginbutton = this.state.confirmPasswordValid == true ? <LoginButton sc={screenDim}
                                                                  onClick={() => this.handleSetPassword()}>
                                                                  Set Password
                                                                  </LoginButton>
                                                                  : ''

      return (
        <LoginGrid sc={screenDim}>
          <LoginForm sc={screenDim}>
          </LoginForm>
          <LoginFormOpaque sc={screenDim} visible= {this.state.noteVisible}>
            <br/>
            <LoginHeading>
              <LoginHeadingImg src={heading} sc={screenDim}/>
            </LoginHeading>
            <LoginPassword>
              Beta
              <div>
                <p>This is a Beta release.</p>
                <p>DO NOT MINE TO THIS WALLET!!!</p>
                <p> This wallet may contain bugs and is intented for evaluation and testing purposes only. </p>
                <p> Team Zero is not responsible for any Zero you may lose by using this wallet. </p>
              </div>
              <LoginButton sc={screenDim}
                onClick={() => this.confirmNote()}>
                Ok
              </LoginButton>
            </LoginPassword>
          </LoginFormOpaque>
          <LoginFormOpaque sc={screenDim} visible={this.state.loginVisible}>
            <br/>
            <LoginHeading>
              <LoginHeadingImg src={heading} sc={screenDim}/>
            </LoginHeading>
            <br/>
            <LoginPassword>
              Set New 8-Digit Password
              <br/>
              <LoginInput
                sc={screenDim}
                type="password"
                value={this.state.newPassword}
                onChange={e => {
                  this.setConfirmPassword('')
                  this.setNewPassword(e.target.value)
                  this.setState({
                    confirmPasswordValid: false
                  })
                }} />
              <br/><br/>
              Confirm Password
              <br/>
              <LoginInput
                sc={screenDim}
                type="password"
                value={this.state.confirmPassword}
                onChange={e => this.setConfirmPassword(e.target.value)} />
              <br/><br/>
              {loginbutton}
            </LoginPassword>
            <br/><br/>
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
