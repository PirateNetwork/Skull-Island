import React from 'react'
import PropTypes from 'prop-types'

import {
  bindActionCreators
} from 'redux'
import {
  connect
} from 'react-redux'

import {
  setHeight,
  setSyncedBlocks,
  setRefreshSecondsRemaining,
  setAddress,
  setBalance,
  setSynced,
  setSaving,
  setZAddresses,
  setTAddresses,
  setMenuReady,
  setRefreshAddresses,
  setTxList,
  setWalletInUse,
  setDisconnected,
  setActiveServer
} from '../actions/Context'

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
  ChainSyncDiv,
  ChainSyncCurrentBalance,
  ChainSyncBalanceLogo,
  ChainSyncBalanceLogoImg,
  ChainSyncUSD,
  ChainSyncBTC,
  ChainSyncBalance,
  ChainSyncBalanceError,
  ChainSyncBalanceErrorMsg1,
  ChainSyncBalanceErrorMsg2,
  // ChainSyncBalanceUnits,
} from '../components/chainsync'

import pirateLogo from '../assets/svg/pirate_logo.svg'

import {
  coins
} from '../utils/coins.js'

import {
  balance,
  list,
  sync,
  syncStatus,
  info,
  save,
  unlock
} from '../utils/litewallet'


class ChainOps extends React.Component {

    constructor(props) {
      super(props)

      this.state = {
        walletBalance: 0.00000000,
        walletHeight: 0,
        DownloadPercentage: 0,
        chainHeight: 1,
        syncing: false,
        walletError: false,
        errorCount: 0,
        syncWalletTimer: null,
        updateTimer: null,
        syncAddressesTimer: null,
        syncStatus: null,
        saveWalletCounter: 0,
        firstRun: true,
        syncTime: 0
      }

      this.getWalletStatus = this.getWalletStatus.bind(this)
      this.updateWallet = this.updateWallet.bind(this)
      this.updateAddresses = this.updateAddresses.bind(this)
    }

