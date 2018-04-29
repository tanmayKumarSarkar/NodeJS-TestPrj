var mongoose = require('mongoose');

var genreSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  create_date:{
    type: Date,
    default: Date.now
  }
});

var Genre = module.exports = mongoose.model('genres', genreSchema);

module.exports.getGenres= function(callback, limit){
  Genre.find(callback).limit(limit);
}

module.exports.addGenre = function(genre, callback){
  Genre.create(genre, callback);
}

module.exports.updateGenre = function(id, genre, callback){
  var condition = {_id: id};
  var options = {};
  Genre.update(condition, genre, options, callback);
}

module.exports.deleteGenre = function(id, callback){
  var condition = {_id: id};
  Genre.remove(condition, callback);
}
