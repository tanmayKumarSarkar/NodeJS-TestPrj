var moviesJSON = require('../movies.json');

exports.home = (req, res)=>{
  var movies = moviesJSON.movies;
  res.render('home', {movies:movies});
};

exports.movie_single = (req, res)=>{
  var episode_number = req.params.episode_number;
  res.send(`Page : ${episode_number}`);
};

exports.notFound = (req, res)=>{
  res.send('Oops! Page Not Found! Please enter the correct URL!')
};
