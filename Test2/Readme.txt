hi there!!tanmay
Node JS Tutorial for Beginners #31 - Making a To-do App (part 1)
MongoDb
https://mlab.com
tanmaykumar1993
tanmay.kr.sarkar@live.com
tanmaykumar1993
Mon@9647160687

https://dashboard.heroku.com/apps
Hero@9647160687

todo-tan (DB)
username
password
mongod —dbpath <data folder> —logpath <log folder> —fork

https://www.youtube.com/watch?v=5e1NEdfs4is
https://www.youtube.com/watch?v=pWbMrx5rVBE&t=182s
//mongoose: https://www.youtube.com/watch?v=swWRUvluSkE&list=PLGquJ_T_JBMQ1C0Pp41sykceli8G1UGtg

----------------------------------------------------------------------------------------------
mongod --directoryperdb --dbpath E:\TANMAY\Softwares\MongoDB\Server\3.6\data\db --logpath E:\TANMAY\Softwares\MongoDB\Server\3.6\log\mongo.log --logappend --install

net start MongoDB

mongo
cls
show dbs
use mycustomers
db
db.createUser({
	user:"username",
	pwd:"password",
	roles:["readWrite", "dbAdmin"]
});

db.createCollection('customers')
show collections
db.customers.insert({first_name:"Tanmay", last_name:"Sarkar"})
db.customers.find().pretty()
db.customers.insert([
	{first_name:"Tanmay", last_name:"Sarkar"},
	{first_name:"John", last_name:"Carter"},
	{first_name:"Steve", last_name:"Smith", gender:"male"}
	])

db.customers.update({_id:ObjectId("5ac10212548e69e987729478")}, {first_name:"Tanmay02", last_name:"K Sarkar"})	
db.customers.update({_id:ObjectId("5ac10212548e69e987729478")}, {$set:{first_name:"Tanmay4"}})	
..... {$inc:{age:5}} // ...... {$unset:{age:1}}  // incriment and usetting values
db.customers.update({first_name:"Mary"}, {first_name:"Mary", last_name:"Samson"}, {upsert: true})	// if not present then insert

db.customers.update({first_name:"Mary"}, {$rename:{"first_name":"f_name"}})
db.customers.remove({first_name:"Tanmay4"}, {justOne:true})

db.customers.find({$or:[{first_name:"Tanmay"}, {first_name:"steve"}]})
db.customers.find({age:{$lt:40}}).pretty() // $gt for greater than sign, $gte, $lte
db.customers.find({"address.city":"Boston"}) 
db.customers.find().sort({last_name:1}).pretty()    // 1 for ascending order // -1 for descending order

db.customers.find().count()

db.customers.find().limit(4)

db.customers.find().forEach(function(entries){print("Cust Name: "+entries.first_name)})
for(var i = 0; i<10; i++) {db.numbSeq.insert({"x":i})}

//relational callback query Example ///////////////////////////////////////
mongoose.model('posts').find({user:req.params.id}, (err, post)=>{
	mongoose.model('posts').populate(post, {path:'user'}, (err, post)=>{
	res.semd(post)
	});
});

var postSchema = new Schema({
	content: String,
	user: {
	type:Schema.ObjectId,
	ref: 'users'
	}
});
///////////////////////////////////////////////////////////////////////////

db.students.find({classes:{$in:['history,'geography']}})              // classes: ['history', 'geography', 'physics']

tanmay.devacc@gmail.com9..87
GMAIL_USER=tanmay.devacc@gmail.com GMAIL_PASS=9..7 nodemon start