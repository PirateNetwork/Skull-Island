export const ZERO_MOBILE_SAVE_PATH = 'zero_wallet.json'
export const ZERO_MOBILE_CONTACTS_PATH = 'zero_wallet_contacts.json'

export function readFromFile (fileName, onSuccess, onFail) {
  const pathToFile = cordova.file.dataDirectory + fileName
  window.resolveLocalFileSystemURL(
    pathToFile,
    function (fileEntry) {
      fileEntry.file(function (file) {
        var reader = new FileReader()

        reader.onloadend = function () {
          onSuccess(this.result)
        }

        reader.readAsText(file)
      }, onFail
      )
    }, onFail
  )
}

export function getLocalFileSystemURL() {
  const pathToFile = cordova.file.dataDirectory
  return new Promise((resolve, reject) => {
    window.resolveLocalFileSystemURL(pathToFile, (onSuccess) => {
      resolve(onSuccess)
    }, (onFail) => {
      reject(onFail)
    })
  })
}

export function getFileEntry(directoryEntry, fileName) {
  return new Promise((resolve, reject) => {
    directoryEntry.getFile(fileName, { create: true }, (onSuccess) => {
      resolve(onSuccess)
    }, (onFail) => {
      reject(onFail)
    })
  })
}

export function writeDataToFile(fileEntry, data) {
  data = JSON.stringify(data, 4, '\t')
  return new Promise((resolve, reject) => {
    fileEntry.createWriter((fileWriter) => {

      fileWriter.onwriteend = function (e) {
        resolve(e)
      }
      fileWriter.onerror = function (e) {
        reject(e)
      }
      var blob = new Blob([data], { type: 'text/plain' })
      fileWriter.write(blob)

    }, (onFail) => {
      reject(onFail)
    })
  })
}
