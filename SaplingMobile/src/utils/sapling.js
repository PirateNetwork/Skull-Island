

export function apiDecryptTransaction(tx, key) {
          return new Promise((resolve, reject) => {
            Sapling.decryptTransaction(tx, key, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function apiGetNullifier(tx, key, witness) {
          return new Promise((resolve, reject) => {
            Sapling.getNullifier(tx, key, witness, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function apiGetAddress(seed) {
          return new Promise((resolve, reject) => {
            Sapling.getAddress(seed, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function apiIncrementWitness(witness) {
          return new Promise((resolve, reject) => {
            Sapling.incrementWitness(witness, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function apiBuildTransaction(input, tinput, zinput) {
          return new Promise((resolve, reject) => {
            Sapling.buildTransaction(input, tinput, zinput, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

export function apiTestTransaction(tx) {
          return new Promise((resolve, reject) => {
            Sapling.testTransaction(tx, (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }
