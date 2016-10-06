var dbm = global.dbm || require('db-migrate')
var type = dbm.dataType

exports.up = function(db, callback) {
    db.addColumn('vms', 'ansible_facts', { type: 'text' }, callback)
}

exports.down = function(db, callback) {
    db.removeColumn('vms', 'ansible_facts', callback)
}
