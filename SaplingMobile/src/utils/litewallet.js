export function checkServer(args) {
          return new Promise((resolve, reject) => {
            LiteWallet.checkserver(args, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }


export function walletExists(args) {
          return new Promise((resolve, reject) => {
            LiteWallet.exists(args, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }


export function initalizeWallet(url) {
          return new Promise((resolve, reject) => {
            LiteWallet.initalize(url, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function newWallet(url) {
          return new Promise((resolve, reject) => {
            LiteWallet.newWallet(url, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function restoreWallet(seed) {
          return new Promise((resolve, reject) => {
            LiteWallet.restoreWallet(seed, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function sync() {
          return new Promise((resolve, reject) => {
            LiteWallet.sync((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function syncStatus() {
          return new Promise((resolve, reject) => {
            LiteWallet.syncStatus((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function rescan() {
          return new Promise((resolve, reject) => {
            LiteWallet.rescan((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function clear() {
          return new Promise((resolve, reject) => {
            LiteWallet.clear((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function info() {
          return new Promise((resolve, reject) => {
            LiteWallet.info((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function encryptionstatus() {
          return new Promise((resolve, reject) => {
            LiteWallet.encryptionstatus((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function balance() {
          return new Promise((resolve, reject) => {
            LiteWallet.balance((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function notes() {
          return new Promise((resolve, reject) => {
            LiteWallet.notes((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function privateKey(address) {
          return new Promise((resolve, reject) => {
            LiteWallet.privateKey(address, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function newZAddress() {
          return new Promise((resolve, reject) => {
            LiteWallet.newZAddress((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function newTAddress() {
          return new Promise((resolve, reject) => {
            LiteWallet.newTAddress((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function walletSeed() {
          return new Promise((resolve, reject) => {
            LiteWallet.seed((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function height() {
          return new Promise((resolve, reject) => {
            LiteWallet.height((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function list() {
          return new Promise((resolve, reject) => {
            LiteWallet.list((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function encryptWallet(password) {
          return new Promise((resolve, reject) => {
            LiteWallet.encrypt(password, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function decryptWallet(password) {
          return new Promise((resolve, reject) => {
            LiteWallet.decrypt(password, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function lock() {
          return new Promise((resolve, reject) => {
            LiteWallet.lock((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function unlock(password) {
          return new Promise((resolve, reject) => {
            LiteWallet.unlock(password, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function save(args) {
          return new Promise((resolve, reject) => {
            LiteWallet.save(args, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function send(tx) {
          return new Promise((resolve, reject) => {
            LiteWallet.send(tx, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function getSeedPhrase() {
          return new Promise((resolve, reject) => {
            LiteWallet.getSeedPhrase((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }

export function checkSeedPhrase(seedPhrase) {
          return new Promise((resolve, reject) => {
            LiteWallet.checkSeedPhrase(seedPhrase, (successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }
