import React from 'react'
import PropTypes from 'prop-types'

import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'

import Loader from '../containers/loader'

import {
  ReindexDiv,
  ReindexSection,
  ReindexTitle,
  ReindexLoader
} from '../components/reindex'

import {
  coins
} from '../utils/coins.js'

import {
  setReconnectPage,
  setTransactionPage,
  setReindexPage,
  setPassPhrasePage,
  setPrivateKeyPage,
  setReceivePage,
  setSendPage,
  setMainPage
} from '../actions/MainSubPage'

import {
  setWalletLoaded,
  setActiveServer,
  setDisconnected
} from '../actions/Context'

import {
  setSeedPhrase,
  setBirthday
} from '../actions/Secrets'

import {
  setWalletPassPhrase,
} from '../actions/Settings'

import {
  initalizeWallet,
  encryptionstatus,
  encryptWallet,
  unlock,
  walletSeed,
  checkServer,
  save
} from '../utils/litewallet'

import {
  encrypt,
  decrypt,
  saltHashPassword,
  KeySalt
} from '../utils/hash.js'

class Reconnect extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      spinnerMsg: 'Reconnecting to Server',
      reconnectionStatus: 'Selecting Server',
      reconnecting: false,
      syncWalletTimer: 0
    }

    this.checkDisconnected = this.checkDisconnected.bind(this)
    this.selectServer = this.selectServer.bind(this)
    this.checkServers = this.checkServers.bind(this)
  }

  checkDisconnected() {
    if (this.props.context.disconnected && !this.state.reconnecting) {
      this.setState({
        reconnecting: true
      })
      this.selectServer()
    }

    clearTimeout(this.state.syncWalletTimer)
    if (this.props.mainSubPage.reconnectPage == 'visible') {
      const syncWalletTimerIDShort = setTimeout(
        () => {
          this.checkDisconnected()
        }, 10)
      this.setState({
        syncWalletTimer: syncWalletTimerIDShort
      })
    }
  }

  async checkServers(serverList) {
    //Pick random starting spot so not every client picks the same servers
    var startServer = Math.floor(Math.random() * serverList.length)
    var workingServer = startServer
    //Check first section
    while (workingServer < serverList.length && this.props.context.activeServer == '') {
      try {
        let serverReady1 = await checkServer(serverList[workingServer])
        serverReady1 = JSON.parse(serverReady1)
        serverReady1 = serverReady1.server_ready
        if (serverReady1 == true) {
          this.props.setActiveServer(serverList[workingServer])
        } else {
          workingServer++
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }

    //check second section
    workingServer = 0
    while (workingServer < startServer && this.props.context.activeServer == '') {
      try {
        var serverReady2 = await checkServer(serverList[workingServer])
        serverReady2 = JSON.parse(serverReady2)
        serverReady2 = serverReady2.server_ready
        if (serverReady2 == true) {
          this.props.setActiveServer(serverList[workingServer])
        } else {
          workingServer++
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }
  }

  async selectServer() {
    //Primary priority user defined servers -- not yet implemented
    // if (this.props.context.activeServer == null) {
    //     await this.checkServers(this.props.context.userservers)
    // }

    //Secondary prioity primary team servers
    if (this.props.context.activeServer == '') {
      await this.checkServers(this.props.context.primaryServers)
    }

    //Tertiary prioity backup team servers
    if (this.props.context.activeServer == '') {
      await this.checkServers(this.props.context.backupServers)
    }

    if (this.props.context.activeServer == '') {
      this.setState({
        reconnecting: false
      })
    } else {

      this.setState({
        reconnectionStatus: 'Server Found'
      })
      try {

        //Initalize thae wallet
        const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)
        var args = [coins[this.props.settings.currentCoin].networkname]
        args.push(this.props.context.activeServer)
        this.setState({
          reconnectionStatus: 'Reinitializing Wallet'
        })
        await initalizeWallet(args)

        //Check to make sure wallet.dat is encrypted
        this.setState({
          reconnectionStatus: 'Checing Encryption Status'
        })
        var encryptStatus = await encryptionstatus()
        encryptStatus = JSON.parse(encryptStatus)
        if (!encryptStatus.encrypted) {
          await encryptWallet(this.props.context.activePassword)
        }

        //Unlock the wallet so it can be used
        this.setState({
          reconnectionStatus: 'Unlocking Wallet'
        })
        await unlock(this.props.context.activePassword)
        encryptStatus = await encryptionstatus()
        encryptStatus = JSON.parse(encryptStatus)
        if (encryptStatus.locked) {
          alert("WARNING!!! wallet.dat failed to unlock, restart app.")
          if (confirm("Exit App?")) {
            navigator.app.exitApp()
          }
        } else {
          await save(coins[this.props.settings.currentCoin].networkname)
          await unlock(this.props.context.activePassword)
        }

        //get the seedPhrase
        this.setState({
          reconnectionStatus: 'Validating Seed'
        })
        var seed = await walletSeed()
        seed = JSON.parse(seed)
        if (seed.seed != null) {
          this.props.setSeedPhrase(seed.seed)
          this.props.setBirthday(seed.birthday)
          this.props.setWalletLoaded(true)

          //set passphase on existing wallets
          if (this.props.settings.passPhrase == null) {
            var pass = encrypt(seed.seed, keyHash)
            this.props.setWalletPassPhrase(pass)
          } else {
            var pp = decrypt(this.props.settings.passPhrase, keyHash)
            if (pp != seed.seed) {
              alert("WARNING!!!" + args[0] + " seed phrase does not match the Skull Island's master seed phrase.")
            }
          }
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }

      this.props.setDisconnected(false)
      this.setState({
        reconnecting: false
      })
      this.props.setTransactionPage('none')
      this.props.setReindexPage('none')
      this.props.setPassPhrasePage('none')
      this.props.setPrivateKeyPage('none')
      this.props.setReceivePage('none')
      this.props.setSendPage('none')
      this.props.setMainPage('visible')
      this.props.setReconnectPage('none')

    }
  }

  componentDidMount() {
    this.checkDisconnected()
  }

  componentWillUnmount() {
    clearTimeout(this.state.syncWalletTimer)
  }

  render () {

    return (
      <ReindexDiv visible={this.props.mainSubPage.reconnectPage}>
        <ReindexSection visible={this.state.key}>
          <ReindexTitle>
            {this.state.spinnerMsg}
            <br/>
            {this.state.reconnectionStatus}
            <br/><br/><br/>
            <ReindexLoader>
                <Loader/>
            </ReindexLoader>
          </ReindexTitle>
        </ReindexSection>
      </ReindexDiv>
    )
  }
}



Reconnect.propTypes = {
  setReconnectPage: PropTypes.func.isRequired,
  setTransactionPage: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
  setPassPhrasePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setWalletLoaded: PropTypes.func.isRequired,
  setActiveServer: PropTypes.func.isRequired,
  setDisconnected: PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setWalletPassPhrase: PropTypes.func.isRequired,
  initalizeWallet: PropTypes.func.isRequired,
  encryptionstatus: PropTypes.func.isRequired,
  encryptWallet: PropTypes.func.isRequired,
  unlock: PropTypes.func.isRequired,
  walletSeed: PropTypes.func.isRequired,
  checkServer: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired,
  secrets: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  context: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    secrets: state.secrets,
    settings: state.settings,
    context: state.context,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
      setReconnectPage,
      setTransactionPage,
      setReindexPage,
      setPassPhrasePage,
      setPrivateKeyPage,
      setReceivePage,
      setSendPage,
      setMainPage,
      setWalletLoaded,
      setActiveServer,
      setDisconnected,
      setSeedPhrase,
      setBirthday,
      setWalletPassPhrase,
      initalizeWallet,
      encryptionstatus,
      encryptWallet,
      unlock,
      walletSeed,
      checkServer,
      save
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(Reconnect)
