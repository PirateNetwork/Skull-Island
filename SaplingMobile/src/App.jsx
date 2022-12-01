import React from 'react';
import PropTypes from 'prop-types'

import { ThemeProvider } from 'styled-components';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setDimensions,
  setWalletLoaded,
  setActiveServer,
  setUserServers,
  setPrimaryServers,
  setBackupServers,
  setDisconnected} from './actions/Context'

import { setSeedPhrase, setBirthday } from './actions/Secrets'
import {
  setCurrentCoin,
  setLanguage,
  setCurrency,
  setWalletPassword,
  setWalletPassPhrase,
  setInsightExplorer,
  setDisplayDimensions,
  setSaveData} from './actions/Settings'

import {
  setMainPage,
  setSendPage,
  setReceivePage,
  setPrivateKeyPage,
  setPassPhrasePage,
  setReindexPage,
  setTransactionPage} from './actions/MainSubPage'

import { coins } from './utils/coins.js'

import { walletExists,
         initalizeWallet,
         newWallet,
         encryptionstatus,
         encryptWallet,
         unlock,
         checkSeedPhrase,
         walletSeed,
         checkServer,
         save} from './utils/litewallet'

import {encrypt, decrypt, saltHashPassword, KeySalt} from './utils/hash.js'

import {
  PIRATE_MOBILE_SAVE_PATH,
  SERVERS_SAVE_PATH,
  downloadServerList,
  readFromFile,
  getLocalFileSystemURL,
  getFileEntry,
  writeDataToFile } from './utils/persistentStorage'

import { GlobalDiv } from './pagecomponents/PirateShared'

import SplashPage from './containers/splash'
import LoginPage from './pages/loginpage'
import MainPage from './pages/mainpage'
import SetPasswordPage from './pages/setpasswordpage'
import SetWalletPage from './pages/setwalletpage'