    async getWalletStatus() {

      try {
        this.props.setWalletInUse(true)
        if (!this.props.context.saving) {

          //Check Wallet Info
          var walletInfo = await info()
          console.log(walletInfo)
          try {
            walletInfo = JSON.parse(walletInfo)
            this.setState({
              walletError: false,
            })
          } catch {
            this.setState({
              walletError: true,
            })
          }

          //Get Wallet Balance
          var walletBalance = await balance()
          try {
            walletBalance = JSON.parse(walletBalance)
          } catch {
            this.setState({
              walletError: true,
            })
          }

          //Get Wallet Status - used to check syncing
          var walletStatus = await syncStatus()
          try {
            walletStatus = JSON.parse(walletStatus)
          } catch {
            this.setState({
              walletError: true,
            })
          }

          if (this.state.walletError) {
            var errorCount = this.state.errorCount + 1
            this.setState({
              errorCount: errorCount
            })
            if (errorCount > 5) {
              this.setState({
                errorCount: 0
              })
              this.props.setActiveServer('')
              this.props.setDisconnected(true)
              this.props.setTransactionPage('none')
              this.props.setReindexPage('none')
              this.props.setPassPhrasePage('none')
              this.props.setPrivateKeyPage('none')
              this.props.setReceivePage('none')
              this.props.setSendPage('none')
              this.props.setMainPage('none')
              this.props.setReconnectPage('visible')
            }
          } else {
            this.setState({
              errorCount: 0
            })
          }

          if (!this.state.walletError) {
            var changed = false
            var downloaded = 0
            if (walletStatus.in_progress == true) {
              //Check if the sync'd height or balance has changed
              if (this.props.context.syncedBlocks != (walletStatus.end_block + walletStatus.synced_blocks) ||
                walletBalance.verified_zbalance + walletBalance.tbalance != walletBalance) {
                changed = true
              }

              if (walletInfo.latest_block_height > 0) {
                downloaded = (walletStatus.end_block + walletStatus.synced_blocks) / walletInfo.latest_block_height
              } else {
                downloaded = 0
              }

              this.setState({
                walletBalance: (walletBalance.verified_zbalance + walletBalance.tbalance).toFixed(8).toString(),
                walletHeight: (walletStatus.end_block + walletStatus.synced_blocks),
                chainHeight: walletInfo.latest_block_height,
                DownloadPercentage: downloaded
              })

              this.props.setHeight(walletInfo.latest_block_height)
              this.props.setSyncedBlocks((walletStatus.end_block + walletStatus.synced_blocks))

              if (walletInfo.latest_block_height > (walletStatus.end_block + walletStatus.synced_blocks) + 10) {
                //walletStatus will revert back to 'syncing=true' automatically
                //when the wallet falls far enough behind the block height
                //For a few blocks, don't show on the GUI that we're syncing in
                //the background:
                this.props.setSynced(false)
              } else {
                this.props.setSynced(true)
              }
            } else {
              //Note: walletStatus contains no other fields if syncing==false
              //Check if the sync'd height or balance has changed
              if (this.props.context.syncedBlocks != walletStatus.scanned_height ||
                walletBalance.verified_zbalance + walletBalance.tbalance != walletBalance) {
                changed = true
              }

              if (walletInfo.latest_block_height > 0) {
                downloaded = walletStatus.scanned_block / walletInfo.latest_block_height
              } else {
                downloaded = 0
              }

              this.setState({
                walletBalance: (walletBalance.verified_zbalance + walletBalance.tbalance).toFixed(8).toString(),
                walletHeight: walletStatus.scanned_height,
                chainHeight: walletInfo.latest_block_height,
                DownloadPercentage: downloaded
              })
              this.props.setHeight(walletInfo.latest_block_height)
              this.props.setSyncedBlocks(walletStatus.scanned_height)

              if (walletInfo.latest_block_height > (walletStatus.scanned_height) + 10) {
                //walletStatus will revert back to 'syncing=true' automatically
                //when the wallet falls far enough behind the block height
                //For a few blocks, don't show on the GUI that we're syncing in
                //the background:
                this.props.setSynced(false)
              } else {
                this.props.setSynced(true)
              }
            }


            //Set Addresses
            var bestAddress = ''
            var bestAmount = 0
            var zlist = []
            for (var z = 0; z < walletBalance.z_addresses.length; z++) {
              var zaddr = {
                address: walletBalance.z_addresses[z].address,
                balance: walletBalance.z_addresses[z].verified_zbalance
              }

              if (bestAmount == 0 && z == 0) {
                bestAddress = zaddr.address
                bestAmount = zaddr.balance
              }

              if (zaddr.balance > bestAmount) {
                bestAddress = zaddr.address
                bestAmount = zaddr.balance
              }

              if (this.props.context.address == zaddr.address) {
                this.props.setBalance(zaddr.balance)
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
                  bestAddress = taddr.address
                  bestAmount = taddr.balance
                }
                tlist.push(taddr)
              }
            }

            this.props.setTAddresses(tlist)

            if (this.props.context.address == '') {
              this.props.setAddress(bestAddress)
              this.props.setBalance(bestAmount)
            }

            if (!this.props.context.menuReady) {
              this.props.setMenuReady(true)
            }

            if (walletStatus.in_progress != true && this.state.syncing == true) {
              this.setState({
                syncing: false,
                syncTime: Date.now()
              })
            }

            //Get the Transaction List if the wallet has changed
            if (changed || this.state.firstRun == true) {
              var transactionList = await list()
              try {
                transactionList = JSON.parse(transactionList)
                transactionList.reverse()
                if (this.props.context.transactionList != transactionList) {
                  this.props.setTxList(transactionList)
                }
              } catch {
                this.setState({
                  walletError: true,
                })
              }
            }
          }
        }

        //When the synced blocks get close to the chain hieght, check more often for better GUI response
        var statusTimeout = 10000
        if (!this.state.walletError) {
          if (this.state.firstRun == true) {
            statusTimeout = 500
          }
          if (walletStatus.in_progress == true) {
            if (this.props.context.height - this.props.context.syncedBlocks > 1000) {
              statusTimeout = 1000
            }
          }
        }

        clearTimeout(this.state.syncWalletTimer)
        if (this.props.mainSubPage.mainPage == 'visible') {
          const syncWalletTimerIDShort = setTimeout(
            () => {
              this.getWalletStatus()
            }, statusTimeout)
          this.setState({
            syncWalletTimer: syncWalletTimerIDShort
          })
        }

      } catch {

        this.setState({
          walletError: true,
        })

        clearTimeout(this.state.syncWalletTimer)
        if (this.props.mainSubPage.mainPage == 'visible') {
          const syncWalletTimerIDShort = setTimeout(
            () => {
              this.getWalletStatus()
            }, 10000)
          this.setState({
            syncWalletTimer: syncWalletTimerIDShort
          })
        }
      }

      this.props.setWalletInUse(false)

