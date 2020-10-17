import React from 'react'
// import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { css } from '@emotion/core'
// First way to import
import { PropagateLoader } from 'react-spinners'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`

class Loader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div>
        <PropagateLoader
          css={override}
          sizeUnit={"px"}
          size={15}
          color={'#a6a6a6'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    context: state.context
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Loader)
