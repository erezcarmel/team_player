
var React = require('react')
var ReactDOM = require('react-dom');

class A {

}

let a = new A()

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.querySelector('#console')
);

console.log('working with react version:')
// console.log(react.version)

require('./player');
require('./socket.io.client')
