'use strict'
//
// function SocketIO(app) {
// 	let server = require('http').Server(app);
// 	let io = require('socket.io')(server)
// 	io.on('connection', function (socket) {
// 		socket.emit('news', { hello: 'world' });
// 		socket.on('my other event', function (data) {
// 			console.log(data);
// 		});
// 	})
// }
//
// module.exports = SocketIO

var app = require('http').createServer()
var io = require('socket.io')(app);

app.listen(3001);

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
