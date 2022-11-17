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
  setSynced,
  setSaving,
  setZAddresses,
  setTAddresses,
  setMenuReady,
  setRefreshAddresses,
  setTxList,
  setWalletInUse } from '../actions/Context'

import {
  ChainSyncBody,
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
  list,
  sync,
  syncStatus,
  info,
  save,
  unlock} from '../utils/litewallet'


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

        try {
            this.props.setWalletInUse(true)
            if (!this.props.context.saving) {

                //Check Wallet Info
                var walletInfo = await info()
                try {
                    walletInfo = JSON.parse(walletInfo)
                    this.setState({
                      walletError: false,
                      errorMsg: ''
                    })
                } catch {
                    this.setState({
                      walletError: true,
                      errorMsg: walletInfo
                    })
                }

                //Get Wallet Balance
                var walletBalance = await balance()
                try {
                    walletBalance = JSON.parse(walletBalance)
                } catch {
                    this.setState({
                      walletError: true,
                      errorMsg: walletBalance
                    })
                }

                //Get Wallet Status - used to check syncing
                var walletStatus = await syncStatus()
                try {
                    walletStatus = JSON.parse(walletStatus)
                } catch {
                    this.setState({
                      walletError: true,
                      errorMsg: walletStatus
                    })
                }

                var changed = false
                var downloaded = 0
                if (walletStatus.syncing == "true") {
                    //Check if the sync'd height or balance has changed
                    if (this.state.synced_blocks != walletStatus.synced_blocks ||
                      walletBalance.verified_zbalance + walletBalance.tbalance != walletBalance) {
                       changed = true
                    }

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
                    }
                } else {
                    //Note: walletStatus contains no other fields if syncing==false
                    //check if the sync'd height or balance has changed
                    if (this.state.synced_blocks != walletInfo.synced_blocks ||
                      walletBalance.verified_zbalance + walletBalance.tbalance != walletBalance) {
                       changed = true
                    }

                    this.setState({
                        walletBalance: (walletBalance.verified_zbalance + walletBalance.tbalance).toFixed(8).toString(),
                        walletHeight: walletInfo.latest_block_height,
                        chainHeight:  walletInfo.latest_block_height,
                        DownloadPercentage: 1
                    })
                    this.props.setHeight(walletInfo.latest_block_height)
                    this.props.setSyncedBlocks(walletInfo.latest_block_height)
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
                }

                if (!this.props.context.menuReady) {
                  this.props.setMenuReady(true)
                }

                if (walletStatus.syncing != "true") {
                    this.props.setSynced(true)
                    this.setState({
                      syncing: false
                    })
                } else {
                    if (walletStatus.total_blocks > walletStatus.synced_blocks + 6) {
                        //Syncing does occur, but do not show it on the GUI unless
                        //we're more than 6 minutes behind.
                        this.props.setSynced(false)
                        this.setState({
                          syncing: true
                        })
                    }
                }


                //Get the Transaction List if the wallet has changed
                if (this.state.syncing != "true") {
                  if (changed || this.props.context.transactionList == null) {
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
                          errorMsg: transactionList
                        })
                    }
                  }
                }
            }

            //When the synced blocks get close to the chain hieght, check more often for better GUI response
            var statusTimeout = 10000
            if (walletStatus.syncing == "true") {
                if (this.props.context.height - this.props.context.syncedBlocks < 1000) {
                  statusTimeout = 1000
                }
            }

            const syncWalletTimerIDShort = setTimeout(
              () => {
                this.getWalletStatus()
              },statusTimeout)
            this.setState({syncWalletTimer: syncWalletTimerIDShort})

        } catch {

            this.setState({
              walletError: true,
              errorMsg: 'getWalletStatus Failed! '
            })

            const syncWalletTimerIDShort = setTimeout(
              () => {
                this.getWalletStatus()
              },10000)
            this.setState({syncWalletTimer: syncWalletTimerIDShort})
        }

        this.props.setWalletInUse(false)
    }

async updateWallet() {

      try {
          if (!this.props.context.saving) {

            this.props.setWalletInUse(true)
            if (!this.state.syncing) {
              sync()
            }

            //Save wallet to disk
            if (this.state.saveWalletCounter >= 10) {
                this.props.setSaving(true)
                await save(coins[this.props.settings.currentCoin].networkname)
                await unlock(this.props.context.activePassword)
                this.setState({saveWalletCounter: 0})
                this.props.setSaving(false)
            }

            clearTimeout(this.state.updateTimer)
            var refreshSecondsRemaining=Date.now()+30000
            this.props.setRefreshSecondsRemaining(refreshSecondsRemaining)

            const updateTimerIDLong = setTimeout(
              () => {
                const walletCount = this.state.saveWalletCounter + 1
                this.setState({saveWalletCounter: walletCount})
                this.updateWallet()
              },
              30000
            )
            this.setState({updateTimer: updateTimerIDLong})
          }
      } catch {

          this.setState({
            walletError: true,
            errorMsg: 'updateWallet Failed!'
          })

          const updateTimerIDLong = setTimeout(
            () => {
              const walletCount = this.state.saveWalletCounter + 0
              this.setState({saveWalletCounter: walletCount})
              this.updateWallet()
            },
            10000
          )
          this.setState({updateTimer: updateTimerIDLong})

      }
  }

    componentDidMount() {
      this.getWalletStatus()
      this.updateWallet()
    }

    componentWillUnmount() {
      clearTimeout(this.state.updateTimer)
      clearTimeout(this.state.syncWalletTimer)
    }


    render () {

      if (this.props.context.refreshAddresses) {
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
        <ChainSyncBody>
          {balanceSection}
        </ChainSyncBody>
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
  setTxList: PropTypes.func.isRequired,
  setMenuReady: PropTypes.func.isRequired,
  setSynced: PropTypes.func.isRequired,
  setSaving: PropTypes.func.isRequired,
  setAddress: PropTypes.func.isRequired,
  setBalance:  PropTypes.func.isRequired,
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
      setTxList,
      setMenuReady,
      setAddress,
      setBalance,
      setSynced,
      setSaving
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChainOps)
