//setTimeout(() =>{console.log("3sec");},3000);

/*var time=0;
var timer = setInterval(() => {
  time+=2;
  console.log(time+" seconds has passed");
  if(time > 7){
    clearInterval(timer);
  }
}, 2000);*/

//console.log(__dirname);
//console.log(__filename);

/*function func(fun) {
  fun();
}
var x = function () {
  console.log("logging");
};
func(x);*/
//x();

/*var stuff = require('./stuff');
console.log(stuff.counter(['abg','ram','sham','k']));
console.log(stuff.adder(9,4));*/

//var events = require('events');
//var util = require('util');
/*var myEmitter = new events.EventEmitter();
myEmitter.on('someEvent',(msg) =>{
  console.log(msg);
});
myEmitter.emit ('someEvent', "Event Emitted");*/

/*var person = function (name) {
  this.name = name;
}
util.inherits (person, events.EventEmitter);
var tan = new person ('tan');
var ram = new person ('ram');
var pri = new person ('pri');
var people = [tan, ram, pri];
people.forEach((person) => {
  person.on ('speak', (msg) => {
    console.log(`${person.name} says ${msg}`);
  });
});
people.forEach((person) => {
  person.emit('speak', 'hi');
});
*/

var fs = require('fs');
/*var readme = fs.readFileSync ('Readme.txt', 'utf8');
var writeme = fs.writeFileSync ('Writeme.txt', readme);*/
/*fs.readFile ('Readme.txt', 'utf8', (err, data) => {
  fs.writeFileSync ('Writeme.txt', data);
});*/
//fs.unlink('Writeme.txt');

/*var myReadStream = fs.createReadStream(__dirname + '/Readme.txt', 'utf8');
var myWriteStream = fs.createWriteStream(__dirname + '/Writeme.txt');
myReadStream.on('data', (chunk)=> {
  console.log('new chunk of data received : '+ chunk + "/n");
  myWriteStream.write('Writting data: '+chunk);
});*/
//myReadStream.pipe(myWriteStream);

const http = require ('http');
const server = http.createServer ((req, res) => {
  console.log(`Request URL ${req.url}`);
  res.writeHead(200, {'content-type':'text/html'});
  //var myReadStream = fs.createReadStream(__dirname + '/Readme.txt', 'utf8');
  var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  myReadStream.pipe(res);
});

server.listen (3000, '127.0.0.1', () => {
  console.log ('server started on 3000');
});
