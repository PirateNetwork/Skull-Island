import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setAddress,
  setBalance,} from '../actions/Context'

import {
  setMainPage,
  setPrivateKeyPage,} from '../actions/MainSubPage'

import {
  ZAddressListMain,
  ZAddressListOverScroll,
  AddressListLi,
  AddressListUl,
  Col1Div,
  Col2Div,
  Col2Top,
  // Col2Bottom,
  Col3Div,
  Col4Div,
  Col4Top,
  // Col4Bottom,
  Col5Div,
  Spacer,
  ZAddressButton,} from '../components/zaddressList'


class ZAddressList extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      addressList: <div></div>,
      zlist: []
    }

    this.setAddressList = this.setAddressList.bind(this)
    this.createAddressList = this.createAddressList.bind(this)
    this.setZList = this.setZList.bind(this)
  }

    setAddressList (b) {this.setState({addressList: b})}
    setZList (b) {this.setState({zlist: b})}

    createAddressList () {
      try {
          const zlist = this.props.context.zAddresses
          this.setZList(zlist)
          var addressDisplay = zlist.map((za) => (
            <AddressListUl key={za.address} header={false}>
                <ZAddressButton
                  onClick = {() => {
                    this.props.setAddress(za.address)
                    this.props.setBalance(za.balance)
                    this.props.setMainPage('none')
                    this.props.setPrivateKeyPage('visible')
                  }}>
                    <AddressListLi>
                      <Col1Div></Col1Div>
                      <Col2Div>
                        <Col2Top>
                            {'Address: ' + za.address.substr(0, 6) + '...' + za.address.substr(-6, 6)}
                        </Col2Top>
                      </Col2Div>
                      <Col3Div></Col3Div>
                      <Col4Div>
                        <Col4Top>
                          {'ARRR: ' + (za.balance/1e08).toFixed(8).toString()}
                        </Col4Top>
                      </Col4Div>
                      <Col5Div></Col5Div>
                    </AddressListLi>
                </ZAddressButton>
                <Spacer/>
            </AddressListUl>
          ))


          if (this.state.addressList != addressDisplay) {
            this.setAddressList(addressDisplay)
          }
      } catch {
          this.setAddressList(<div></div>)
          this.setZList([])
      }

    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render () {

        if (this.state.zlist != this.props.context.zAddresses) {
            this.createAddressList()
        }

        return (
          <ZAddressListMain>
            <ZAddressListOverScroll>
              {this.state.addressList}
            </ZAddressListOverScroll>
          </ZAddressListMain>
        )
    }
  }

ZAddressList.propTypes = {
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
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
      setAddress,
      setBalance,
      setMainPage,
      setPrivateKeyPage,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ZAddressList)
