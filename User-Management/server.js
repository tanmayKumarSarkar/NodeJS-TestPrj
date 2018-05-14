const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');

const User = require('./models/user');
const users = require('./routes/api');
// const config = require('./config/database');


mongoose.connect('mongodb://username:password@ds127139.mlab.com:27139/bookstore', (err)=>{
    if(err) throw err;
    else console.log('connected to database');	
});

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

// app.use(passport.initialize());
// require('./config/passport')(passport);

app.use('/api', users);

// app.get('/', (req, res)=>{
// 	res.send('invalid endpoint')
// })



app.get('*', (req, res)=>{
	res.send('res')
  //res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(port, ()=>{
	console.log(`App running on port ${port}`);
});
