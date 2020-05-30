import React from 'react';
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setDimensions, setDB } from './actions/Context'

//import { setContacts } from './actions/Contacts'
import { setSecretPhrase, setSecretItems } from './actions/Secrets'
import {
  setCurrentCoin,
  setLanguage,
  setCurrency,
  setWalletPassword,
  setInsightAPI,
  setInsightExplorer,
  setInsightZMQ,
  setMinimumBlock,
  setDisplayDimensions,
  setSaveData,
  setNoteInputs,
  setProcessTime} from './actions/Settings'

import {
  setZMainPage,
  setTMainPage,
  setSendPage,
  setReceivePage,
  setPrivateKeyPage,
  setPassPhrasePage,
  setReindexPage} from './actions/MainSubPage'

//import { phraseToSecretItems } from './utils/wallet'

import { coins } from './utils/coins.js'

import { ZERO_MOBILE_SAVE_PATH, readFromFile } from './utils/persistentStorage'
//import ZERO_LOGO from './assets/zero-logo-white.png'

import {
  LoginGrid,
  LoginForm,
  LoginFormOpaque,
  LoginHeading,
  LoginHeadingImg,
  //LoginPassword,
  //LoginInput,
  LoginSocialContainer,
  LoginSocial} from './components/login'

import zerologo from './assets/logo-white.png'
import github from './assets/github-white.png'
import twitter from './assets/twitter-white.png'
import telegram from './assets/telegram-white.png'
import discord from './assets/discord-white.png'
import heading from './assets/zero-logo-white.png'

import LoginPage from './pages/loginpage'
import MainPage from './pages/mainpage'
import SetPasswordPage from './pages/setpasswordpage'
import SetWalletPage from './pages/setwalletpage'
import SetParamsPage from './pages/setparamspage'

import { deleteDatabase,
         openDatabase,
         openRecordset,
         insertRecords,
         runSqlCommand,
         DATABASE_VERSION}  from './database/sqlite'



