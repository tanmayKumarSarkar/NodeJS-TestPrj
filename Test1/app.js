var express = require('express');
var Joi = require('joi');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

//Global vars
// app.use((req, res, next)=>{
//   res.locals.error = null;
//   next();
// });

var customers = [
  {
    id:1,
    f_name: "Ram",
    l_name: "Das",
    email:"ram.das@gmail.com"
  },
  {
    id:2,
    f_name: "Sam",
    l_name: "Das",
    email:"sam.das@gmail.com"
  },
  {
    id:3,
    f_name: "John",
    l_name: "Doe",
    email:"john.doe@gmail.com"
  }
];

app.get('/', (req, res)=>{
  res.render('index',{customers:customers});
});

app.post('/users/add', (req, res)=>{
  var {error} = userValidator(req.body);
  console.log(error);
  if(error) return res.render('index',{error: error.details, customers:customers}).status(400);
  var user = createUser(req);
  customers.push(user);
  //res.json(user);
  res.redirect('/');
  //res.render('index',{customers:customers});
});

app.delete('/users/delete/:id', (req, res)=>{
  var user = customers.find(c=>c.id === parseInt(req.params.id));
  var index = customers.indexOf(user);
  customers.splice(index, 1);
  res.redirect('/');
  //res.json(user);
  //res.render('index',{customers:customers});
});

function userValidator(user){
  var userStruc = {
    f_name: Joi.string().min(3).required(),
    l_name: Joi.string().min(3).required(),
    email: Joi.string().min(3).regex(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/).required()
  };
  return Joi.validate(user, userStruc, {abortEarly: false});
}

function createUser(req){
  var hVal = 0;
  customers.forEach((cust)=>{
    if(cust.id>hVal) hVal = cust.id;
  });
  hVal = hVal+1;
  console.log(hVal);
  var user = {
    id : hVal,
    f_name : req.body.f_name,
    l_name : req.body.l_name,
    email : req.body.email
  }
  return user;
}

var port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to port ${port}`));
