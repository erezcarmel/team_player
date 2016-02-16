'use strict'

const PORT = 3001

function SocketIO(app) {
	let server = require('http').createServer(app)
	let io = require('socket.io')(server)
	io.on('connection', function (socket) {
		// socket.emit('news', { hello: 'world' });
		// socket.on('my other event', function (data) {
			// console.log(data);
		// });
	})
	server.listen(PORT)
	return {
		io: io
	}
}

SocketIO.PORT = PORT
module.exports = SocketIO
