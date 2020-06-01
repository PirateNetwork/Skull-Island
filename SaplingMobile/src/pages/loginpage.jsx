import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  saltHashPassword,
  PwSalt}from '../utils/hash'

import { setActivePassword } from '../actions/Context'

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
  }  from '../pagecomponents/PirateLogin'

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
        var pwHash = saltHashPassword(p, PwSalt)
        if (pwHash == this.props.settings.password) {
          this.props.setActivePassword(p)
          this.props.onComplete()
          this.setState({
            password: '',
          })
        } else {
          this.setState({
            invalidPassword: true,
            password: p
          })
        }
      } else {
        this.setState({
          password: p
        })
      }
    }

    render () {
      // console.log("Render Login")
      return (
        <BlackBackground>
          <LoginHeaderFade>
            <LoginTitle>
              {'Wallet Login'}
            </LoginTitle>
          </LoginHeaderFade>
          <LoginFade>
          </LoginFade>
          <LoginSectionOverscroll>
            <LoginSection>
              <LoginPWTitle>
                {'Password:'}
              </LoginPWTitle>
              <LoginPWArea>
                <LoginPWGradientCapLeft/>
                <LoginPWInput
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setPassword(e.target.value)} />
                <LoginPWGradientCapRight/>
              </LoginPWArea>
              <LoginPWRedText>
                {'Enter your wallet password'}
              </LoginPWRedText>
            </LoginSection>
          </LoginSectionOverscroll>
        </BlackBackground>
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
