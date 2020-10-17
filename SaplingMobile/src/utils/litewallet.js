export function walletExists(args) {
          return new Promise((resolve, reject) => {
            LiteWallet.exists(args, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }


export function initalizeWallet(url) {
          return new Promise((resolve, reject) => {
            LiteWallet.initalize(url, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function newWallet(url) {
          return new Promise((resolve, reject) => {
            LiteWallet.newWallet(url, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function restoreWallet(seed) {
          return new Promise((resolve, reject) => {
            LiteWallet.restoreWallet(seed, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function sync() {
          return new Promise((resolve, reject) => {
            LiteWallet.sync((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function syncStatus() {
          return new Promise((resolve, reject) => {
            LiteWallet.syncStatus((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function rescan() {
          return new Promise((resolve, reject) => {
            LiteWallet.rescan((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function clear() {
          return new Promise((resolve, reject) => {
            LiteWallet.clear((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function info() {
          return new Promise((resolve, reject) => {
            LiteWallet.info((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function encryptionstatus() {
          return new Promise((resolve, reject) => {
            LiteWallet.encryptionstatus((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function balance() {
          return new Promise((resolve, reject) => {
            LiteWallet.balance((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function notes() {
          return new Promise((resolve, reject) => {
            LiteWallet.notes((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function privateKey(address) {
          return new Promise((resolve, reject) => {
            LiteWallet.privateKey(address, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function newZAddress() {
          return new Promise((resolve, reject) => {
            LiteWallet.newZAddress((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function newTAddress() {
          return new Promise((resolve, reject) => {
            LiteWallet.newTAddress((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function seed() {
          return new Promise((resolve, reject) => {
            LiteWallet.seed((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function height() {
          return new Promise((resolve, reject) => {
            LiteWallet.height((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function list() {
          return new Promise((resolve, reject) => {
            LiteWallet.list((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function encrypt(password) {
          return new Promise((resolve, reject) => {
            LiteWallet.encrypt(password, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function decrypt(password) {
          return new Promise((resolve, reject) => {
            LiteWallet.decrypt(password, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function lock() {
          return new Promise((resolve, reject) => {
            LiteWallet.lock((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function unlock() {
          return new Promise((resolve, reject) => {
            LiteWallet.unlock((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function save(args) {
          return new Promise((resolve, reject) => {
            LiteWallet.save(args, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function send(tx) {
          return new Promise((resolve, reject) => {
            LiteWallet.send(tx, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function getSeedPhrase() {
          return new Promise((resolve, reject) => {
            LiteWallet.getSeedPhrase((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function checkSeedPhrase(seedPhrase) {
          return new Promise((resolve, reject) => {
            LiteWallet.checkSeedPhrase(seedPhrase, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }
