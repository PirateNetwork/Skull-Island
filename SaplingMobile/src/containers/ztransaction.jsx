import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setTx,
  setViewingTx} from '../actions/Context'

import {
  setMainPage,
  setTransactionPage,} from '../actions/MainSubPage'

import {
  ZTransactionMain,
  ZTransactionOverScroll,
  ZTransactionTitle,
  ZTransactionDetails,
  ZTransactionDetailFieldName,
  ZTransactionDetailFieldData,
  ZTransactionButtonBar,
  ZTransactionBackButton,
  ZTransactionExplorerButton,
  } from '../components/transaction'


class ZTransaction extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
    }

    this.setTxLocal = this.setTxLocal.bind(this)
  }

    setTxLocal() {
      this.props.setTx(null)
      this.props.setViewingTx(false)
      this.props.setMainPage('visible')
      this.props.setTransactionPage('none')
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }


    render () {

      var transaction
      if (this.props.context.viewingTx) {

          transaction =
          <ZTransactionMain>
            <ZTransactionOverScroll>
              <ZTransactionTitle>
                {'Transaction Details'}
              </ZTransactionTitle>
              <ZTransactionDetails>
                <br/>
                <ZTransactionDetailFieldName>
                  {'Transaction ID:'}
                </ZTransactionDetailFieldName>
                <ZTransactionDetailFieldData>
                  {this.props.context.tx.txid}
                </ZTransactionDetailFieldData>
                <br/>

                <ZTransactionDetailFieldName>
                  {'Block:'}
                </ZTransactionDetailFieldName>
                <ZTransactionDetailFieldData>
                  {this.props.context.tx.block}
                </ZTransactionDetailFieldData>
                <br/>

                <ZTransactionDetailFieldName>
                  {this.props.context.tx.type == 0 ? 'Incoming Address:' : 'Outgoing Address:'}
                </ZTransactionDetailFieldName>
                <ZTransactionDetailFieldData>
                  {this.props.context.tx.address}
                </ZTransactionDetailFieldData>
                <br/>

                <ZTransactionDetailFieldName>
                  {'Value:'}
                </ZTransactionDetailFieldName>
                <ZTransactionDetailFieldData>
                  {Math.abs(this.props.context.tx.value/1e08).toFixed(8).toString()}
                </ZTransactionDetailFieldData>
                <br/>

                <ZTransactionDetailFieldName>
                  {'Memo:'}
                </ZTransactionDetailFieldName>
                <ZTransactionDetailFieldData>
                  {this.props.context.tx.memo}
                </ZTransactionDetailFieldData>
                <br/>

                <ZTransactionButtonBar>
                    <ZTransactionBackButton
                      onClick={e => {
                          this.setTxLocal()
                          e.stopPropagation()
                      }}>
                      {'Back'}
                    </ZTransactionBackButton>
                    <ZTransactionExplorerButton
                      onClick = {e => {
                          window.location.href=this.props.settings.explorerURL + 'tx/' + this.props.context.tx.txid
                          e.stopPropagation()
                     }}>
                      {'Explorer'}
                    </ZTransactionExplorerButton>
                </ZTransactionButtonBar>

              </ZTransactionDetails>
            </ZTransactionOverScroll>

          </ZTransactionMain>
      } else {

          transaction =
          <div>
            <ZTransactionButtonBar>
                <ZTransactionBackButton
                  onClick={() => {
                      this.setTxLocal()
                  }}>
                  {'Back'}
                </ZTransactionBackButton>
            </ZTransactionButtonBar>
          </div>
      }

      return(
        <div>
          {transaction}
        </div>
      )

    }

  }




ZTransaction.propTypes = {
  setTx: PropTypes.func.isRequired,
  setViewingTx: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setTransactionPage: PropTypes.func.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired,
}

function mapStateToProps (state) {
  return {
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
        setTx,
        setViewingTx,
        setMainPage,
        setTransactionPage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ZTransaction)
