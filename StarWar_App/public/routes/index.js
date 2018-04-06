exports.home = (req, res)=>{
  res.render('home');
};

exports.home2 = (req, res)=>{
  res.render('home');
};

exports.movie_single = (req, res)=>{
  var episode_number = req.params.episode_number;
};

exports.notFound = (req, res)=>{
  res.send('Oops! Page Not Found! Please enter the correct URL!')
};
