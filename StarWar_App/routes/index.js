var moviesJSON = require('../movies.json');

var movies = moviesJSON.movies;

exports.home = (req, res)=>{
  
  res.render('home', {movies:movies});
};

exports.movie_single = (req, res)=>{
  var episode_number = req.params.episode_number;
  var movies = moviesJSON.movies;

  var movie = movies.find(item => item.episode_number === episode_number);
  console.log(movie);
  if(typeof movie != 'undefined'){
  	res.render('movie_single', {movies:movies, movie:movie});
  }else{
  	res.render('notFound', {movies:movies});
  }
  
};

exports.notFound = (req, res)=>{
  res.render('notFound', {movies:movies});
};
