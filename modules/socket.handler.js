'use strict'

var socketHandler = exports;
exports.constructor = function socketHandler(){};

socketHandler.handler = function(socket){
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
}

