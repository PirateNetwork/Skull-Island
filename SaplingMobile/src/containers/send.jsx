import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setMainPage,
  setSendPage} from '../actions/MainSubPage'

import {
  setQrScanning,
  setAddressScanning} from '../actions/Context'

import {
  setSendToAddress,
  setSendToAmount,
  setSendToFiat,
  setSendToMemo} from '../actions/SendTo'

import { send } from '../utils/litewallet'

import {
    BlackBackgroundQR,
  }  from '../pagecomponents/PirateShared'


import Qr from '../containers/qr'

import RingSpinner from '../containers/spinner'
import AddressDropdown from '../containers/addressdropdown'

import {
  SendDiv,
  SendSectionOverscroll,
  SendSection,
  SendTitle,
  SelectAddressTitle,
  SelectAddressDashedArea,
  SendAddressTitle,
  SendDashedArea,
  SendDashedInput,
  SendGradientCapLeft,
  SendGradientCapRight,
  SendRedText,
  SendNoteLineOne,
  SendNoteLineTwo,

  SendAmountTitle,
  SendAmountArea,
  SendAmountDashes,
  SendAmountInput,
  SendAmountGradientCapLeft,
  SendAmountGradientCapRight,

  SendAmountRedText,
  SendAmountFeeText,

  SendUSDArea,
  SendUSDDashes,
  SendUSDInput,
  SendUSDGradientCapLeft,
  SendUSDGradientCapRight,
  SendUSDRedText,

  SendMemoTitle,
  SendMemoArea,
  SendMemoInput,
  SendMemoGradientCapLeft,
  SendMemoGradientCapRight,
  SendMemoRedText,

  SendCurrencyCap,
  SendButton,

  SendConfirmAmount,
  SendConfirmAmountArea,
  SendConfirmCenter,
  SendConfirmCoins,
  SendConfirmCurrency,

  SendConfirmFromAddress,
  SendConfirmFromAddressArea,
  SendConfirmToAddress,
  SendConfirmToAddressArea,
  SendConfirmMemo,
  SendConfirmMemoArea,

  SendConfirmPasswordSection,
  SendPasswordTitle,
  SendPasswordArea,
  SendPasswordInput,
  SendPasswordGradientCapLeft,
  SendPasswordGradientCapRight,
  SendPasswordRedText,

  SendConfirmButtonSection,
  SendBackButton,
  SendConfirmButton,

  SendBuildNote,
  // SendEstBuildTime,
  SendActBuildTime,
  SendSpinner,

  SendSummary,
  SendSummarySent,
  SendSummaryAmountArea,
  SendSummaryAmount,
  SendSummaryAmountCurrency,
  SendSummaryFee,
  SendSummaryTo,
  SendSummaryToAddress,

  SendExplorerButton,
  SendWalletButton,
  SendMoreButton,

  SendFailed,

  getDashedAreaScroll,
  getAmountAreaScroll,
  getUSDAreaScroll,
  getMemoAreaScroll,
  getConfirmPasswordScroll,
} from '../components/send'

