var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Genre = require('./models/genres');
var Book = require('./models/book');

mongoose.connect('mongodb://username:password@ds127139.mlab.com:27139/bookstore');
var db = mongoose.connection;

/*mongoose.connection.on('connected', ()=>{
	console.log(database connected);
});*/

///// Starting api routing

router.get('/genres', (req, res)=>{
  Genre.getGenres((err,genres)=>{
    if(err) throw err;
    res.json(genres);
  });
});

router.post('/genres', (req, res)=>{
  var genre = req.body;
  Genre.addGenre(genre, (err,genre)=>{
    if(err) throw err;
    res.json(genre);
  });
});

router.put('/genres/:id', (req, res)=>{
  var id = req.params.id;
  var genre = req.body;
  Genre.updateGenre(id, genre, (err,genre)=>{
    if(err) throw err;
    res.json(genre);
  });
});

router.delete('/genres/:id', (req, res)=>{
  var id = req.params.id;
  Genre.deleteGenre(id, (err,genre)=>{
    if(err) throw err;
    res.json(genre);
  });
});

router.get('/books', (req, res)=>{
  Book.getBooks((err,books)=>{
    if(err) throw err;
    res.json(books);
  });
});

router.get('/books/:id', (req, res)=>{
  Book.getBookById(req.params.id, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

router.post('/books', (req, res)=>{
  var book = req.body;
  Book.addBook(book, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

router.put('/books/:id', (req, res)=>{
  var id = req.params.id;
  var book = req.body;
  Book.updateBook(id, book, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

router.delete('/books/:id', (req, res)=>{
  var id = req.params.id;
  Book.deletebook(id, (err,book)=>{
    if(err) throw err;
    res.json(book);
  });
});

//// Ending api routing

let response = {
	status : 200,
	message: null,
	data: []
}

var sendError = (err, res)=> {
	response.status = 501;
	response.message = typeof err == "object" ? err.message : err;
	res.status(501).json(response);
}

module.exports = router ;