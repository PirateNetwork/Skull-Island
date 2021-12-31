import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setAddress,
         setBalance} from '../actions/Context'

import { setAddressList } from '../actions/MainSubPage'

import { AddressDiv,
         AddressDropdownButton,
         AddressDropdownButtonLi,
         AddressDropdownContent,
         AddressTitle,
         AddressSectionOverscroll,
         ZAddressButton,
         AddressListUl,
         AddressListLi,
         Col1Div,
         Col2Div,
         Col2Top,
         Col3Div,
         Col4Div,
         Col4Top,
         Col5Div,
         Spacer,} from '../components/addressdropdown'

class AddressDropdown extends React.Component {

  constructor (props) {
    super(props)


    this.toggleList = this.toggleList.bind(this)
    // this.setZAddress = this.setZAddress.bind(this)
    // this.setTAddress = this.setTAddress.bind(this)
  }

  //   async setZAddress(z) {
  //     this.props.setAddress(this.props.context.zAddresses[z].address)
  //     this.props.setBalance(this.props.context.zAddresses[z].balance)
  //     var pk = await privateKey(this.props.context.zAddresses[z].address)
  //     pk = JSON.parse(pk)
  //     this.props.setPrivateKey(pk[0].private_key)
  // }
  //   async setTAddress(t) {
  //     this.props.setAddress(this.props.context.tAddresses[t].address)
  //     this.props.setBalance(this.props.context.tAddresses[t].balance)
  //     var pk = await privateKey(this.props.context.tAddresses[t].address)
  //     pk = JSON.parse(pk)
  //     this.props.setPrivateKey(pk[0].private_key)
  // }


    toggleList () {
      if (this.props.mainSubPage.addressList == 'visible') {
        this.props.setAddressList('none')
      } else {
        this.props.setAddressList('visible')
      }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }


    render() {

      const zlist = this.props.context.zAddresses
      var menuLine = zlist.map((za) => (
        <AddressListUl key={za.address} header={false}>
            <ZAddressButton
              onClick = {e => {
                e.stopPropagation()
                this.toggleList()
                this.props.setAddress(za.address)
                this.props.setBalance(za.balance)
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

      var listOpen
      if (this.props.mainSubPage.addressList == 'visible') {
        listOpen = 'none'
      } else {
        listOpen = 'block'
      }


      var addr =
      <AddressDropdownButton
        onClick = {e => {
          e.stopPropagation()
          this.toggleList()
        }}>
          <AddressDropdownButtonLi>
            <Col1Div></Col1Div>
            <Col2Div>
              <Col2Top>
                  {'Address: ' + this.props.context.address.substr(0, 6) + '...' + this.props.context.address.substr(-6, 6)}
              </Col2Top>
            </Col2Div>
            <Col3Div></Col3Div>
            <Col4Div>
              <Col4Top>
                {'ARRR: ' + (this.props.context.balance/1e08).toFixed(8).toString()}
              </Col4Top>
            </Col4Div>
            <Col5Div></Col5Div>
          </AddressDropdownButtonLi>
      </AddressDropdownButton>

      return (
          <AddressDiv>
            {addr}
            <AddressDropdownContent visible={listOpen}>
              <AddressTitle>
                {'Select Address'}
              </AddressTitle>
              <AddressSectionOverscroll>
                {menuLine}
              </AddressSectionOverscroll>
            </AddressDropdownContent>
          </AddressDiv>
      )
    }

}


AddressDropdown.propTypes = {
  setAddressList: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  mainSubPage: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired
}


function mapStateToProps (state) {
  return {
    mainSubPage: state.mainSubPage,
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setAddress,
      setBalance,
      setAddressList
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(AddressDropdown)
