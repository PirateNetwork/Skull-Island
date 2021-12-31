import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { coins } from '../utils/coins.js'
import { encrypt, saltHashPassword, KeySalt } from '../utils/hash.js'
import { setSeedPhrase, setBirthday } from '../actions/Secrets'
import { setMinimumBlock, setWalletPassPhrase } from '../actions/Settings'
import { setQrScanning, setWalletLoaded } from '../actions/Context'

import Qr from '../containers/qr'
import RingSpinner from '../containers/spinner'

import { restoreWallet,
         checkSeedPhrase,
         getSeedPhrase,
         save,
         encryptionstatus,
         encryptWallet,
         unlock,} from '../utils/litewallet'

import {
    BlackBackgroundQR,
  }  from '../pagecomponents/PirateShared'

 import {
   WalletMainSection,
   WalletHeaderFade,
   WalletFade,
   WalletTitle,
   WalletSubSection,
   WalletNewButton,
   WalletRecoverButton,
   WalletPassPhraseTitle,
   WalletPassPhraseArea,
   WalletPassPhraseInput,
   WalletPassPhraseInnerInput,
   WalletPassPhraseGradientCapLeft,
   WalletPassPhraseGradientCapRight,
   WalletPassPhraseRedText,
   WalletBackButton,
   WalletNewPhraseButton,
   WalletCreateButton,
   WalletHeightTitle,
   WalletHeightArea,
   WalletHeightInput,
   WalletGradientCapLeft,
   WalletGradientCapRight,
   WalletSpinner
  } from '../components/wallet'


