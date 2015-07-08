
var fs = require("fs")
var sqlite3 = require("sqlite3").verbose()
var restify = require('restify')


var file = "vms.db"
var db = new sqlite3.Database(file)


var server = restify.createServer()
server.use(restify.fullResponse())
server.use(restify.bodyParser({ mapParams: true }))

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "X-Requested-With")
    return next()
  }
)



server.get("/vms", function(req, res, next) {
  var vms = []

  db.serialize(function() {
    db.each("SELECT * FROM vms;",
      function (err, row) {
        vms.push({
          "id": row.id,
          "host": row.host,
          "status": row.status,
          "description": row.description,
          "contact": row.contact
        })
      },
      function (err, cntx) {
        res.json({
          vms : vms
        })
      }
    )
  })

})



server.get("/vms/:host", function(req, res, next) {
  var vm = {}
  var queryHost = req.params.host

  db.serialize(function() {
    db.each("SELECT * FROM vms WHERE host = '"+queryHost+"';",
      function (err, row) {
        vm = {
          "id": row.id,
          "host": row.host,
          "status": row.status,
          "description": row.description,
          "contact": row.contact
        }
      },
      function (err, cntx) {
        res.json(vm)
      }
    )
  })

})




server.put("/vms/:id", function(req, res, next) {
  var id = req.params.id
  var vm = req.body

  var sid = vm.id
  var host = vm.host
  var status = vm.status
  var description = vm.description
  var contact = vm.contact

  if(sid != 'undefined' && sid == id) {
    if(host != 'undefined' && status != 'undefined' && description != 'undefined' && contact != 'undefined') {
      var updateStmt = db.prepare('UPDATE vms SET host=(?), status=(?), description=(?), contact=(?) WHERE id='+id)
      updateStmt.run(host, status, description, contact, function(err) {
        if (err != null) {
          console.log("Error in updating vm: " + err)
        }
      });
    }
  }
})



var port = 3000
server.listen(port, function (err) {
    if (err)
        console.error(err)
    else
        console.log('App is ready at : ' + port)
})