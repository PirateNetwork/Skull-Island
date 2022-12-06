export function getStatusBarHeight() {
          return new Promise((resolve, reject) => {
            StatusBarHeight.getValue((successResponse) => {
              resolve(successResponse)
            }, (errorResponse) =>{
              reject(errorResponse)
            })
          })
        }
