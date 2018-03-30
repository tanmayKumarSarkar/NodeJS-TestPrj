var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  book: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  pages: {
    type: String,
  },
  image_url: {
    type: String,
  },
  buy_url: {
    type: String,
  }
});

var Book = module.exports = mongoose.model('books', bookSchema);

module.exports.getBooks= function(callback, limit){
  Book.find(callback).limit(limit);
}

module.exports.getBookById = function(id,callback){
  //Book.findById(id, callback);
  Book.find({_id : id}, callback);
}

module.exports.addBook = function(book, callback){
  Book.create(book, callback);
}

module.exports.updateBook = function(id, book, callback){
  var condition = {_id: id};
  var options = {};
  Book.update(condition, {$set : book}, options, callback);
}

module.exports.deletebook = function(id, callback){
  var condition = {_id: id};
  book.remove(condition, callback);
}
