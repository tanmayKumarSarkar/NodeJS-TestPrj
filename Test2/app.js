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

//var fs = require('fs');
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

//const http = require ('http');
/*const server = http.createServer ((req, res) => {
  console.log(`Request URL ${req.url}`);
  res.writeHead(200, {'content-type':'text/html'});
  //var myReadStream = fs.createReadStream(__dirname + '/Readme.txt', 'utf8');
  var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8');
  myReadStream.pipe(res);
});

server.listen (3000, '127.0.0.1', () => {
  console.log ('server started on 3000');
});*/

/*const server = http.createServer ((req, res) => {
  console.log(`Request URL ${req.url}`);
  res.writeHead(200, {'content-type':'application/json'});
  var myObj = {
    name: 'unk',
    job: 'fun',
    age: 18
  };
  res.end(JSON.stringify(myObj));
});

server.listen (3000, '127.0.0.1', () => {
  console.log ('server started on 3000');
});*/

/*const server = http.createServer ((req, res) => {
  console.log(`Request URL ${req.url}`);
  if(req.url === '/home' || req.url === '/'){
    res.writeHead(200, {'content-type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/index.html', 'utf8').pipe(res);
  }else if (req.url === '/api/ninjas'){
    var myObj = {name: 'unk', job: 'fun', age: 18};
    res.writeHead(200, {'content-type':'application/json'});
    res.end(JSON.stringify(myObj));
  }else if (req.url === '/contact'){
    res.writeHead(200, {'content-type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/Contact.html', 'utf8').pipe(res);
  }else {
    res.writeHead(404, {'content-type':'text/html'});
    var myReadStream = fs.createReadStream(__dirname + '/Error.html', 'utf8').pipe(res);
  } 
  
});

server.listen (3000, '127.0.0.1', () => {
  console.log ('server started on 3000');
});*/
//npm install -g nodemon

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var urlencodedParser = bodyParser.urlencoded({extended:false});
//app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  //res.send('This is a home page')
  //res.sendFile(__dirname + '/index.html');
  res.render('index');
});
app.get('/contact', (req, res) => {
  //res.sendFile(__dirname + '/contact.html');
  res.render('contact',{qs: req.query});
});

app.post('/contact', urlencodedParser, (req, res)=>{
  //console.log(req.body);
  res.render('contact-success',{data: req.body});
});

app.get('/profile/:name', (req, res) => {
  //res.send('This is a Profile page of Mr/Mrs : '+ req.params.name);
  var data = {age:22, job: 'fun', hobbies: ['eating', 'playing', 'sleeping']};
  res.render('profile', {person: req.params.name, data :data});
});
app.listen(3000);