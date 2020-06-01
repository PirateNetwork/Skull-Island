import zeroLogo from '../assets/logo-white.png'

export const coins = {
  zcash: {
    networkname: 'zec',
    icon: '',
    api: [],
    explorer: [],
    messagePrefix: '\x18ZCash Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    branchHeight: {
      1: 0,
      2: 1,
      3: 492850,
      4: 695000
    },
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    }
  },
  zero: {
    networkname: 'zer',
    icon: zeroLogo,
    api: ['https://zersapling1.zeromachine.io/insight-api-zero/',
          'https://zersapling2.zeromachine.io/insight-api-zero/',
          'https://zersapling3.zeromachine.io/insight-api-zero/'],
    zmq: ['http://zersapling1.zeromachine.io:3001/',
          'http://zersapling2.zeromachine.io:3002/',
          'http://zersapling3.zeromachine.io:3003/'],
    explorer: ['https://zersapling1.zeromachine.io/insight/',
               'https://zersapling2.zeromachine.io/insight/',
               'https://zersapling3.zeromachine.io/insight/'],
    messagePrefix: '\x18Zero Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    branchHeight: {
      default: 0,
      unused: 1,
      overwinter: 492850,
      sapling: 492850
    },
    consensusBranchId: {
      default: 0x00,
      unused: 0x00,
      overwinter: 0x5ba81b19,
      sapling: 0x76b809bb
    }
  },
  arrow: {
    networkname: 'arw',
    icon: '',
    api: [],
    explorer: [],
    messagePrefix: '\x18ZCash Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    branchHeight: {
      default: 0,
      unused: 1,
      overwinter: 152854,
      sapling: 600000,
      saplingactual: 152855
    },
    consensusBranchId: {
      1: 0x00,
      2: 0x00,
      3: 0x5ba81b19,
      4: 0x76b809bb
    }
  },
  pirate: {
    networkname: 'arrr',
    icon: zeroLogo,
    api: ['https://witness.pirate.explorer.dexstats.info/insight-api-komodo/'],
    zmq: ['https://witness.pirate.explorer.dexstats.info/'],
    explorer: ['https://explorer.pirate.black/'],
    messagePrefix: '\x18Komodo Signed Message:\n',
    bech32: 'bc',
    bip32: {
      public: 0x0488b21e,
      private: 0x0488ade4
    },
    pubKeyHash: 0x1cb8,
    scriptHash: 0x1cbd,
    wif: 0x80,
    branchHeight: {
      default: 0,
      unused: 1,
      overwinter: 152854,
      sapling: 600000,
      saplingactual: 152855,
    },
    consensusBranchId: {
      default: 0x00,
      unused: 0x00,
      overwinter: 0x5ba81b19,
      sapling: 0x76b809bb
    }
  },
}
