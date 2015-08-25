
var fs = require("fs")
var sqlite3 = require("sqlite3").verbose()


var file = "vms.db"
var exists = fs.existsSync(file)


var db = new sqlite3.Database(file)

var vms = JSON.parse(fs.readFileSync("vms.json", "utf8"))



db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE vms (id int, host text, status text, description text, contact text, systeminfo text, bookingtime text)")

    var stmt = db.prepare("INSERT INTO vms VALUES (?,?,?,?,?,?,?)")
    for (var k=0; k<vms.vms.length; ++k) {
	stmt.run(k, vms.vms[k].host, vms.vms[k].status, vms.vms[k].description, vms.vms[k].contact, vms.vms[k].systeminfo, vms.vms[k].bookingtime)
    }
  }

  db.each("SELECT * FROM vms;",
    function (err, row) {
      console.log(row.id + ": " + row.host + "(status: " + row.status + ", description: " + row.description + ", contact: " + row.contact + ", systeminfo: " + row.systeminfo + ", bookingtime: " + row.bookingtime + ")")
    }
  )
})
