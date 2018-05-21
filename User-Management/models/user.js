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
    },
    active : {
        type: Boolean,
        required: true,
        default: false
    },
    temptoken : {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function(next){
    let user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
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
        if(err) console.log(err);
        callback(null, isMatch);
    });
}

// module.exports.findByIdAndUpdate = (id, value, options, (err,user)=>{
//     if(err) throw err;
//     res.json(user);
//   });

