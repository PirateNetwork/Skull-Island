export const SAPLING_SPEND_FILENAME = 'sapling-spend.params'
export const SAPLING_OUTPUT_FILENAME = 'sapling-output.params'

export const SAPLING_SPEND_PATH = 'files/params/sapling-spend.params'
export const SAPLING_OUTPUT_PATH = 'files/params/sapling-output.params'

export const SAPLING_SPEND_DOWNLOAD_PATH = "https://download.z.cash/downloads/sapling-spend.params"
export const SAPLING_OUTPUT_DOWNLOAD_PATH ="https://download.z.cash/downloads/sapling-output.params"

export const SAPLING_SPEND_MD5CHKSUM = "0f44c12ef115ae019decf18ade583b20"
export const SAPLING_OUTPUT_MD5CHKSUM = "924daf81b87a81bbbb9c7d18562046c8"


export function getOutputParam() {
  downloader.init({folder: "params", unzip: true, check: false})
  downloader.get(SAPLING_OUTPUT_DOWNLOAD_PATH, null, SAPLING_OUTPUT_FILENAME)
}

export function getSpendingParam() {
  downloader.init({folder: "params", unzip: true, check: false})
  downloader.get(SAPLING_SPEND_DOWNLOAD_PATH, null, SAPLING_SPEND_FILENAME)
}

export function getOutputFileEntry() {
  const pathToFile = cordova.file.dataDirectory + SAPLING_OUTPUT_PATH
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(pathToFile, (onSuccess) => {
      resolve(onSuccess)
    }, (onFail) => {
      reject(onFail)
    })
  })
}


export function getSpendingFileEntry() {
  const pathToFile = cordova.file.dataDirectory + SAPLING_SPEND_PATH
  return new Promise((resolve) => {
    window.resolveLocalFileSystemURL(pathToFile, (onSuccess) => {
      resolve(onSuccess)
    }, (onFail) => {
      resolve(onFail)
    })
  })
}

export function getMD5(fileEntry) {
  return new Promise((resolve) => {
    md5chksum.file(fileEntry, (onSuccess) => {
      resolve(onSuccess)
    }, (onFail) => {
      resolve(onFail)
    })
  })
}



// const errorHandler = function (fileName, e) {
//   var msg = ''
//
//   switch (e.code) {
//     case FileError.QUOTA_EXCEEDED_ERR:
//       msg = 'Storage quota exceeded'
//       break
//     case FileError.NOT_FOUND_ERR:
//       msg = 'File not found'
//       break
//     case FileError.SECURITY_ERR:
//       msg = 'Security error'
//       break
//     case FileError.INVALID_MODIFICATION_ERR:
//       msg = 'Invalid modification'
//       break
//     case FileError.INVALID_STATE_ERR:
//       msg = 'Invalid state'
//       break
//     default:
//       msg = 'Unknown error'
//       break
//   }
//
//   alert('Error (' + fileName + '): ' + msg)
// }
