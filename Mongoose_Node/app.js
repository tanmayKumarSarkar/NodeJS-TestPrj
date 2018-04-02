var express = require('express');
var mongoose = require('mongoose');
var Book = require('./Book.model');

var port = 3000;

var app = express();

app.use(express.json());

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://username:password@ds127139.mlab.com:27139/bookstore');

app.get('/books', (req, res)=>{
	/*Book.find({},(err, books)=>{
		if(err) throw err;
		res.json(books);
	});*/

	Book.find({})
	.exec()
	.then((books)=>{
		res.json(books);
	})
	.catch((err)=>{
		res.send('error occured');
	});

});

app.get('/books/:id', (req, res)=>{
	Book.findOne({_id:req.params.id}, (err, book)=>{
		if(err) throw err;
		res.json(book);
	});
});

app.post('/book', (req, res)=>{
	var newBook = new Book(req.body);
	newBook.save((err, book)=>{
		if(err) throw err;
		res.json(book);
	});

	/*Book.create(req.body, (err, book)=>{
		if(err) throw err;
		res.json(book);
	});*/
});

app.put('/book/:id', (req, res)=>{
	Book.findOneAndUpdate(
		{_id:req.params.id},
		{$set:{title:req.body.title}},
		{upsert:true},
		(err, book)=>{
			if(err) throw err;
			res.json(book);
		});
});

app.delete('/book/:id', (req, res)=>{
	Book.findOneAndRemove({_id:req.params.id}, (err, book)=>{
		if(err) throw err;
		res.json(book);
	});
});



app.listen(port, ()=>{console.log(`listening to port ${port}`);})
