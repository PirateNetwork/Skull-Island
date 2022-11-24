// cordova.getAppVersion.getVersionCode(function(version){
//     // 10000
//     console.log("version code", version);
// });

export function appVersion() {
          return new Promise((resolve, reject) => {
            cordova.getAppVersion.getVersionNumber((successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }
