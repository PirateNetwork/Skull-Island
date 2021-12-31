import React from 'react'
// import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { css } from '@emotion/core'
// First way to import
import { RingLoader } from 'react-spinners'

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
`

class RingSpinner extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render() {
    return (
      <div>
        <RingLoader
          css={override}
          sizeUnit={"px"}
          size={100}
          color={'#ffd700'}
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

export default connect(mapStateToProps, matchDispatchToProps)(RingSpinner)
