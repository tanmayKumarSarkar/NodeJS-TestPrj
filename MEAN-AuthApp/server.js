const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const users = require('./routes/users');
const config = require('./config/database');


mongoose.connect(config.database);
mongoose.connection.on('connected', ()=>{
	console.log('connected to database');	
});
mongoose.connection.on('error', (err)=>{
	console.log('Database Error', err);	
});
const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use(passport.initialize());
require('./config/passport')(passport);

app.use('/users', users);

app.get('/', (req, res)=>{
	res.send('invalid endpoint')
})
app.get('*', (req, res)=>{
	res.send('res')
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.listen(port, ()=>{
	console.log(`App running on port ${port}`);
});
