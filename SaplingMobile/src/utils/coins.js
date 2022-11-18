import pirateLogo from '../assets/pirate/logo.svg'
import pirateQrLogo from '../assets/pirate/qrlogo.svg'

export const coins = {
  pirate: {
    networkname: 'arrr',
    coinGeckoId: 'pirate-chain',
    icon: pirateLogo,
    qrlogo: pirateQrLogo,
    explorer: ['https://explorer.pirate.black/'],
    litewallet: ['https://piratelightd.cryptoforge.cc:443/'],
    tEnabled: false,
    branchHeight: {
      default: 0,
      unused: 0,
      overwinter: 0,
      sapling: 600000
    }
  }
}
