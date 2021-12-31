import pirateLogo from '../assets/pirate/logo.svg'
import pirateQrLogo from '../assets/pirate/qrlogo.svg'

export const coins = {
  pirate: {
    networkname: 'arrr',
    coinGeckoId: 'pirate-chain',
    icon: pirateLogo,
    qrlogo: pirateQrLogo,
    explorer: ['https://explorer.pirate.black/'],
    litewallet: ['https://lightd.pirate.black:443/'],
    tEnabled: false,
    addressParams: {
      coin_type: '141',
      hrp_sapling_extended_spending_key: 'secret-extended-key-main',
      hrp_sapling_extended_full_viewing_key: 'zxviews',
      hrp_sapling_payment_address: 'zs',
      b58_pubkey_address_prefix: '1cb8',
      b58_script_address_prefix: '1cbd',
    },
    branchHeight: {
      default: 0,
      unused: 0,
      overwinter: 0,
      sapling: 600000
    }
  }
}
