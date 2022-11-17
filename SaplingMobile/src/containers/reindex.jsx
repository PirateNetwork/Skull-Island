import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { coins } from '../utils/coins.js'
import logo from '../assets/svg/QR_Logo.svg'

import {
  setMainPage,
  setReindexPage} from '../actions/MainSubPage'

import { setSeedPhrase, setBirthday } from '../actions/Secrets'

import { setSynced,
         setSaving,
         setAddress,
         setBalance,
         setPrivateKey,
         setMenuReady,
         setRefreshAddresses } from '../actions/Context'

import { decrypt, saltHashPassword, KeySalt } from '../utils/hash.js'

import Loader from '../containers/loader'

import { sync,
         syncStatus,
         privateKey,
         newZAddress,
         initalizeWallet,
         restoreWallet,
         encryptionstatus,
         encryptWallet,
         unlock,
         save,
         walletSeed} from '../utils/litewallet'

import {
    ReindexDiv,
    ReindexSection,
    ReindexSectionOverscroll,
    ReindexTitle,
    ReindexLoader,
    ReindexPWTitle,
    ReindexPWArea,
    ReindexPWInput,
    ReindexPWGradientCapLeft,
    ReindexPWGradientCapRight,
    ReindexPWRedText,
    ReindexNote1,
    ReindexNote2,
    ReindexFirstKnownButton,
    ReindexFirstNote,
    ReindexFullButton,
    ReindexFullNote,
    ReindexButton,
    ReindexBackButton,
    ReindexButtonImg,
} from '../components/reindex'


class ReindexPage extends React.Component {

  constructor (props) {
    super(props)

      this.state = {
        pin: 'visible',
        key: 'none',
        password: '',
        birthday: 0,
        spinnerMsg: 'Completing Operations...',
        reset: true
      }

      this.scrollRef = React.createRef()

      //State Updates
      this.setPassword = this.setPassword.bind(this)
      this.setReset = this.setReset.bind(this)
      this.resetScroll = this.resetScroll.bind(this)

      this.setTempBirthday = this.setTempBirthday.bind(this)
      this.reInitalize = this.reInitalize.bind(this)
    }

    setMsg(m) {
      this.setState({
        spinnerMsg: m
      })
    }

    setTempBirthday (p) {

      try {
        p = Math.floor(p)
      } catch {
        p = coins[this.props.settings.currentCoin].branchHeight['sapling']
      }

      this.setState({birthday: p})

    }

    setPassword (p) {
      if (p.length >= 8) {
        if (p == this.props.context.activePassword) {
          this.setState({
            pin: 'none',
            key: 'visible',
            password: '',
            reset: false,
            birthday: this.props.secrets.birthday
          })
        } else {
          this.setState({
            pin: 'visible',
            key: 'none',
            password: p,
            reset: true
          })
        }
      } else {
        this.setState({
          password: p,
          reset: false
        })
      }
    }

    setReset() {
      this.setState({
        pin: 'visible',
        key: 'none',
        password: '',
        reset: true
      })
    }

    resetScroll (p) {
      this.scrollRef.current.scrollTop = p
    }

    async reInitalize () {
        this.props.setSaving(true)
        this.setMsg('Re-Initalizing Wallet...')
        const key = this.props.settings.currentCoin
        var seed
        var args
        var passPhrase

        if (this.props.settings.passPhrase == null) {
          this.setMsg('Master seed not set, Restart App!!!')
        } else {
          try {
            const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
            passPhrase = decrypt(this.props.settings.passPhrase,keyHash)
          } catch {
            passPhrase = null
          }
        }

        if (passPhrase == null) {
          this.setMsg('Master seed not set, Restart App!!!')
        } else {


            //Get unique key count
            var keySet = new Set([]);
            for (var i = 0; i < this.props.context.zAddresses.length; i++) {
                var pk = await privateKey(this.props.context.zAddresses[i].address)
                pk = JSON.parse(pk)
                keySet.add(pk[0].viewing_key)
            }

            try {
              //Restore from passphrase
              args = [coins[key].litewallet[0]]
              args.push(JSON.stringify(coins[key].addressParams))
              args.push(passPhrase)
              args.push(this.state.birthday.toString())
              seed = await restoreWallet(args)

              seed = JSON.parse(seed)
              if (seed.seed != null) {

                //Re-Add Addresses
                for (var n = 1; n < keySet.size; n++) {
                    await newZAddress()
                }

                sync()
                await syncStatus()
                this.props.setSynced(false)
                this.props.setSeedPhrase(seed.seed)
                this.props.setBirthday(seed.birthday)

                //Clear address list
                this.props.setAddress('')
                this.props.setBalance(0)
                this.props.setPrivateKey('')
                this.props.setRefreshAddresses(true)

                this.props.setMenuReady(false)
                this.props.setSaving(false)
                this.props.setReindexPage('none')
                this.props.setMainPage('visible')
              } else {
                this.setMsg('Failed, Reverting to Previous State...')
                args = [coins[key].networkname]
                args.push(coins[key].litewallet[0])
                args.push(JSON.stringify(coins[key].addressParams))
                seed = await initalizeWallet(args)

                //Check to make sure wallet.dat is encrypted
                var encryptStatus = await encryptionstatus()
                encryptStatus = JSON.parse(encryptStatus)
                if (!encryptStatus.encrypted) {
                    await encryptWallet(this.props.context.activePassword)
                }

                //Unlock the wallet so it can be used
                await unlock(this.props.context.activePassword)
                encryptStatus = await encryptionstatus()
                encryptStatus = JSON.parse(encryptStatus)
                if (encryptStatus.locked) {
                  alert('Catastrophic Error, Restart App!!!')
                  if (confirm("Exit App?")) {
                    navigator.app.exitApp()
                  }
                } else {
                  await save(coins[key].networkname)
                  await unlock(this.props.context.activePassword)
                }

                //get the seedPhrase
                seed = await walletSeed()
                seed = JSON.parse(seed)
                if (seed.seed != null) {
                  sync()
                  await syncStatus()
                  this.props.setSynced(false)
                  this.props.setSeedPhrase(seed.seed)
                  this.props.setBirthday(seed.birthday)

                  //Clear address list
                  this.props.setAddress('')
                  this.props.setBalance(0)
                  this.props.setPrivateKey('')
                  this.props.setRefreshAddresses(true)

                  this.props.setMenuReady(false)
                  this.props.setSaving(false)
                  this.props.setReindexPage('none')
                  this.props.setMainPage('visible')
                } else {
                  alert('Catastrophic Error, Restart App!!!')
                  if (confirm("Exit App?")) {
                    navigator.app.exitApp()
                  }
                }
              }
            } catch {
              alert('Catastrophic Error, Restart App!!!')
              if (confirm("Exit App?")) {
                navigator.app.exitApp()
              }
            }
          }
        }

