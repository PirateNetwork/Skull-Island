export const DATABASE_VERSION = 5

//Open Sqlite Database
export function openDatabase(dbName) {
          return new Promise((resolve, reject) => {
            SQLitePlugin.sqlitePlugin.openDatabase({name : dbName, location: 'default', androidDatabaseProvider: 'system'},
               (successResponse) => {
              resolve(successResponse)
            }, (errorResonse) =>{
              reject(errorResonse)
            })
          })
        }

//Open Sqlite Database
export function deleteDatabase(dbName) {
          return new Promise((resolve, reject) => {
            SQLitePlugin.sqlitePlugin.deleteDatabase({name : dbName, location: 'default'},
               (successResponse) => {
              //console.log('database deleted')
              resolve(successResponse)
            }, (errorResonse) =>{
              //console.log('database delete error')
              reject(errorResonse)
            })
          })
        }

//Execute single command
export function runSqlCommand (db, command) {
          return new Promise((resolve, reject) => {
            db.executeSql(command, [],
               () => {
                 //console.log('sql command run')
                 resolve()
            }, (error) => {
                //console.log('SQL error: ' + error.message);
                reject(error)
            })


          })
        }

export function runBatchCommand (db, command) {
          return new Promise((resolve, reject) => {
            // console.log(command)
            db.sqlBatch(command,
               () => {
                 // console.log('sql command run')
                 resolve()
            }, (error) => {
                console.log('SQL error: ' + error.message);
                reject(error)
            })


          })
        }

//Open Recordset
export function openRecordset (db, command) {
          //console.log(command)
          return new Promise((resolve, reject) => {
              db.executeSql(command, [],
                 (rs) => {
                   //console.log('open recordset run')
                   resolve(rs)
              }, (error) => {
                  //console.log('SELECT error: ' + error.message);
                  reject(error)
              })

          })
        }

//Open Recordset
export function insertRecords (db, command, values) {
          return new Promise((resolve, reject) => {
              db.executeSql(command, values,
                 () => {
                   //console.log('insert records run')
                   resolve()
              }, (error) => {
                  //console.log('SELECT error: ' + error.message);
                  reject(error)
              })

          })
        }
