var express = require('express');
var bodyParser = require ('body-parser');
var path = require('path');
var http = require('http');
var cors = require('cors');

var app = express();

var api = require('./server/api');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); 
app.use(cors());

//app.use('/dist', express.static('dist'));
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);

app.get('*', (req, res)=>{
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

var port = process.env.PORT || '3000';

app.listen(port, ()=>{
	console.log(`App running on port ${port}`);
});