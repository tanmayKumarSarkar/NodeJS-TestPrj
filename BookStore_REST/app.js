var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Genre = require('./models/genres');
var Book = require('./models/book');

var app = express();

app.use(express.json());

mongoose.connect('mongodb://username:password@ds127139.mlab.com:27139/bookstore');
var db = mongoose.connection;

app.get('/', (req, res)=>{
  res.send('Please use /api/books or /api/genres');
});

app.get('/api/genres', (req, res)=>{
  Genre.getGenres((err,genres)=>{
    if(err) throw err;
    res.json(genres);
  });
});

app.post('/api/genres', (req, res)=>{
  var genre = req.body;
  Genre.addGenre(genre, (err,genre)=>{
    if(err) throw err;
    res.json(genre);
  });
});

app.put('/api/genres/:id', (req, res)=>{
  var id = req.params.id;
  var genre = req.body;
  Genre.updateGenre(id, genre, (err,genre)=>{
    if(err) throw err;
    res.json(genre);
  });
});

app.delete('/api/genres/:id', (req, res)=>{
  var id = req.params.id;
  Genre.deleteGenre(id, (err,genre)=>{
    if(err) throw err;
    res.json(genre);
  });
});

app.get('/api/books', (req, res)=>{
  Book.getBooks((err,books)=>{
    if(err) throw err;
    res.json(books);
  });
});

app.get('/api/books/:id', (req, res)=>{
  Book.getBookById(req.params.id, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

app.post('/api/books', (req, res)=>{
  var book = req.body;
  Book.addBook(book, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

app.put('/api/books/:id', (req, res)=>{
  var id = req.params.id;
  var book = req.body;
  Book.updateBook(id, book, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

app.delete('/api/books/:id', (req, res)=>{
  var id = req.params.id;
  Book.deletebook(id, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log(`listening to port ${port}`));