class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      tempPin: '',
      hasExistingWallet: false,
      hasExistingPin: false,
      hasInputPin: false,
      readSavedFile: false,
      parseError: false,
      stringData: ''
    }
    this.initalize = this.initalize.bind(this)
    this.setScreenSize = this.setScreenSize.bind(this)
    this.setRotate = this.setRotate.bind(this)
  }

  setScreenSize() {

    if (this.props.context.dimensions.height != window.outerHeight && this.props.context.dimensions.width != window.outerWidth) {
      this.props.setDimensions({"height" : window.outerHeight, "width" : window.outerWidth})
      this.props.setDisplayDimensions({"height" : window.outerHeight, "width" : window.outerWidth})
    }

    screen.orientation.lock('portrait');

  }

  setRotate() {

    // console.log(screen.orientation.type)

    if (screen.height > screen.width && this.props.context.dimensions.height < this.props.context.dimensions.width ||
        screen.height < screen.width && this.props.context.dimensions.height > this.props.context.dimensions.width ) {
        this.props.setDimensions({"height" : this.props.context.dimensions.width, "width" : this.props.context.dimensions.height})
        this.props.setDisplayDimensions({"height" : this.props.context.dimensions.width, "width" : this.props.context.dimensions.height})
    }


    // else if (this.props.context.dimensions.height < window.outerHeight) {
    //   this.props.setDimensions({"height" : window.outerHeight, "width" : this.props.context.dimensions.width})
    // } else if (this.props.context.dimensions.width < window.outerWidth) {
    //   this.props.setDimensions({"height" : this.props.context.dimensions.height, "width" : window.outerWidth})
    // }
    //
  }

  async initalize() {
    this.setScreenSize()
    //window.addEventListener("orientationchange", this.setRotate)
    window.plugins.insomnia.keepAwake()
    //Database name
    var dbName = 'sapling_' + coins[this.props.settings.currentCoin].networkname + '.db'

    //initalize database
    try {
      await deleteDatabase('sapling.db')
      console.log('sapling.db deleted')
    } catch {
      console.log('sapling.db not present')
    }
    var db = await openDatabase(dbName)
    this.props.setDB(db)
    await runSqlCommand(db,'CREATE TABLE IF NOT EXISTS Blocks (height INTEGER, hash TEXT, saplingroot TEXT, Processed INTEGER, Witnessed INTEGER, Nullified INTEGER, PRIMARY KEY(height))')
    await runSqlCommand(db,'CREATE TABLE IF NOT EXISTS Transactions (height INTEGER, txid TEXT, txindex INTEGER, PRIMARY KEY(height, txid))')
    await runSqlCommand(db,'CREATE TABLE IF NOT EXISTS Shieldedoutputs (height INTEGER, txid TEXT, outputindex INTEGER, cmu TEXT, cv TEXT, encCiphertext TEXT, ephemeralKey TEXT, outCiphertext TEXT, PRIMARY KEY(height, txid, outputindex))')
    await runSqlCommand(db,'CREATE TABLE IF NOT EXISTS Shieldedspends (height INTEGER, txid TEXT, spendindex INTEGER, nullifier TEXT, PRIMARY KEY(height, txid, spendindex))')
    await runSqlCommand(db,'CREATE TABLE IF NOT EXISTS Wallet (height INTEGER, txid TEXT, txindex INTEGER, outputindex INTEGER, cmu TEXT, cv TEXT, encCiphertext TEXT, ephemeralKey TEXT, outCiphertext TEXT, witness TEXT, nullifier TEXT, spent INTEGER, spenttxid TEXT, value INTEGER, PRIMARY KEY(height, txid, outputindex))')
    await runSqlCommand(db,'CREATE TABLE IF NOT EXISTS Witnesses (cmu TEXT, height INTEGER, witness TEXT, root TEXT, PRIMARY KEY(height, cmu))')
    await runSqlCommand(db,'CREATE TABLE IF NOT EXISTS Version (version INTEGER)')

    await runSqlCommand(db,'CREATE INDEX IF NOT EXISTS IDX_BLOCKS_PROCESSED ON Blocks(Processed)')

    var version = await openRecordset(db, 'SELECT version FROM Version ORDER BY 1 DESC')
    if (version.rows.length > 0) {
      if (DATABASE_VERSION != Number(version.rows.item(0).version)) {
        try {
          await deleteDatabase(dbName)
          console.log(dbName +' deleted')
        } catch {
          console.log(dbName +' not present')
        }
        this.initalize()
      } else {
        await insertRecords(db, 'INSERT INTO Version VALUES (?1)',[DATABASE_VERSION])
      }
    }
  }

  componentDidMount() {

    this.initalize()

    readFromFile(ZERO_MOBILE_SAVE_PATH, (data) => {
      // If errors while we're reading the JSOn
      // then just assume its empty

      //hacky fix to duplicate json data saved to setting file on iOS.
      //investigate permanent fix
      if (data.length>0) {
        while (data.indexOf('secretPhrase') !== data.lastIndexOf('secretPhrase')) {
            data = data.substring(0, data.lastIndexOf('secretPhrase')-4)
        }
      }

      this.setState({stringData: 'JSON file ' + data})

      try {
        data = JSON.parse(data)
      } catch (err) {
          data = {}
      }

      // Get secret phrase
      if (data.secretPhrase !== undefined) {
        const secretPhrase = data.secretPhrase
        //const secretPhrase = 'rhyme empty riding first smooth badly dust load strange torn news tears dig throw kitchen previous'
        //const secretItems = phraseToSecretItems(secretPhrase)

        //this.props.setSecretItems(secretItems)
        this.props.setSecretPhrase(secretPhrase)

        this.setState({
          hasExistingWallet: true
        })
      }

      // Get settings
      if (data.settings !== undefined) {

        if (data.settings.displayDimensions !== undefined) {
          this.props.setDisplayDimensions(data.settings.displayDimensions)
          this.props.setDimensions(data.settings.displayDimensions)
        }

        if (data.settings.currentCoin !== undefined) {
          this.props.setCurrentCoin(data.settings.currentCoin)
        }

        //set API & Explorer based on coin
        const coin = this.props.settings.currentCoin
        const apiSelection = Math.floor(Math.random()*coins[coin].api.length)
        this.props.setInsightAPI(coins[coin].api[apiSelection])
        this.props.setInsightExplorer(coins[coin].explorer[apiSelection])
        this.props.setInsightZMQ(coins[coin].zmq[apiSelection])

        if (data.settings.minimumBlock !== undefined) {
          this.props.setMinimumBlock(data.settings.minimumBlock)
        }

        if (this.props.settings.minimumBlock[coin] == undefined) {
          var minBlock = this.props.settings.minimumBlock
          minBlock[coin] = coins[coin].branchHeight['sapling'] -1
          this.props.setMinimumBlock(minBlock)
        }

        if (data.settings.noteInputs !== undefined) {
          this.props.setNoteInputs( data.settings.noteInputs)
        }

        if (data.settings.processTime !== undefined) {
          this.props.setProcessTime( data.settings.processTime)
        }

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

    var screenDim = this.props.context.dimensions

    var startDisplay = {display: 'none'}
    var mainDisplay = {display: 'none'}
    var loginDisplay = {display: 'none'}
    var walletDisplay = {display: 'none'}
    var passwordDisplay = {display: 'none'}
    var paramsDisplay = {display: 'none'}

    var paramsAvailable = <div />
    var mainAvailable = <div />

    if (this.props.secrets.items.length > 0) {
      mainAvailable = <MainPage />
    }
    if (this.state.hasExistingWallet && this.state.hasInputPin) {
      paramsAvailable = <SetParamsPage />
    }

    if (!this.state.readSavedFile) {
      startDisplay = {}
    } else {
      if (!this.state.hasExistingPin) {
        passwordDisplay = {}
      } else {
        if(!this.state.hasInputPin)
        loginDisplay = {}
        else {
          if(!this.state.hasExistingWallet) {
            walletDisplay = {}
          } else {
            if(!this.props.context.saplingoutputverified || !this.props.context.saplingspendverified || this.props.secrets.items.length == 0) {
              paramsDisplay ={}
            } else {
              mainDisplay = {}
            }
          }
        }
      }
    }

        return (
          <div>
            <div style = {startDisplay}>
              <LoginGrid sc={screenDim}>
                <LoginForm sc={screenDim}>
                </LoginForm>
                <LoginFormOpaque sc={screenDim} visible={'visible'}>
                  <br/>
                  <LoginHeading>
                    <LoginHeadingImg src={heading} sc={screenDim}/>
                  </LoginHeading>
                  <br/>
                  <br/><br/>
                  <LoginSocialContainer sc={screenDim}>
                    <a href="https://www.zerocurrency.io">
                      <LoginSocial src={zerologo} sc={screenDim}/>
                    </a>
                    <a href="https://github.com/zerocurrency">
                      <LoginSocial src={github} sc={screenDim}/>
                    </a>
                    <a href="https://twitter.com/ZeroCurrencies">
                      <LoginSocial src={twitter} sc={screenDim}/>
                    </a>
                    <a href="https://t.me/zerocurrency">
                      <LoginSocial src={telegram} sc={screenDim}/>
                    </a>
                    <a href="https://discordapp.com/invite/Jq5knn5">
                      <LoginSocial src={discord} sc={screenDim}/>
                    </a>
                  </LoginSocialContainer>
                </LoginFormOpaque>
              </LoginGrid>
            </div>
            <div style = {mainDisplay}>
              {mainAvailable}
            </div>
            <div style = {loginDisplay}>
              <LoginPage onComplete={() => this.setState({ hasInputPin: true })} />
            </div>
            <div style = {walletDisplay}>
              <SetWalletPage setHasExistingWallet={(v) => this.setState({ hasExistingWallet: v })}/>
            </div>
            <div style = {passwordDisplay}>
              <SetPasswordPage onComplete={() => this.setState({ hasExistingPin: true, hasInputPin: true })} />
            </div>
            <div style = {paramsDisplay}>
              {paramsAvailable}
            </div>
          </div>

        )
    }
}


App.propTypes = {
  setZMainPage: PropTypes.func.isRequired,
  setTMainPage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setPassPhrasePage: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
  setCurrentCoin: PropTypes.func.isRequired,
  setLanguage: PropTypes.func.isRequired,
  setCurrency: PropTypes.func.isRequired,
  setNoteInputs: PropTypes.func.isRequired,
  setProcessTime: PropTypes.func.isRequired,
  setWalletPassword: PropTypes.func.isRequired,
  setInsightAPI: PropTypes.func.isRequired,
  setInsightExplorer: PropTypes.func.isRequired,
  setInsightZMQ: PropTypes.func.isRequired,
  setMinimumBlock: PropTypes.func.isRequired,
  setDisplayDimensions: PropTypes.func.isRequired,
  setSaveData: PropTypes.func.isRequired,
  setSecretItems: PropTypes.func.isRequired,
  setSecretPhrase: PropTypes.func.isRequired,
  setDimensions: PropTypes.func.isRequired,
  setDB: PropTypes.func.isRequired,
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
      setZMainPage,
      setTMainPage,
      setSendPage,
      setReceivePage,
      setPrivateKeyPage,
      setPassPhrasePage,
      setReindexPage,
      setCurrentCoin,
      setLanguage,
      setCurrency,
      setNoteInputs,
      setProcessTime,
      setWalletPassword,
      setInsightAPI,
      setInsightExplorer,
      setInsightZMQ,
      setMinimumBlock,
      setDisplayDimensions,
      setSaveData,
      setSecretItems,
      setSecretPhrase,
      setDimensions,
      setDB,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(App)