class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tempPin: '',
      Initalized: true,
      hasExistingWallet: false,
      hasExistingPin: false,
      hasInputPin: false,
      readSavedFile: false,
      parseError: false,
      stringData: '',
      data: null,
      downloadComplete: false,
    }
    this.initalize = this.initalize.bind(this)
    this.runInitalize = this.runInitalize.bind(this)
    this.runInitalizeServers = this.runInitalizeServers.bind(this)
    this.setScreenSize = this.setScreenSize.bind(this)
    this.setRotate = this.setRotate.bind(this)
    this.backButtonHandler = this.backButtonHandler.bind(this)
    this.saveData = this.saveData.bind(this)
    this.getServerList = this.getServerList.bind(this)
    this.selectServer = this.selectServer.bind(this)
    this.checkServers = this.checkServers.bind(this)
    this.initalizeServers = this.initalizeServers.bind(this)
  }

  setScreenSize() {
    screen.orientation.lock('portrait');
    this.props.setDimensions({"height" : window.outerHeight, "width" : window.outerWidth})
    this.props.setDisplayDimensions({"height" : window.outerHeight, "width" : window.outerWidth})
  }

  setRotate() {

    if (screen.height > screen.width && this.props.context.dimensions.height < this.props.context.dimensions.width ||
        screen.height < screen.width && this.props.context.dimensions.height > this.props.context.dimensions.width ) {
        this.props.setDimensions({"height" : this.props.context.dimensions.width, "width" : this.props.context.dimensions.height})
        this.props.setDisplayDimensions({"height" : this.props.context.dimensions.width, "width" : this.props.context.dimensions.height})
    }
  }

  runInitalize() {
    clearInterval(this.InitId)

    if (this.props.context.activePassword == '' || this.props.context.activeServer == null) {
      this.InitId = setInterval(
        () => this.runInitalize(),
        10
      )
    } else {
      this.initalize()
    }
  }

  runInitalizeServers() {
    clearInterval(this.InitServerId)

    if (!this.state.downloadComplete) {
      this.InitServerId = setInterval(
        () => this.runInitalizeServers(),
        10
      )
    } else {
      this.selectServer()
    }
  }

  async getServerList() {
      //Get server file or create it.
      const serverFolder = await getLocalFileSystemURL()
      const serverFile = await getFileEntry(serverFolder, SERVERS_SAVE_PATH)

      // Download new file from github
      var fileTransfer = new FileTransfer();
      await downloadServerList(fileTransfer, serverFile.nativeURL)

      readFromFile(SERVERS_SAVE_PATH, (data) => {
        // If errors while we're reading the Json
        // then just assume its empty
        try {
            data = JSON.parse(data)
            this.props.setPrimaryServers(data.primaryservers)
            this.props.setBackupServers(data.backupservers)
        } catch (err) {
            const coin = 'pirate'
            this.props.setPrimaryServers(coins[coin].primaryservers)
            this.props.setBackupServers(coins[coin].backupservers)
        }

        this.setState({downloadComplete: true})
      })
  }

  async checkServers(serverList) {
      //Pick random starting spot so not every client picks the same servers
      var startServer = Math.floor(Math.random() * serverList.length)
      var workingServer = startServer
      //Check first section
      while (workingServer < serverList.length && this.props.context.activeServer == null) {
          let serverReady1 = await checkServer(serverList[workingServer])
          if (serverReady1) {
              this.props.setActiveServer(serverList[workingServer])
          } else {
             workingServer++
          }
      }

      //check second section
      workingServer = 0
      while (workingServer < startServer && this.props.context.activeServer == null) {
          var serverReady2 = await checkServer(serverList[workingServer])
          if (serverReady2) {
              this.props.setActiveServer(serverList[workingServer])
          } else {
             workingServer++
          }
      }
  }

  async selectServer() {
    //Primary priority user defined servers -- not yet implemented
    // if (this.props.context.activeServer == null) {
    //     await this.checkServers(this.props.context.userservers)
    // }

    //Secondary prioity primary team servers
    if (this.props.context.activeServer == null) {
        await this.checkServers(this.props.context.primaryServers)
    }

    //Tertiary prioity backup team servers
    if (this.props.context.activeServer == null) {
        await this.checkServers(this.props.context.backupServers)
    }
  }

  async initalizeServers() {
      await this.getServerList()
      this.runInitalizeServers()
  }

  async initalize() {
    const coin = 'pirate'

    const keyHash = saltHashPassword(this.props.context.activePassword, KeySalt)

    const data = this.state.data
    //check for valid saved phrase
    if (data != null) {
      if (data.settings.passPhrase !== undefined && data.settings.passPhrase != null) {
        var phrase = decrypt(data.settings.passPhrase, keyHash)
        var seedCheck = await checkSeedPhrase(phrase)
        seedCheck = JSON.parse(seedCheck)
        if (seedCheck.checkSeedPhrase == 'Ok') {
            this.props.setWalletPassPhrase(data.settings.passPhrase)
            this.setState({
              hasExistingWallet: true
            })
          }
        }
      }

      //reset to Zero
      if (!this.state.hasExistingWallet) {
        const apiSelection = Math.floor(Math.random()*coins[coin].explorer.length)
        this.props.setCurrentCoin(coin)
        this.props.setInsightExplorer(coins[coin].explorer[apiSelection])
      }



    var seed
    var args
    const currentCoin = this.props.settings.currentCoin
    var walletFile = await walletExists(coins[currentCoin].networkname)
    walletFile = JSON.parse(walletFile)

    if (walletFile.exists) {
      try {

        //Initalize thae wallet
        args = [coins[currentCoin].networkname]
        args.push(this.props.context.activeServer)
        await initalizeWallet(args)

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
          alert("WARNING!!! wallet.dat failed to unlock, restart app.")
          if (confirm("Exit App?")) {
            navigator.app.exitApp()
          }
        } else {
          await save(coins[currentCoin].networkname)
          await unlock(this.props.context.activePassword)
        }

        //get the seedPhrase
        seed = await walletSeed()
        seed = JSON.parse(seed)
        if (seed.seed != null) {
          this.props.setSeedPhrase(seed.seed)
          this.props.setBirthday(seed.birthday)
          this.props.setWalletLoaded(true)

          //set passphase on existing wallets
          if (this.props.settings.passPhrase == null) {
            var pass = encrypt(seed.seed, keyHash)
            this.props.setWalletPassPhrase(pass)
            this.setState({
              hasExistingWallet: true
            })
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

    } else {
      try {

        args = [(this.props.context.activeServer)]
        seed = await newWallet(args)

        seed = JSON.parse(seed)
        if (seed.seed != null) {
          this.props.setSeedPhrase(seed.seed)
          this.props.setBirthday(seed.birthday)
        }
      } catch (err) {
        if (process.env.NODE_ENV != 'production') {
          console.log(err)
        }
      }
    }

    //window.addEventListener("orientationchange", this.setRotate)
    window.plugins.insomnia.keepAwake()
    //Database name

    this.setState({
      Initalized: true,
    })

  }

  async saveData () {
    if (!this.savingFile) {
      if (this.props.settings.passPhrase !== null && this.props.settings.password !== null && this.props.settings.saveData === true) {
        // Write to file
        this.savingFile = true
        try {
          const data = {settings: this.props.settings}
          const folder = await getLocalFileSystemURL()
          const file = await getFileEntry(folder, PIRATE_MOBILE_SAVE_PATH)
          await writeDataToFile(file, data)
          this.savingFile = false
        } catch {
          this.savingFile = false
        }
      }
    }
  }

  backButtonHandler () {
    if (this.props.mainSubPage.mainPage != 'visible') {
      this.props.setMainPage('visible')
      this.props.setSendPage('none')
      this.props.setReceivePage('none')
      this.props.setPrivateKeyPage('none')
      this.props.setPassPhrasePage('none')
      this.props.setReindexPage('none')
      this.props.setTransactionPage('none')
    } else {
      if (confirm("Exit App?")) {
        navigator.app.exitApp()
      }
    }
  }


  componentDidMount() {
    this.setScreenSize()

    document.addEventListener('backbutton', this.backButtonHandler, false)

    this.initalizeServers()

    readFromFile(PIRATE_MOBILE_SAVE_PATH, (data) => {
      // If errors while we're reading the JSOn
      // then just assume its empty

      this.setState({stringData: 'JSON file ' + data})

      try {
        data = JSON.parse(data)
        this.setState({data: data})
      } catch (err) {
          data = {}
      }

      // Get settings
      if (data.settings !== undefined) {

        if (data.settings.currentCoin !== undefined) {
          this.props.setCurrentCoin(data.settings.currentCoin)
        }

        //set API & Explorer based on coin
        const coin = 'pirate'
        const apiSelection = Math.floor(Math.random()*coins[coin].explorer.length)
        this.props.setInsightExplorer(coins[coin].explorer[apiSelection])

        if (data.settings.language !== undefined) {
          this.props.setLanguage( data.settings.language)
        }

        if (data.settings.currency !== undefined && data.settings.currency !== null) {
          this.props.setCurrency(data.settings.currency)
        }

        if (data.settings.password !== undefined && data.settings.password !== null) {
          this.props.setWalletPassword(data.settings.password)

          this.setState({
            hasExistingPin: true
          })
        }
      }

      if (this.state.parseError === false) {
        this.setState({
          readSavedFile: true
        })
      }
    }, (err) => {

      if (this.state.parseError === false) {
        this.setState({
          readSavedFile: true
        })
      }
      if (process.env.NODE_ENV != 'production') {
        console.log(err)
      }
    })

    this.props.setSaveData(true)

  }

  render() {

    this.saveData()

    var screenDim = this.props.context.dimensions

    var app

    if (!this.state.readSavedFile || !this.state.Initalized) {
        app =  <SplashPage />
    } else {
      if (!this.state.hasExistingPin) {
        app = <SetPasswordPage onComplete={() => {
          this.setState({
            hasExistingPin: true,
            hasInputPin: true,
            Initalized: false
          })
          this.runInitalize()
        }} />
      } else {
        if(!this.state.hasInputPin) {
          app = <LoginPage onComplete={() => {
            this.setState({
              hasInputPin: true,
              Initalized: false
            })
            this.runInitalize()
          }} />
        } else {
          if(!this.state.hasExistingWallet) {
            app = <SetWalletPage setHasExistingWallet={(v) => this.setState({ hasExistingWallet: v })}/>
          } else {
            app = <MainPage />
          }
        }
      }
    }

        return (
          <ThemeProvider theme={screenDim}>
            <GlobalDiv>
              {app}
            </GlobalDiv>
          </ThemeProvider>
        )
    }
}


App.propTypes = {
  setWalletLoaded: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setPassPhrasePage: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
  setTransactionPage: PropTypes.func.isRequired,
  setCurrentCoin: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  setWalletPassword: PropTypes.func.isRequired,
  setWalletPassPhrase: PropTypes.func.isRequired,
  setInsightExplorer: PropTypes.func.isRequired,
  setDisplayDimensions: PropTypes.func.isRequired,
  setSaveData: PropTypes.func.isRequired,
  setDimensions: PropTypes.func.isRequired,
  setBirthday: PropTypes.func.isRequired,
  setSeedPhrase: PropTypes.func.isRequired,
  setActiveServer: PropTypes.func.isRequired,
  setUserServers: PropTypes.func.isRequired,
  setPrimaryServers: PropTypes.func.isRequired,
  setBackupServers: PropTypes.func.isRequired,
  setDisconnected: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
    mainSubPage: state.mainSubPage
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setWalletLoaded,
      setMainPage,
      setSendPage,
      setReceivePage,
      setPrivateKeyPage,
      setPassPhrasePage,
      setReindexPage,
      setTransactionPage,
      setCurrentCoin,
      setLanguage,
      setCurrency,
      setWalletPassword,
      setWalletPassPhrase,
      setInsightExplorer,
      setDisplayDimensions,
      setSaveData,
      setBirthday,
      setSeedPhrase,
      setDimensions,
      setActiveServer,
      setUserServers,
      setPrimaryServers,
      setBackupServers,
      setDisconnected,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
