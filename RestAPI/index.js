const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());

const courses = [
  {id : 1, name: "course 1"},
  {id : 2, name: "course 2"},
  {id : 3, name: "course 3"},
  {id : 4, name: "course 4"}
];
app.get('/', (req, res)=>{
  res.send('hello');
});

//Get all courses
app.get('/api/courses', (req, res)=>{
  res.send(courses);
});

//Get a single course
app.get('/api/courses/:id', (req, res)=>{
  const course = courses.find(c=>c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send("Course not found!!");
  res.send(course);
});

//Add course
app.post('/api/courses', (req, res)=>{
  /*const schema = {
    name: Joi.string().min(3).required()
  };
  const result = Joi.validate(req.body,schema);*/
  //console.log(result);
  const result = validateCourse(req.body);
  if(result.error) {
    return res.status(400).send(result.error.details[0].message);
  }
  const course = {
    id: courses.length+1,
    name : req.body.name
  };
  courses.push(course);
  res.send(courses);
});

//Update course
app.put('/api/courses/:id', (req, res)=>{
  const course = courses.find(c=>c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send("Course not found!!");

  //const result = validateCourse(req.body);
  const {error} = validateCourse(req.body);
  if(error) {
    return res.status(400).send(error.details[0].message);
  }

  course.name = req.body.name;

  res.send(course);
});

//Delete course
app.delete('/api/courses/:id', (req, res)=>{
  const course = courses.find(c=>c.id === parseInt(req.params.id));
  if(!course) return res.status(404).send("Course not found!!");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(courses);
});

app.get('/api/:year/:month', (req, res)=>{
  //res.send(req.params);
  res.send(req.query);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required()
  };
  return Joi.validate(course,schema);
}

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to port ${port}`));
