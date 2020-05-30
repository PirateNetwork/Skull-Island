

export function getBaseDirectoryEntry() {
  return new Promise((resolve, reject) => {
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, (onSuccess) => {
      resolve(onSuccess)
    }, (onFail) => {
      reject(onFail)
    })
  })
}

export function getDirectoryEntry(filesystem, folderName) {
  return new Promise((resolve, reject) => {
    filesystem.root.getDirectory(folderName, { create: true }, (onSuccess) => {
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