class Send extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      fee: 0.0001,
      transactionInput: 'visible',
      transactionConfirm: 'none',
      transactionSuccess: false,
      transactionFailed: false,
      txerror: '',
      txid: '',
      password: '',
      validPassword: false,
      noteQty: 0,
      showButtons: false,
      building: false,
      estimatedBuildTime: 0,
      actualBuildTime: 0,
      start: 0

    }

    this.scrollRef = React.createRef()

    //State Updates
    this.setMemo = this.setMemo.bind(this)
    this.setFee = this.setFee.bind(this)
    this.setTransactionInput = this.setTransactionInput.bind(this)
    this.setTransactionConfirm = this.setTransactionConfirm.bind(this)
    this.setTransactionSuccess = this.setTransactionSuccess.bind(this)
    this.setTransactionFailed = this.setTransactionFailed.bind(this)
    this.setTxError = this.setTxError.bind(this)
    this.setTxid = this.setTxid.bind(this)
    this.setPassword = this.setPassword.bind(this)
    this.setValidPassword = this.setValidPassword.bind(this)
    this.setNoteQty = this.setNoteQty.bind(this)
    this.setShowButtons = this.setShowButtons.bind(this)
    this.setBuilding = this.setBuilding.bind(this)
    this.setEstimatedBuildTime = this.setEstimatedBuildTime.bind(this)
    this.setActualBuildTime = this.setActualBuildTime.bind(this)
    this.buildTimer = this.buildTimer.bind(this)
    this.clearBuildTimer = this.clearBuildTimer.bind(this)
    this.setStart = this.setStart.bind(this)

    //Other Functions
    this.createSpend = this.createSpend.bind(this)
    this.resetSpend = this.resetSpend.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
    this.msToTime = this.msToTime.bind(this)
    this.setSendValues = this.setSendValues.bind(this)
    this.resetScroll = this.resetScroll.bind(this)
  }

    //State Updates
    setMemo (m) {
      if (m.length >= 512) {
        m = m.substring(0,512)
      }
      this.props.setSendToMemo(m)
    }

    setFee (s) {this.setState({fee: s})}
    setTransactionInput (s) {this.setState({transactionInput: s})}
    setTransactionConfirm (s) {this.setState({transactionConfirm: s})}
    setTransactionSuccess (s) {this.setState({transactionSuccess: s})}
    setTransactionFailed (s) {this.setState({transactionFailed: s})}
    setValidPassword (s) {this.setState({validPassword: s})}
    setTxError (s) {this.setState({txerror: s})}
    setTxid (s) {this.setState({txid: s})}
    setNoteQty (s) {this.setState({noteQty: s})}
    setShowButtons (s) {this.setState({showButtons: s})}
    setBuilding (s) {this.setState({building: s})}
    setEstimatedBuildTime (s) {this.setState({estimatedBuildTime: s})}
    setActualBuildTime (s) {this.setState({actualBuildTime: s})}
    setStart (s) {this.setState({start: s})}



    setPassword (p) {

      if (p.length >= 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            validPassword: true,
            showButtons: true,
            password: '',
          })
        } else {
          this.setState({
            validPassword: false,
            password: p,
          })
        }
      } else {
        this.setState({
          password: p
        })
      }
    }

    handleQRScan () {
      this.props.setAddressScanning(false)
      this.props.setQrScanning(true)
      // Prepare QR Scanner
      QRScanner.prepare(function (err, status) {
        // Oh no!
        if (err) {
          alert(JSON.stringify(err))
        }

        // If we are authorized to scan, then only do we invoke
        // the scan method
        if (status.authorized) {
          // Start scanning
          QRScanner.scan(function (err, address) {
            // an error occurred, or the scan was canceled (error code `6`)
            if (err) {
              alert(JSON.stringify(err))
            } else {
              // The scan completed, display the contents of the QR code
              this.props.setMainPage('none')
              this.props.setSendPage('visible')
              this.props.setSendToAddress(address)
            }

            // Set finished scanning
            this.props.setQrScanning(false)
            QRScanner.destroy()
          }.bind(this))

          // Show scanning preview
          QRScanner.show()

          // Set transparency
          this.props.setQrScanning(true)
        } else if (status.denied) {
          // const CUR_LANG = this.props.settings.language
          // alert(TRANSLATIONS[CUR_LANG].SendPage.noCameraPermissions)
          QRScanner.openSettings()
        } else {
          // we didn't get permission, but we didn't get permanently denied. (On
          // Android, a denial isn't permanent unless the user checks the "Don't
          // ask again" box.) We can ask again at the next relevant opportunity.
        }
      }.bind(this))
    }

    safeReleaseCamera () {
      // Destroy QR scanner if user goes back
      // while scanning
      if (this.props.context.qrScanning) {
        QRScanner.destroy()
        this.props.setQrScanning(false)
      }
    }

    setSendValues(v,type) {
      if (type == 0) {
        this.props.setSendToAmount(v)
        this.props.setSendToFiat((v * this.props.context.currencyValue).toFixed(2))
      } else if (type == 1) {
        this.props.setSendToAmount((v/this.props.context.currencyValue).toFixed(8))
        this.props.setSendToFiat(v)
      }
    }

    async createSpend() {
      this.setBuilding(true)

      var start = Date.now()
      this.setStart(start)
      this.buildTimer()

      var sendtx = {
        input: this.props.context.address,
        fee: parseInt(this.state.fee * 1e08),
        output: [],
      }
      sendtx.output.push({
        address: this.props.sendTo.address,
        amount: parseInt(this.props.sendTo.amount * 1e08),
        memo: this.props.sendTo.memo
      })

      sendtx = JSON.stringify(sendtx)
      var tx = await send(sendtx)

      var processingTime = Date.now() - start
      this.setActualBuildTime(processingTime)
      this.clearBuildTimer()
      this.setBuilding(true)

      try {
        var ptx = JSON.parse(tx)
        if (ptx.txid != null) {
          this.setTransactionSuccess(true)
          this.setTxid(ptx.txid)
        } else {
          this.setTransactionFailed(true)
          alert('Tx build failure! ' + ptx.error)
        }
      } catch {
        this.setTransactionFailed(true)
        alert('Tx build failure! ' + tx)
      }

      this.setBuilding(false)
    }


    resetSpend() {
      this.props.setSendToAddress('')
      this.setFee(0.0001)
      this.props.setSendToAmount(0)
      this.props.setSendToFiat(0)
      this.setMemo('')
      this.setPassword('')
      this.setValidPassword(false)
      this.setTxError('')
      this.setTxid('')
      this.setTransactionSuccess(false)
      this.setTransactionFailed(false)
      this.setTransactionConfirm('none')
      this.setTransactionInput('visible')
      this.setBuilding(false)
      this.setActualBuildTime(0)
      this.resetScroll(0)
    }

    buildTimer() {
      this.buildID = setInterval(
        () => this.setActualBuildTime(Date.now() - this.state.start),100
      )
    }

    clearBuildTimer() {
      clearInterval(this.buildID)
    }

    msToTime(duration) {
      var milliseconds = parseInt((duration % 1000) / 100),
          seconds = Math.floor((duration / 1000) % 60),
          minutes = Math.floor((duration / (1000 * 60)) % 60),
          hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;

      return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
    }

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }

    componentDidMount() {
    }

    componentWillUnmount () {
      this.safeReleaseCamera()
      this.clearBuildTimer()
    }

    render () {

        if ((this.state.transactionSuccess || this.state.transactionFailed) && this.props.mainSubPage.sendPage == 'none') {
          this.resetSpend()
        }

        if (this.props.context.addrScanning) {
           this.handleQRScan()
        }

        var height = this.props.context.dimensions.height
        var width = this.props.context.dimensions.width

        var hsize = 0.875
        if (this.state.transactionInput == 'visible') {
          hsize = 0.875 * 2
        }

        if (this.state.transactionConfirm == 'visible') {
          hsize = 0.875 * 2
        }

        var displayCompletedTransaction
        if (this.state.transactionSuccess == true) {
          displayCompletedTransaction = 'visible'
          hsize = 0.875 * 1
        } else {
          displayCompletedTransaction = 'none'
        }

        var displayFailedTransaction
        if (this.state.transactionFailed == true) {
          displayFailedTransaction = 'visible'
          hsize = 0.875 * 1
        } else {
          displayFailedTransaction = 'none'
        }

        var spinner
        var displayBuilding
        if (this.state.building == true) {
          hsize = 0.875 * 1
          displayBuilding = 'visible'
          spinner = <RingSpinner />
        } else {
          displayBuilding = 'none'
          spinner = ''
        }

        var sendConfirmButton
        var displaySendPassword
        if (this.state.validPassword == true) {
          displaySendPassword = 'none'
          sendConfirmButton =
              <SendConfirmButton
                onClick={() => {
                  this.resetScroll(0)
                  this.setTransactionConfirm('none')
                  this.createSpend()}}>
                {'Send'}
              </SendConfirmButton>
        } else {
          displaySendPassword = 'visible'
          sendConfirmButton =
              <SendConfirmButton disabled = {true}>
                {'Send'}
              </SendConfirmButton>
        }

        var sendButton
        if (this.props.sendTo.amount > 0) {
            sendButton =
            <SendButton mlength = {this.props.sendTo.memo.length}
              onClick={() => {
                this.resetScroll(0)
                this.setTransactionConfirm('visible')
                this.setTransactionInput('none')
              }}>
              {'Send'}
            </SendButton>
        } else {
          sendButton =
          <SendButton disabled = {true} mlength = {this.props.sendTo.memo.length}>
            {'Send'}
          </SendButton>
        }

        const scanning =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0', display: 'visible'}

        return (
            <SendDiv visible={this.props.mainSubPage.sendPage}>
              <BlackBackgroundQR qrScanning = {scanning}>
                <SendSectionOverscroll ref = {this.scrollRef}>

                  <SendSection hsize= {hsize} visible={displayFailedTransaction}>
                    <SendTitle>
                      {'Transaction Failed'}
                    </SendTitle>
                    <SendFailed>
                      {this.state.txerror}
                    </SendFailed>
                    <SendWalletButton
                      onClick={() => {
                        this.props.setSendPage('none')
                        this.props.setMainPage('visible')}}>
                      {'Wallet'}
                    </SendWalletButton>
                    <SendMoreButton
                    onClick={() => {
                      this.resetSpend()}}>
                      {'Send More'}
                    </SendMoreButton>
                  </SendSection>

                  <SendSection hsize= {hsize} visible={displayCompletedTransaction}>
                    <SendTitle>
                      {'Transaction Summary'}
                    </SendTitle>

                    <SendSummary>
                      <SendSummarySent>
                        {'Amount sent:'}
                      </SendSummarySent>
                      <SendSummaryAmountArea>
                        <SendSummaryAmount>
                          {this.props.sendTo.amount/1.0}
                        </SendSummaryAmount>
                        <SendSummaryAmountCurrency>
                          {'ARRR'}
                        </SendSummaryAmountCurrency>
                      </SendSummaryAmountArea>
                      <SendSummaryFee>
                        {'Transaction Fee: ' + (this.state.fee/1.0).toFixed(4) + ' ARRR'}
                      </SendSummaryFee>
                      <SendSummaryTo>
                        {'To:'}
                      </SendSummaryTo>
                      <SendSummaryToAddress>
                        {this.props.sendTo.address}
                      </SendSummaryToAddress>
                    </SendSummary>

                    <SendExplorerButton
                     onClick = {e => {
                      e.stopPropagation()
                      window.location.href=this.props.settings.explorerURL + 'tx/' + this.state.txid
                      }}>
                      {'View on Explorer'}
                    </SendExplorerButton>
                    <SendWalletButton
                      onClick={() => {
                        this.props.setSendPage('none')
                        this.props.setMainPage('visible')}}>
                      {'Wallet'}
                    </SendWalletButton>
                    <SendMoreButton
                    onClick={() => {
                      this.resetSpend()}}>
                      {'Send More'}
                    </SendMoreButton>
                  </SendSection>


                  <SendSection hsize= {hsize} visible={displayBuilding}>
                    <SendTitle>
                      {'Sending Transaction'}
                    </SendTitle>
                    <SendBuildNote>
                    {'Please wait while'}
                    <br/>
                    {'sending transaction.'}
                    </SendBuildNote>
                    <SendActBuildTime>
                      {'Actual time: ' + this.msToTime(this.state.actualBuildTime)}
                    </SendActBuildTime>
                    <SendSpinner>
                      {spinner}
                    </SendSpinner>
                  </SendSection>





                  <SendSection hsize= {hsize} visible={this.state.transactionConfirm}>
                    <SendTitle>
                      {'Confirm Transaction'}
                    </SendTitle>
                    <SendConfirmAmount>
                      {'You are about to send'}
                    </SendConfirmAmount>
                    <SendConfirmAmountArea>
                      <SendConfirmCenter>
                        <SendConfirmCoins>
                          {(this.props.sendTo.amount/1.0).toFixed(8)}
                        </SendConfirmCoins>
                        <SendConfirmCurrency>
                          {'ARRR'}
                        </SendConfirmCurrency>
                      </SendConfirmCenter>
                    </SendConfirmAmountArea>
                    <SendConfirmFromAddress>
                      {'From your address'}
                    </SendConfirmFromAddress>
                    <SendConfirmFromAddressArea>
                      {this.props.context.address}
                    </SendConfirmFromAddressArea>
                    <SendConfirmToAddress>
                      {'To this address'}
                    </SendConfirmToAddress>
                    <SendConfirmToAddressArea>
                      {this.props.sendTo.address}
                    </SendConfirmToAddressArea>
                    <SendConfirmMemo>
                      {'Memo'}
                    </SendConfirmMemo>
                    <SendConfirmMemoArea mlength = {this.props.sendTo.memo.length}>
                      {this.props.sendTo.memo}
                    </SendConfirmMemoArea>
                    <SendConfirmPasswordSection visible = {displaySendPassword} mlength = {this.props.sendTo.memo.length}>
                      <SendPasswordTitle>
                        {'Enter password'}
                      </SendPasswordTitle>
                      <SendPasswordArea>
                        <SendPasswordGradientCapLeft />
                        <SendPasswordInput
                          type="password"
                          value={this.state.password}
                          onChange={e => this.setPassword(e.target.value)}
                          onClick = {() => {
                            var scrollPos = getConfirmPasswordScroll(height,width,this.props.sendTo.memo.length)
                            this.resetScroll(scrollPos)
                          }} />
                        <SendPasswordGradientCapRight />
                      </SendPasswordArea>
                      <SendPasswordRedText>
                        {'Enter your wallet password'}
                      </SendPasswordRedText>
                    </SendConfirmPasswordSection>

                    <SendConfirmButtonSection visible = {displaySendPassword} mlength = {this.props.sendTo.memo.length}>
                      <SendBackButton
                        onClick={() => {
                        this.setTransactionConfirm('none')
                        this.setTransactionInput('visible')
                        this.setTransactionFailed(false)
                        this.setPassword('')
                        this.setValidPassword(false)
                      }}>
                        {'Back'}
                      </SendBackButton>
                      {sendConfirmButton}
                    </SendConfirmButtonSection>

                  </SendSection>





                  <SendSection hsize= {hsize} visible={this.state.transactionInput}>
                    <SendTitle>
                      {'Sending'}
                    </SendTitle>
                    <SelectAddressTitle>
                      {'Send from Address:'}
                    </SelectAddressTitle>
                    <SelectAddressDashedArea>
                      <AddressDropdown/>
                    </SelectAddressDashedArea>
                    <SendAddressTitle>
                      {'Send to address:'}
                    </SendAddressTitle>
                    <SendDashedArea>
                      <SendGradientCapLeft/>
                      <SendDashedInput
                        value={this.props.sendTo.address}
                        onChange={e => this.props.setSendToAddress(e.target.value)}
                        onClick = {() => {
                          var scrollPos = getDashedAreaScroll(height,width)
                          this.resetScroll(scrollPos)
                        }} />
                      <SendGradientCapRight/>
                    </SendDashedArea>
                    <SendRedText>
                      {'Enter a VALID address.'}
                    </SendRedText>
                    <SendNoteLineOne>
                      {'Please enter only Pirate Chain Z addresses.'}
                    </SendNoteLineOne>
                    <SendNoteLineTwo>
                      {'Not doing so will result in LOST funds!!!'}
                    </SendNoteLineTwo>


                    <SendAmountTitle>
                      {'Send amount:'}
                    </SendAmountTitle>
                    <SendAmountArea>
                      <SendAmountGradientCapLeft />
                      <SendAmountDashes>
                        <SendAmountInput type="number"
                          value={this.props.sendTo.amount}
                          onChange={e => this.setSendValues(e.target.value,0)}
                          onClick = {() => {
                            var scrollPos = getAmountAreaScroll(height,width)
                            this.resetScroll(scrollPos)
                          }} />
                      </SendAmountDashes>
                      <SendCurrencyCap>
                        {'ARRR'}
                      </SendCurrencyCap>
                      <SendAmountGradientCapRight />
                    </SendAmountArea>
                    <SendAmountFeeText>
                      {'Fee: 0.0001 ARRR'}
                    </SendAmountFeeText>
                    <SendAmountRedText>
                      {'Enter a VALID amount.'}
                    </SendAmountRedText>


                    <SendUSDArea>
                      <SendUSDGradientCapLeft />
                      <SendUSDDashes>
                        <SendUSDInput type="number"
                          value={this.props.sendTo.fiat}
                          onChange={e => this.setSendValues(e.target.value,1)}
                          onClick = {() => {
                            var scrollPos = getUSDAreaScroll(height,width)
                            this.resetScroll(scrollPos)
                          }}/>
                      </SendUSDDashes>
                      <SendCurrencyCap>
                        {'USD'}
                      </SendCurrencyCap>
                      <SendUSDGradientCapRight />
                    </SendUSDArea>
                    <SendUSDRedText>
                      {'Enter a VALID amount.'}
                    </SendUSDRedText>

                    <SendMemoTitle>
                      {'Memo'}
                    </SendMemoTitle>
                    <SendMemoArea mlength = {this.props.sendTo.memo.length}>
                      <SendMemoGradientCapLeft />
                      <SendMemoInput mlength = {this.props.sendTo.memo.length}
                        value={this.props.sendTo.memo}
                        onChange={e => this.setMemo(e.target.value)}
                        onClick = {() => {
                          var scrollPos = getMemoAreaScroll(height,width)
                          this.resetScroll(scrollPos)
                        }}/>
                      <SendMemoGradientCapRight />
                    </SendMemoArea>
                    <SendMemoRedText mlength = {this.props.sendTo.memo.length}>
                      {this.props.sendTo.memo.length > 0 ? (512 - this.props.sendTo.memo.length) + ' character remaining' : 'Max 512 characters.'}
                    </SendMemoRedText>
                    {sendButton}
                  </SendSection>
                </SendSectionOverscroll>
            </BlackBackgroundQR>
            <Qr />
          </SendDiv>
        )
    }
  }




Send.propTypes = {
  setMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired,
  setAddressScanning: PropTypes.func.isRequired,
  setSendToAddress: PropTypes.func.isRequired,
  setSendToAmount: PropTypes.func.isRequired,
  setSendToFiat: PropTypes.func.isRequired,
  setSendToMemo: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired,
  sendTo: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    mainSubPage: state.mainSubPage,
    sendTo: state.sendTo
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setSendPage,
      setMainPage,
      setQrScanning,
      setAddressScanning,
      setSendToAddress,
      setSendToAmount,
      setSendToFiat,
      setSendToMemo
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Send)
