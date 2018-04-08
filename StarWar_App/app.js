var express = require('express');
var routes = require('./routes');
//var path = require('path');

var app = express();

app.set('view engine', 'ejs');

//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'));

app.get('/', routes.home);

app.get('/star_wars_episode/:episode_number', routes.movie_single);

app.get('*', routes.notFound);

app.listen(process.env.PORT || 3000, ()=>{
  console.log(`Application is running on port 3000`);
});
