export function crashlyticsEnabled(enable) {
      return new Promise((resolve, reject) => {
        FirebasePlugin.setCrashlyticsCollectionEnabled(enable, (successResponse) => {
          resolve(successResponse)
        }, (errorResonse) =>{
          reject(errorResonse)
        })
      })
    }
