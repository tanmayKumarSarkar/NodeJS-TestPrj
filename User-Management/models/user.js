const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const key = "PrivateKey";

const UserSchema = new Schema({
    name : {
        type: String,
        required: true
    },
    username : {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    }
});

UserSchema.pre('save', function(next){
    let user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(key, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });    
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserByUserName = (username, callback)=>{
    const query = {username: username};
    User.findOne(query, callback);
}

module.exports.comparePassword = (candidatePassword, hash, callback)=>{
    bcrypt.compare(candidatePassword, hash, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
}

// module.exports.findByIdAndUpdate = (id, value, options, (err,user)=>{
//     if(err) throw err;
//     res.json(user);
//   });

