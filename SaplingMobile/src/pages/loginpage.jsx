import React from 'react'
import PropTypes from 'prop-types'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//import axios from 'axios'
//import tdb from '../database/transactions'
import {
  saltHashPassword,
  PwSalt}from '../utils/hash'

import { setActivePassword } from '../actions/Context'

import { LoginGrid,
         LoginForm,
         LoginFormOpaque,
         LoginHeading,
         LoginHeadingImg,
         LoginPassword,
         LoginInput,
         LoginButton,
         LoginSocialContainer,
         LoginSocial} from '../components/login'

import zerologo from '../assets/logo-white.png'
import github from '../assets/github-white.png'
import twitter from '../assets/twitter-white.png'
import telegram from '../assets/telegram-white.png'
import discord from '../assets/discord-white.png'
import heading from '../assets/zero-logo-white.png'


class LoginPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      invalidPassword: false,
      password: '',
      noteVisible: 'visible',
      loginVisible: 'none'
    }

    this.setPassword= this.setPassword.bind(this)
    this.confirmNote = this.confirmNote.bind(this)
  }

  confirmNote () {
    this.setState({
      noteVisible: 'none',
      loginVisible: 'visible'
    })
  }

    async setPassword (p) {
      if (p.length >= 8) {
        p = p.substring(0,8)
      }

      if (p.length == 8) {
        var pwHash = saltHashPassword(p, PwSalt)
        if (pwHash == this.props.settings.password) {
          this.props.setActivePassword(p)
          this.props.onComplete()
        } else {
          this.setState({
            invalidPassword: true,
            password: ''
          })
        }
      } else {
        this.setState({
          password: p
        })
      }
    }

    render () {

      var screenDim = this.props.context.dimensions

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
                <p> This wallet may contain bugs and is intented for evaluation and testing purposes only.</p>
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
              8-Digit Pin
              <br/>
              <LoginInput
                sc={screenDim}
                type="password"
                value={this.state.password}
                onChange={e => this.setPassword(e.target.value)} />
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


LoginPage.propTypes = {
  setActivePassword: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  onComplete: PropTypes.func.isRequired,
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
      setActivePassword
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(LoginPage)