    componentDidMount() {

    }

    render () {

      if (this.props.mainSubPage.reindexPage == 'none' && !this.state.reset) {
        this.resetScroll(0)
        this.setReset()
      }


      var reindexBody

      if (this.props.context.saving) {
        reindexBody =
            <div>
              <ReindexTitle>
                {this.state.spinnerMsg}
                <br/><br/><br/>
                <ReindexLoader>
                    <Loader/>
                </ReindexLoader>
              </ReindexTitle>
            </div>
      } else {
        reindexBody =
            <div>
              <ReindexTitle>
                {'Rescan Wallet'}
              </ReindexTitle>
              <ReindexPWTitle>
                {'Rescan from height:'}
              </ReindexPWTitle>
              <ReindexPWArea>
                <ReindexPWGradientCapLeft/>
                <ReindexPWInput
                  value={this.state.birthday}
                  onChange={e => this.setTempBirthday(e.target.value)}
                  onClick = {() => {
                    this.resetScroll(0)
                  }} />
                <ReindexPWGradientCapRight/>

              </ReindexPWArea>

              <ReindexNote1>
                {'Enter a custom rescan height or'}
                <br/>
                {'use one of the prefixed heights below'}
              </ReindexNote1>
              <ReindexNote2>
                <br/>
                {'This scans the blockchain from the given'}
                <br/>
                {'height for all transactions of the wallet'}
                <br/>
                {'and can be used if historic transactions'}
                <br/>
                {'are missing in the transaction history.'}
              </ReindexNote2>
              <ReindexFirstKnownButton
                onClick = {() => {
                  this.setTempBirthday(this.props.secrets.birthday)
                }}>
                <ReindexButtonImg src = {logo}/>
              </ReindexFirstKnownButton>
              <ReindexFirstNote>
                {'Wallet Birthday'}
              </ReindexFirstNote>
              <ReindexFullButton
                onClick = {() => {
                  this.setTempBirthday(coins[this.props.settings.currentCoin].branchHeight['sapling'])
                }}>
                <ReindexButtonImg src = {logo}/>
              </ReindexFullButton>
              <ReindexFullNote>
                {'Full Sapling Rescan'}
              </ReindexFullNote>
              <ReindexButton
              onClick = {() => {
                this.reInitalize()
              }}>
                {'Rescan'}
              </ReindexButton>
              <ReindexBackButton
                onClick = {() => {
                  this.props.setReindexPage('none')
                  this.props.setMainPage('visible')
                }}>
                {'Back'}
              </ReindexBackButton>
            </div>
      }



      return (
        <ReindexDiv visible={this.props.mainSubPage.reindexPage}>
          <ReindexSectionOverscroll ref = {this.scrollRef}>
            <ReindexSection visible={this.state.pin}>
              <ReindexTitle>
                {'Rescan Wallet'}
              </ReindexTitle>
              <ReindexPWTitle>
                {'Password:'}
              </ReindexPWTitle>

              <ReindexPWArea>
                <ReindexPWGradientCapLeft/>
                <ReindexPWInput
                  type='password'
                  value={this.state.password}
                  onChange={e => this.setPassword(e.target.value)}
                  onClick = {() => {
                    this.resetScroll(0)
                  }} />
                <ReindexPWGradientCapRight/>
              </ReindexPWArea>

              <ReindexPWRedText>
                {'Enter your wallet password.'}
              </ReindexPWRedText>
            </ReindexSection>

            <ReindexSection visible={this.state.key}>
              {reindexBody}
            </ReindexSection>

          </ReindexSectionOverscroll>
        </ReindexDiv>
      )
    }
  }



ReindexPage.propTypes = {
  setMenuReady: PropTypes.func.isRequired,
  setSynced: PropTypes.func.isRequired,
  setRefreshAddresses: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setPrivateKey:  PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setSaving: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    secrets: state.secrets,
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setMenuReady,
      setSynced,
      setRefreshAddresses,
      setAddress,
      setBalance,
      setPrivateKey,
      setSeedPhrase,
      setSaving,
      setBirthday,
      setReindexPage,
      setMainPage
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ReindexPage)