      if (!this.state.walletError) {
        this.setState({
          firstRun: false
        })
      }

    }

    async updateWallet() {

      try {
        this.props.setWalletInUse(true)
        if (!this.props.context.saving && this.state.syncTime < Date.now() + 30000) {

          if (!this.state.syncing) {
            sync()
          }

          //Save wallet to disk
          if (this.state.saveWalletCounter >= 10) {
            this.props.setSaving(true)
            await save(coins[this.props.settings.currentCoin].networkname)
            await unlock(this.props.context.activePassword)
            this.setState({
              saveWalletCounter: 0
            })
            this.props.setSaving(false)
          }

          clearTimeout(this.state.updateTimer)
          var refreshSecondsRemaining = Date.now() + 30000
          this.props.setRefreshSecondsRemaining(refreshSecondsRemaining)

          if (this.props.mainSubPage.mainPage == 'visible') {
            const updateTimerIDLong = setTimeout(
              () => {
                const walletCount = this.state.saveWalletCounter + 1
                this.setState({
                  saveWalletCounter: walletCount
                })
                this.updateWallet()
              },
              30000
            )
            this.setState({
              updateTimer: updateTimerIDLong
            })
          }

        }
      } catch {

        this.setState({
          walletError: true,
        })

        clearTimeout(this.state.updateTimer)

        if (this.props.mainSubPage.mainPage == 'visible') {
          const updateTimerIDLong = setTimeout(
            () => {
              const walletCount = this.state.saveWalletCounter + 0
              this.setState({
                saveWalletCounter: walletCount
              })
              this.updateWallet()
            },
            10000
          )
          this.setState({
            updateTimer: updateTimerIDLong
          })
        }
      }

      this.props.setWalletInUse(false)
    }

    async updateAddresses() {

      if (this.props.context.refreshAddresses) {
        this.updateWallet()
        this.getWalletStatus()
        this.props.setRefreshAddresses(false)
      }

      clearTimeout(this.state.syncAddressesTimer)
      if (this.props.mainSubPage.mainPage == 'visible') {
        const syncAddressesTimerIDShort = setTimeout(
          () => {
            this.updateAddresses()
          }, 50)
        this.setState({
          syncAddressesTimer: syncAddressesTimerIDShort
        })
      }
    }

    componentDidMount() {
      this.getWalletStatus()
      this.updateWallet()
      this.updateAddresses()
    }

    componentWillUnmount() {
      clearTimeout(this.state.updateTimer)
      clearTimeout(this.state.syncWalletTimer)
      clearTimeout(this.state.syncAddressesTimer)
    }


    render() {

      var balanceSection
      if (this.state.walletError) {
        balanceSection=
        <ChainSyncDiv>
          <ChainSyncBalanceLogo>
            <ChainSyncBalanceLogoImg src={pirateLogo}/>
          </ChainSyncBalanceLogo>
          <ChainSyncBalanceError>
            {'Wallet Sync Error!!!'}
          </ChainSyncBalanceError>
          <ChainSyncBalanceErrorMsg1>
            {'Recovering'}
          </ChainSyncBalanceErrorMsg1>
          <ChainSyncBalanceErrorMsg2>
            {'Attempt #' + this.state.errorCount}
          </ChainSyncBalanceErrorMsg2>
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
  setReconnectPage: PropTypes.func.isRequired,
  setTransactionPage: PropTypes.func.isRequired,
  setReindexPage: PropTypes.func.isRequired,
  setPassPhrasePage: PropTypes.func.isRequired,
  setPrivateKeyPage: PropTypes.func.isRequired,
  setReceivePage: PropTypes.func.isRequired,
  setSendPage: PropTypes.func.isRequired,
  setMainPage: PropTypes.func.isRequired,
  setHeight: PropTypes.func.isRequired,
  setSyncedBlocks: PropTypes.func.isRequired,
  setRefreshSecondsRemaining: PropTypes.func.isRequired,
  setWalletInUse: PropTypes.func.isRequired,
  setRefreshAddresses: PropTypes.func.isRequired,
  setTAddresses: PropTypes.func.isRequired,
  setZAddresses: PropTypes.func.isRequired,
  setTxList: PropTypes.func.isRequired,
  setMenuReady: PropTypes.func.isRequired,
  setSynced: PropTypes.func.isRequired,
  setSaving: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance: PropTypes.func.isRequired,
  setDisconnected: PropTypes.func.isRequired,
  setActiveServer: PropTypes.func.isRequired,
  context: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  secrets: PropTypes.object.isRequired,
  mainSubPage: PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    context: state.context,
    settings: state.settings,
    secrets: state.secrets,
    mainSubPage: state.mainSubPage,
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
      setHeight,
      setSyncedBlocks,
      setRefreshSecondsRemaining,
      setWalletInUse,
      setRefreshAddresses,
      setTAddresses,
      setZAddresses,
      setTxList,
      setMenuReady,
      setAddress,
      setBalance,
      setSynced,
      setSaving,
      setDisconnected,
      setActiveServer
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChainOps)
