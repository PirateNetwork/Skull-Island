import React from 'react'
import PropTypes from 'prop-types'


import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

//import axios from 'axios'
//import tdb from '../database/transactions'

import {
  setZMainPage,
  setReindexPage} from '../actions/MainSubPage'

import {
  setReindex,} from '../actions/Context'

import {
  LoginGrid,
  LoginForm,
  LoginFormOpaque,
  LoginButton,
  LoginPassword,
  LoginInput,
  ReindexSection,
  } from '../components/login'


class ReindexPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      confirmPasswordValid: false,
      password: ''
    }

    this.setPassword= this.setPassword.bind(this)
    this.closePage= this.closePage.bind(this)
  }

  setPassword (p) {
    if (p.length >= 8) {
      p = p.substring(0,8)
    }

    if (p.length == 8) {
      if (p == this.props.context.activePassword) {
        this.setState({
          confirmPasswordValid: true,
          password: p
        })
      } else {
        this.setState({
          confirmPasswordValid: false,
          password: ''
        })
      }
    } else {
      this.setState({
        password: p
      })
    }
  }

  closePage() {
    this.setState({
      confirmPasswordValid: 'false',
      password: ''
    })
    this.props.setZMainPage('visible')
    this.props.setReindexPage('none')
  }

    render () {

      var screenDim = this.props.context.dimensions

      var reindexbutton = this.state.confirmPasswordValid == true ? <LoginButton sc={screenDim}
                                                                  onClick={() => {
                                                                    this.props.setReindex(2)
                                                                    this.closePage()
                                                                  }}>
                                                                  Rescan
                                                                  </LoginButton>
                                                                  : ''

      var rescanbutton = this.state.confirmPasswordValid == true ? <LoginButton sc={screenDim}
                                                                  onClick={() => {
                                                                    this.props.setReindex(1)
                                                                    this.closePage()
                                                                  }}>
                                                                  Rescan
                                                                  </LoginButton>
                                                                  : ''

      return (
        <ReindexSection visible={this.props.mainSubPage.reindexPage}>
          <LoginGrid sc={screenDim}>
            <LoginForm sc={screenDim}>
            </LoginForm>
            <LoginFormOpaque sc={screenDim} visible={'visible'}>
              <br/><br/>
              <LoginPassword>
                Enter 8-Digit Pin to Enable Reindex
                <br/>
                <LoginInput
                  sc={screenDim}
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setPassword(e.target.value)} />
              </LoginPassword>
              <br/><br/>
              <LoginPassword>
                Re-Scan chain from
                <br/>
                first known transaction
                <br/>
                {rescanbutton}
              </LoginPassword>
              <br/><br/>
              <LoginPassword>
                Re-Scan chain from
                <br/>
                first Sapling block
                <br/>
                {reindexbutton}
              </LoginPassword>
              <br/><br/>
              <LoginPassword>
                <LoginButton sc={screenDim}
                  onClick={() => this.closePage()}>
                  Cancel
                  </LoginButton>
              </LoginPassword>
            </LoginFormOpaque>
          </LoginGrid>
        </ReindexSection>
      )
    }

  }


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
