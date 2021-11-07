import React from 'react'
import PropTypes from 'prop-types'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  setHeight,
  setSyncedBlocks,
  setRefreshSecondsRemaining,
  setAddress,
  setBalance,
  setPrivateKey,
  setSynced,
  setSaving,
  setZAddresses,
  setTAddresses,
  setMenuReady,
  setRefreshAddresses,
  setWalletInUse } from '../actions/Context'

import {
  ChainSyncDiv,
  ChainSyncCurrentBalance,
  ChainSyncBalanceLogo,
  ChainSyncBalanceLogoImg,
  ChainSyncUSD,
  ChainSyncBTC,
  ChainSyncBalance,
  ChainSyncBalanceUnits,} from '../components/chainsync'

import pirateLogo from '../assets/svg/pirate_logo.svg'

import { coins } from '../utils/coins.js'

import {
  balance,
  sync,
  syncStatus,
  info,
  save,
  privateKey } from '../utils/litewallet'


class ChainOps extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      walletBalance: 0.00000000,
      walletHeight: 0,
      DownloadPercentage: 0,
      chainHeight: 1,
      syncing: true,
      walletError: false,
      errorMsg: '',
      syncWalletTimer: null,
      syncStatus: null,
      saveWalletCounter: 0,
    }

    this.getWalletStatus = this.getWalletStatus.bind(this)
    this.updateWallet = this.updateWallet.bind(this)
  }

  async getWalletStatus() {

        this.props.setWalletInUse(true)
        if (!this.props.context.saving) {
          var walletStatus = await syncStatus()
          walletStatus = JSON.parse(walletStatus)
          console.log('LITEWALLET chainsync getWalletStatus(): '+JSON.stringify(walletStatus))

          if (walletStatus.syncing != "true") {
            console.log('LITEWALLET chainsync getWalletStatus() -- wallet==synced')

            this.props.setSynced(true)
            this.setState({
              syncing: false
            })
          } else {
            var blocksRemaining = walletStatus.total_blocks.toString() - walletStatus.synced_blocks.toString()
            console.log('LITEWALLET chainsync getWalletStatus() -- wallet busy syncing. '+walletStatus.synced_blocks.toString()+' of '+walletStatus.total_blocks.toString()+', '+blocksRemaining+' remaining')

            if (walletStatus.total_blocks > walletStatus.synced_blocks + 6) {
              //Syncing does occur, but do not show it on the GUI unless
              //we're more than 6 minutes behind.
              console.log('LITEWALLET chainsync getWalletStatus() -- GUI behind. setSynced(false)')
              this.props.setSynced(false)
              this.setState({
                syncing: true
              })
            }
          }
        }
        else
        {
          console.log('LITEWALLET chainsync getWalletStatus() -- saving. Not evaluation sync status')
        }

        var mainPageOpen = true
        if (this.props.mainSubPage.receivePage == 'visible') {
          mainPageOpen = false
        }

        clearTimeout(this.state.syncWalletTimer)
        if (this.props.context.synced) {
          if (mainPageOpen) {
            console.log('LITEWALLET chainsync getWalletStatus() : synced -- refresh in 60 seconds.')

            const syncWalletTimerIDLong = setTimeout(
              () => {
                this.getWalletStatus()
              },60000)
            this.setState({syncWalletTimer: syncWalletTimerIDLong})
          } else {
            console.log('LITEWALLET chainsync getWalletStatus() : synced -- Main page not open. Do not schedule a refresh')
          }
        } else {
          if (mainPageOpen) {
            console.log('LITEWALLET chainsync getWalletStatus() : not synced -- refreshing in 10 seconds.')

            const syncWalletTimerIDShort = setTimeout(
              () => {
                this.getWalletStatus()
              },10000)
            this.setState({syncWalletTimer: syncWalletTimerIDShort})
          } else {
            console.log('LITEWALLET chainsync getWalletStatus() : not synced -- Main page not open. Do not schedule a refresh')
          }
        }
        this.props.setWalletInUse(false)
      }