class SetWalletPage extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      openSection: 1,
      tempSeedPhrase: '',
      tempBirthday: 0,
      tempSeedPhraseInvalid: '',
      createWallet: false
    }

    this.setTempSeedPhraseInvalid = this.setTempSeedPhraseInvalid.bind(this)
    this.setTempSeedPhrase = this.setTempSeedPhrase.bind(this)
    this.setTempBirthday = this.setTempBirthday.bind(this)
    this.safeReleaseCamera = this.safeReleaseCamera.bind(this)
    this.handleQRScan = this.handleQRScan.bind(this)
    this.restoreWallet = this.restoreWallet.bind(this)
    this.setWallet = this.setWallet.bind(this)
    this.getNewPhrase = this.getNewPhrase.bind(this)
  }

  setSection (p) {
    if (p == 1) {
      this.setState({
        openSection: p,
        tempBirthday: this.props.secrets.birthday,
        tempSeedPhrase: this.props.secrets.seedPhrase
      })
    } else {
      this.setState({
        openSection: p
      })
    }
  }

  setTempSeedPhraseInvalid(b) {
    if (b) {
      this.setState({
        tempSeedPhraseInvalid: 'Seed Phrase Invalid!!!',
        createWallet: false
      })
    } else {
      this.setState({
        tempSeedPhraseInvalid: '',
        createWallet: true
      })
    }
  }
  setTempSeedPhrase (p) {
    this.setState({tempSeedPhrase: p})
    this.checkSeed(p)
  }

  setTempBirthday (p) {

    try {
      if ( p != '') {
        if (Number.isInteger(+p)) {
          p = Math.floor(+p)
        } else {
          p = this.state.tempBirthday
        }
      }
    } catch {
      p = coins[this.props.settings.currentCoin].branchHeight['sapling']
    }

    this.setState({tempBirthday: p})
  }

  handleQRScan () {
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
        QRScanner.scan(function (err, data) {
          // an error occurred, or the scan was canceled (error code `6`)
          if (err) {
            alert(JSON.stringify(err))
          } else {
            // The scan completed, display the contents of the QR code
            const qrReadData = JSON.parse(data)
            this.setState({
              tempSeedPhrase: qrReadData.passphrase,
              tempBirthday: qrReadData.height
            })
            this.checkSeed(this.state.tempSeedPhrase)
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

  async restoreWallet(s) {
    const currentCoin = this.props.settings.currentCoin
    var minHeight = coins[currentCoin].branchHeight['sapling']
    var args = [coins[currentCoin].litewallet[0]]
    args.push(coins[currentCoin].addressParams)
    var seedCheck = await checkSeedPhrase(this.state.tempSeedPhrase)
    seedCheck = JSON.parse(seedCheck)

    if (seedCheck.checkSeedPhrase == 'Ok') {
      args.push(this.state.tempSeedPhrase)
      try {

        if (this.state.tempBirthday > minHeight) {
          if (this.state.tempBirthday <= this.props.secrets.birthday) {
              args.push(this.state.tempBirthday.toString())
          } else {
              args.push(this.props.secrets.birthday.toString())
          }
        } else {
          args.push(minHeight.toString())
        }
        var seed = await restoreWallet(args)
        seed = JSON.parse(seed)
        if (seed.seed != null) {
          const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
          const pass = encrypt(seed.seed, keyHash)
          this.props.setWalletPassPhrase(pass)
          this.setWallet(seed, currentCoin)
          this.props.setWalletLoaded(true)
        }

      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    } else {
      this.setSection(s)
      this.setTempSeedPhraseInvalid(true)
    }
  }

  async getNewPhrase() {
    var seed
    try {
      seed = await getSeedPhrase()
    } catch (err) {
      if (process.env.NODE_ENV != 'production') {
        console.log(err)
      }
    }
    seed = JSON.parse(seed)
    this.setTempSeedPhrase(seed.seedPhrase)
    this.setTempBirthday(this.props.secrets.birthday)
    this.setTempSeedPhraseInvalid(false)
  }

  async checkSeed(seed) {
    var seedCheck = await checkSeedPhrase(seed)
    seedCheck = JSON.parse(seedCheck)
    if (seedCheck.checkSeedPhrase == 'Ok') {
      this.setTempSeedPhraseInvalid(false)
    } else {
      this.setTempSeedPhraseInvalid(true)
    }
  }

  async setWallet(seed, currentCoin) {
    var walletFile = await save(coins[currentCoin].networkname)
    walletFile = JSON.parse(walletFile)
    if(walletFile.saved) {
      this.props.setHasExistingWallet(true)
      this.props.setSeedPhrase(seed.seed)
      this.props.setBirthday(seed.birthday)
    }

    //Check to make sure wallet.dat is encrypted
    var encryptStatus = await encryptionstatus()
    encryptStatus = JSON.parse(encryptStatus)
    if (!encryptStatus.encrypted) {
        await encryptWallet(this.props.context.activePassword)
    }

    await unlock(this.props.context.activePassword)
    encryptStatus = await encryptionstatus()
    encryptStatus = JSON.parse(encryptStatus)
    if (encryptStatus.locked) {
      alert("WARNING!!! wallet.dat failed to unlock, restart app.")
    } else {
      await save(coins[currentCoin].networkname)
      await unlock(this.props.context.activePassword)
    }
    console.log(encryptStatus)

  }

  componentDidMount () {
    this.setTempSeedPhrase(this.props.secrets.seedPhrase)
    this.setTempBirthday(this.props.secrets.birthday)
  }

  componentWillUnmount () {
    this.safeReleaseCamera()
  }

    render () {
      const scanning =  this.props.context.qrScanning ? {opacity: '0.0', display: 'none'} : {opacity: '1.0', display: 'visible'}

      var buttonDisplay = 'none'
      if (this.state.createWallet) {
        buttonDisplay = 'visible'
      }

      var walletSection
      switch (this.state.openSection) {
        case 1:
          walletSection =
          <WalletSubSection visible = {'visible'}>
            <WalletNewButton
              onClick={() => {
                this.setSection(2)
            }}>
              {'New Wallet'}
            </WalletNewButton>
            <WalletRecoverButton
              onClick={() => {
                this.setTempSeedPhrase('')
                this.setTempBirthday(coins[this.props.settings.currentCoin].branchHeight['sapling'])
                this.setSection(3)
            }}>
              {'Recover Wallet'}
            </WalletRecoverButton>
          </WalletSubSection>
          break


        case 2: //Create New Wallet
          walletSection =
          <WalletSubSection visible = {'visible'}>
            <WalletPassPhraseTitle>
              {'New Passphrase:'}
            </WalletPassPhraseTitle>
            <WalletPassPhraseArea>
              <WalletPassPhraseGradientCapLeft />
              <WalletPassPhraseInput>
                <WalletPassPhraseInnerInput value={this.state.tempSeedPhrase}/>
              </WalletPassPhraseInput>
              <WalletPassPhraseGradientCapRight />
            </WalletPassPhraseArea>
            <WalletPassPhraseRedText>
              {this.state.tempSeedPhraseInvalid}
            </WalletPassPhraseRedText>


            <WalletNewPhraseButton
              onClick={() => this.getNewPhrase()}>
              {'New Phrase'}
            </WalletNewPhraseButton>
            <WalletBackButton
              onClick={() => this.setSection(1)}>
              {'Back'}
            </WalletBackButton>
            <WalletCreateButton visible = {buttonDisplay}
                onClick={() => {
                  this.setSection(4)
                  this.restoreWallet(3)
                }}>
              {'Create Wallet'}
            </WalletCreateButton>
          </WalletSubSection>
          break

        case 3: //Recover Wallet
          walletSection =
          <WalletSubSection visible = {'visible'}>
            <WalletPassPhraseTitle>
              {'Enter Passphrase:'}
            </WalletPassPhraseTitle>
            <WalletPassPhraseArea>
              <WalletPassPhraseGradientCapLeft />
              <WalletPassPhraseInput>
                <WalletPassPhraseInnerInput
                value={this.state.tempSeedPhrase}
                onChange = { (e) => {
                  this.setTempSeedPhrase(e.target.value)
                }}/>
              </WalletPassPhraseInput>
              <WalletPassPhraseGradientCapRight />
            </WalletPassPhraseArea>
            <WalletPassPhraseRedText>
              {this.state.tempSeedPhraseInvalid}
            </WalletPassPhraseRedText>

            <WalletHeightTitle>
             {'Recovery Height:'}
            </WalletHeightTitle>
            <WalletHeightArea>
              <WalletGradientCapLeft />
              <WalletHeightInput
                type = "number"
                value={this.state.tempBirthday}
                onChange={e => this.setTempBirthday(e.target.value)} />
              <WalletGradientCapRight />
            </WalletHeightArea>

            <WalletNewPhraseButton
              onClick={() => this.handleQRScan()}>
              {'Scan QR'}
            </WalletNewPhraseButton>
            <WalletBackButton
              onClick={() => this.setSection(1)}>
              {'Back'}
            </WalletBackButton>
            <WalletCreateButton visible = {buttonDisplay}
                onClick={() => {
                  this.setSection(4)
                  this.restoreWallet(3)
                }}>
              {'Recover Wallet'}
            </WalletCreateButton>
          </WalletSubSection>

          break
        case 4:
          walletSection =
            <WalletSubSection visible = {'visible'}>
              <WalletPassPhraseTitle alignment = {'center'}>
                {'Initalizing'}
              </WalletPassPhraseTitle>
              <WalletSpinner>
                <RingSpinner/>
              </WalletSpinner>
            </WalletSubSection>
            break

        default:
            walletSection = <div></div>
      }


      return (
        <div>
          <BlackBackgroundQR qrScanning = {scanning}>
            <WalletMainSection qrScanning = {scanning} >
              <WalletHeaderFade>
                <WalletTitle>
                  {'Create Wallet'}
                </WalletTitle>
              </WalletHeaderFade>
              <WalletFade>
              </WalletFade>
              {walletSection}
            </WalletMainSection>
          </BlackBackgroundQR>
          <Qr/>
        </div>
      )
    }
  }



SetWalletPage.propTypes = {
  setWalletPassPhrase: PropTypes.func.isRequired,
  setWalletLoaded: PropTypes.func.isRequired,
  setQrScanning: PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setMinimumBlock: PropTypes.func.isRequired,
  setHasExistingWallet: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setWalletPassPhrase,
      setWalletLoaded,
      setQrScanning,
      setSeedPhrase,
      setBirthday,
      setMinimumBlock,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SetWalletPage)
