import pirateLogo from '../assets/pirate/logo.svg'
import pirateQrLogo from '../assets/pirate/qrlogo.svg'

export const coins = {
  pirate: {
    networkname: 'arrr',
    coinGeckoId: 'pirate-chain',
    icon: pirateLogo,
    qrlogo: pirateQrLogo,
    serversURL: '',
    explorer: ['https://explorer.pirate.black/'],
    litewallet: ['https://lightd1.pirate.black:443/','https://piratelightd.cryptoforge.cc:443/'],
    backupservers:['https://piratelightd1.cryptoforge.cc:443/','https://piratelightd2.cryptoforge.cc:443/','https://piratelightd3.cryptoforge.cc:443/','https://piratelightd4.cryptoforge.cc:443/'],
    tEnabled: false,
    branchHeight: {
      default: 0,
      unused: 0,
      overwinter: 0,
      sapling: 152855
    }
  }
}