async updateWallet() {
      if (!this.props.context.saving) {
        this.props.setWalletInUse(true)

        sync()

        if (this.state.saveWalletCounter >= 30) {
          console.log('LITEWALLET chainsync updateWallet() : save wallet. saveWalletCounter='+this.state.saveWalletCounter.toString() )
          this.props.setSaving(true)
          await save(coins[this.props.settings.currentCoin].networkname)
          this.setState({saveWalletCounter: 0})
          this.props.setSaving(false)
        } else {
          console.log('LITEWALLET chainsync updateWallet() : not saving wallet. saveWalletCounter='+this.state.saveWalletCounter.toString() )
        }
        
        var walletInfo = await info()
        try {
          walletInfo = JSON.parse(walletInfo)
          console.log('LITEWALLET chainsync updateWallet() parsed info:'+JSON.stringify(walletInfo));
          this.setState({
            walletError: false,
            errorMsg: ''
          })
        } catch {
          console.log('LITEWALLET chainsync updateWallet() info() failed');
          this.setState({
            walletError: true,
            errorMsg: walletInfo
          })
        }

        var walletBalance = await balance()
        try {
          walletBalance = JSON.parse(walletBalance)
        } catch {
          console.log('LITEWALLET chainsync updateWallet() balance() failed');
          this.setState({
            walletError: true,
            errorMsg: walletBalance
          })
        }

        var walletStatus = await syncStatus()
        try {
          walletStatus = JSON.parse(walletStatus)
          //Note: If syncing==false, then walletStatus will not contain synced_blocks and total_blocks
          console.log('LITEWALLET chainsync updateWallet() parsed status:'+JSON.stringify(walletStatus));
        } catch {
          console.log('LITEWALLET chainsync updateWallet() syncStatus() failed');
          this.setState({
            walletError: true,
            errorMsg: walletStatus
          })
        }

        var downloaded = 0
        if (walletStatus.syncing == "true") {
          if (walletStatus.total_blocks > 0) {
            downloaded = walletStatus.synced_blocks/walletStatus.total_blocks
          } else {
            downloaded = 0
          }

          this.setState({
            walletBalance: (walletBalance.verified_zbalance + walletBalance.tbalance).toFixed(8).toString(),
            walletHeight: walletStatus.synced_blocks,
            chainHeight: walletStatus.total_blocks,
            DownloadPercentage: downloaded
          })

          this.props.setHeight(walletStatus.total_blocks)
          this.props.setSyncedBlocks(walletStatus.synced_blocks)
          
          if (walletInfo.latest_block_height > walletStatus.synced_blocks + 10) {
            //walletStatus will revert back to 'syncing=true' automatically
            //when the wallet falls far enough behind the block height
            //For a few blocks, don't show on the GUI that we're syncing in
            //the background:
          
            this.props.setSynced(false)
            this.setState({
              syncing: true
            })
            console.log('LITEWALLET chainsync updateWallet() start syncing: ' + (walletInfo.latest_block_height - walletStatus.synced_blocks) + ' behind');
          } else {
            console.log('LITEWALLET chainsync updateWallet() not indicating sync on GUI. Only ' + (walletInfo.latest_block_height - walletStatus.synced_blocks) + ' behind');
          }
        } else {
          console.log('LITEWALLET chainsync updateWallet() synced');

          //Note: walletStatus contains no other fields if syncing==false
          this.setState({
            walletBalance: (walletBalance.verified_zbalance + walletBalance.tbalance).toFixed(8).toString(),
            walletHeight: walletInfo.latest_block_height,
            chainHeight:  walletInfo.latest_block_height,
            DownloadPercentage: 1
          })
          this.props.setHeight(walletInfo.latest_block_height)
          this.props.setSyncedBlocks(walletInfo.latest_block_height)
        }

        var bestAddress = ''
        var bestAmount = 0

        var zlist = []
        for (var z = 0; z < walletBalance.z_addresses.length; z++) {
          var zaddr = {
            address: walletBalance.z_addresses[z].address,
            balance: walletBalance.z_addresses[z].verified_zbalance
          }

          if (bestAmount == 0 && z == 0) {
            bestAddress =  zaddr.address
            bestAmount = zaddr.balance
          }

          if (zaddr.balance > bestAmount) {
            bestAddress =  zaddr.address
            bestAmount = zaddr.balance
          }

          zlist.push(zaddr)
        }
        this.props.setZAddresses(zlist)

        var tlist = []
        if (coins[this.props.settings.currentCoin].tEnabled) {
          for (var t = 0; t < walletBalance.t_addresses.length; t++) {
            var taddr = {
              address: walletBalance.t_addresses[t].address,
              balance: walletBalance.t_addresses[t].balance
            }
            if (taddr.balance > bestAmount) {
              bestAddress =  taddr.address
              bestAmount = taddr.balance
            }
            tlist.push(taddr)
          }
        }

        this.props.setTAddresses(tlist)

        if (this.props.context.address == '') {
          this.props.setAddress(bestAddress)
          this.props.setBalance(bestAmount)
          var pk = await privateKey(bestAddress)
          pk = JSON.parse(pk)
          this.props.setPrivateKey(pk[0].private_key)
        }

        if (!this.props.context.menuReady) {
          this.props.setMenuReady(true)
        }

        this.props.setWalletInUse(false)
      }

      var mainPageOpen = true
      if (this.props.mainSubPage.receivePage == 'visible') {
        mainPageOpen = false
      }

      var refreshSecondsRemaining


      clearTimeout(this.state.updateTimer)
      if (walletStatus.syncing=="false") {
        if (mainPageOpen) {
          console.log('LITEWALLET chainsync updateWallet() : synced, setRefreshSecondsRemaining=180')
          refreshSecondsRemaining=Date.now()+180000
          this.props.setRefreshSecondsRemaining(refreshSecondsRemaining)

          const updateTimerIDLong = setTimeout(
            () => {
              const walletCount = this.state.saveWalletCounter + 180
              this.setState({saveWalletCounter: walletCount})
              this.updateWallet()
            },
            180000
          )
          this.setState({updateTimer: updateTimerIDLong})
        }
	else
	{
          console.log('LITEWALLET chainsync updateWallet() : synced. Main page not open. Do nothing')          
	}
      } else {
        if (mainPageOpen) {
          //Server doe sn't respond with new data even when calling more frequently
          console.log('LITEWALLET chainsync updateWallet() : not synced, setRefreshSecondsRemaining=30')
          refreshSecondsRemaining=Date.now()+30000
          this.props.setRefreshSecondsRemaining(refreshSecondsRemaining)

          const updateTimerIDShort = setTimeout(
            () => {
              const walletCount = this.state.saveWalletCounter + 30
              this.setState({saveWalletCounter: walletCount})
              this.updateWallet()
            },
            30000
          )
          this.setState({updateTimer: updateTimerIDShort})
        }
	else
	{
          console.log('LITEWALLET chainsync updateWallet() : Not synced. Main page not open. Do nothing')
	}
      }
    }

    componentDidMount() {
      sync()
      this.getWalletStatus()
      this.updateWallet()
    }

    componentWillUnmount() {
      clearTimeout(this.state.updateTimer)
      clearTimeout(this.state.syncWalletTimer)
    }


    render () {

      if (this.props.context.refreshAddresses) {
	console.log('LITEWALLET chainsync updateWallet() : refreshAddresses - update all')
        this.updateWallet()
        this.getWalletStatus()
        this.props.setRefreshAddresses(false)
      }


      var balanceSection
      if (this.state.walletError) {
        <ChainSyncDiv>
          <ChainSyncUSD>
            {''}
          </ChainSyncUSD>
          <ChainSyncCurrentBalance>
          </ChainSyncCurrentBalance>
          <ChainSyncBTC>
            {''}
          </ChainSyncBTC>
          <ChainSyncBalanceLogo>
            <ChainSyncBalanceLogoImg src={pirateLogo}/>
          </ChainSyncBalanceLogo>
          <ChainSyncBalance>
            {this.state.errorMsg}
          </ChainSyncBalance>
          <ChainSyncBalanceUnits>
            {''}
          </ChainSyncBalanceUnits>
        </ChainSyncDiv>

      } else {
        balanceSection=
          <ChainSyncDiv>
            <ChainSyncUSD>
              {((this.state.walletBalance / 1e08)  * this.props.context.currencyValue).toFixed(6).toString() + ' USD '}
            </ChainSyncUSD>
            <ChainSyncCurrentBalance>
            </ChainSyncCurrentBalance>
            <ChainSyncBTC>
              {((this.state.walletBalance / 1e08) * this.props.context.BTCValue).toFixed(8).toString() + ' BTC '}
            </ChainSyncBTC>
            <ChainSyncBalanceLogo>
              <ChainSyncBalanceLogoImg src={pirateLogo}/>
            </ChainSyncBalanceLogo>
            <ChainSyncBalance>
              {(this.state.walletBalance / 1e08).toFixed(8).toString() + ' ARRR'}
            </ChainSyncBalance>
          </ChainSyncDiv>
      }


      return (
        <div>
          {balanceSection}
        </div>
      )
    }
}


ChainOps.propTypes = {
  setHeight: PropTypes.func.isRequired,
  setSyncedBlocks: PropTypes.func.isRequired,
  setRefreshSecondsRemaining: PropTypes.func.isRequired,
  setWalletInUse: PropTypes.func.isRequired,
  setRefreshAddresses: PropTypes.func.isRequired,
  setTAddresses: PropTypes.func.isRequired,
  setZAddresses: PropTypes.func.isRequired,
  setMenuReady: PropTypes.func.isRequired,  
  setSynced: PropTypes.func.isRequired,
  setSaving: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
  setPrivateKey:  PropTypes.func.isRequired,
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
    mainSubPage: state.mainSubPage,
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setHeight,
      setSyncedBlocks,
      setRefreshSecondsRemaining,
      setWalletInUse,
      setRefreshAddresses,
      setTAddresses,
      setZAddresses,
      setMenuReady,
      setAddress,
      setBalance,
      setPrivateKey,
      setSynced,
      setSaving
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChainOps)
