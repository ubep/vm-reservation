var static = require('node-static')
var http = require('http')

var fileServer = new static.Server('./')

http.createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response)
    }).resume()
}).listen(3030)
