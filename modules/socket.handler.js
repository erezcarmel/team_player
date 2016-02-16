'use strict'

const PORT = 3001

function SocketIO(app) {
	let server = require('http').createServer()
	let io = require('socket.io')(server)
	let sockets = []
	io.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
	})
	server.listen(PORT)
	return {
		io: io
	}
}

SocketIO.PORT = PORT
module.exports = SocketIO
