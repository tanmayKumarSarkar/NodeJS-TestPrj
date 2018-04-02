var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookSchema = new Schema({
	title: String,
	author: String,
	category: String
});

module.exports = mongoose.model('books', BookSchema);






/*var BookSchema = new Schema({
	title: String,
	publish:{
		type: Date,
		default: Date.now,
		required: true // unique:true
	},
	keywords: Array,
	published: Boolean,
	author: {
		type: Schema.ObjectId, // Schema.Type.ObjectId
		ref:'User'
	},
	//Embeded sub-document
	detail:{
		modelNumber: Number,
		hardcover: Boolean,
		reviewes: Number,
		rank: Number
	}
})*/