var fs = require('fs')
var sqlite3 = require('sqlite3').verbose()
var restify = require('restify')

var file = 'vms.db'
var db = new sqlite3.Database(file)

var server = restify.createServer()
server.use(restify.fullResponse())
server.use(restify.bodyParser({
    mapParams: true
}))
server.use(restify.queryParser())

server.use(
    function crossOrigin(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'X-Requested-With')
        return next()
    }
)

server.get('/vms', function(req, res, next) {
    var vms = []
    db.serialize(function() {
        db.each('SELECT * FROM vms', function(err, row) {
            vms.push({
                'id': row.id,
                'host': row.host,
                'status': row.status,
                'description': row.description,
                'contact': row.contact,
                'systeminfo': row.systeminfo,
                'bookingtime': row.bookingtime,
                'ansible_facts': row.ansible_facts
            })
        }, function(err) {
            res.json({
                vms: vms
            })
        })
    })
})

server.get('/vms/:host', function(req, res, next) {
    var vm = {}
    var queryHost = req.params.host

    db.serialize(function() {
        var selectStmt = 'SELECT * FROM vms WHERE host = (?)'
        var params = [ queryHost ]
        db.get(selectStmt, params, function(err, row) {
            vm = {
                'id': row.id,
                'host': row.host,
                'status': row.status,
                'description': row.description,
                'contact': row.contact,
                'systeminfo': row.systeminfo,
                'bookingtime': row.bookingtime,
                'ansible_facts': row.ansible_facts
            }
            res.json(vm)
        })
    })
})

server.put('/vms/:id', function(req, res, next) {
    var id = req.params.id
    var vm = req.body

    var sid = vm.id
    var host = vm.host
    var status = vm.status
    var description = vm.description
    var contact = vm.contact
    var systeminfo = vm.systeminfo
    var bookingtime = vm.bookingtime

    if (sid != 'undefined' && sid == id) {
        if (host != 'undefined' && status != 'undefined' && description != 'undefined' && contact != 'undefined') {
            var updateStmt = db.prepare('UPDATE vms SET host=(?), status=(?), description=(?), contact=(?), systeminfo=(?), bookingtime=(?) WHERE id=(?)')
            updateStmt.run(host, status, description, contact, systeminfo, bookingtime, id, function(err) {
                if (err != null) {
                    console.log('Error in updating vm: ' + err)
                    res.status(400)
                } else {
                    res.status(204)
                }
                res.end()
            })
        }
    }
})

server.put('/vms', function(req, res, next) {
    var payload = req.body

    if (payload) {
        var facts = payload['ansible_facts']
        var host = facts['ansible_fqdn']
        var updateStmt = db.prepare('UPDATE vms SET ansible_facts=(?) WHERE host=(?)')
        updateStmt.run(JSON.stringify(facts), host, function(err) {
            if (err != null) {
                console.log('Error in updating vm: ' + err)
                res.status(400)
            } else {
                res.status(204)
            }
            res.end()
        })
    }
})

var port = 3000
server.listen(port, function(err) {
    if (err) {
        console.error(err)
        return 1
    } else {
        return 0
    }
})
