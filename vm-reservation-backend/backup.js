var fs = require('fs')
var sqlite3 = require("sqlite3").verbose()

var file = "vms.db"
var db = new sqlite3.Database(file)
var vms = []



db.serialize(function() {
  db.each("SELECT * FROM vms;",
    function (err, row) {
      vms.push({
        "id": row.id,
        "host": row.host,
        "status": row.status,
        "description": row.description,
        "contact": row.contact,
        "systeminfo": row.systeminfo
      })
    },
    function (err, cntx) {
      writeBackupFile(JSON.stringify(vms))
    }
  )
})



function writeBackupFile(data) {
  var backupFileName = getBackupFileName()
  fs.writeFile('backup/' + backupFileName, data)
}



function getBackupFileName() {
  var date = new Date();
  var dateString = date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate() + '--' + date.getHours() + '-' +  date.getMinutes() + '-' + date.getSeconds()
  var backupFileName = 'vmtool-backup-' + dateString + '.txt'
  return backupFileName
}