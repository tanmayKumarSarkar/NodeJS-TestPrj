//var todos = [{item: 'walk'}, {item: 'run'}, {item: 'eat'}, {item: 'sleep ....'}];
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect DB
mongoose.connect('mongodb://username:password@ds123619.mlab.com:23619/tan-todo');

//schema
var todoSchema = new mongoose.Schema({item: String});

var Todo = mongoose.model('Todo', todoSchema);

/*var itemOne = Todo({item: 'buy flowers'}).save((err)=>{
	if(err) throw err;
	console.log('item saved');
});*/

//urlencodedParser
var uep = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
	
	app.get('/todo', (req, res)=>{
		Todo.find({}, (err,todos)=>{
			if(err) throw err;
			res.render('todo', {todos: todos});
		});
	});

	app.post('/todo', uep, (req, res)=>{
		//todos.push(req.body);
		var newTodo = Todo(req.body).save((err,todos)=>{
		if(err) throw err;
			res.json(todos);
		});
	});

	app.delete('/todo/:item', (req, res)=>{
		/*todos = todos.filter((data)=> {
			return data.item.replace(/ /g, '-') !== req.params.item;
		});*/
		Todo.find({item: req.params.item.replace(/\-/, " ")}).remove((err, todos)=>{
			if(err) throw err;
			res.json(todos);
		});
		/*Todo.find(return {item: req.params.item.replace(/\-/, " ")}).remove((err, todos)=>{
			if(err) throw err;
			res.json(todos);
		});*/
	});
};