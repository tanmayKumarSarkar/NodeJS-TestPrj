const express = require('express');
const router = express.Router();
// const passport = require('passport');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const key = "PrivateKey";

router.post('/users', (req, res)=>{
	let user = new User({
		name: req.body.name,
		username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });
    if(validateRegister(user)){
        //console.log(user);
        user.save((err, callback)=>{
            if (err) {
                if(err.message.includes('duplicate')) 
                    res.json({success: false, msg: 'User already registered, please try new one'});
                else res.json({success: false, msg: 'Failed to register user, please try again'});    
            }
            else res.json({success: true, msg: 'User Rgistered Successfully'});
        });  
    }else res.json({success: false, msg: 'Insert all the valid fileds'});
});

router.post('/login', (req, res)=>{
	let user = new User({
		username: req.body.username,
        password: req.body.password
    });
    console.log(user);
     if(user.username == undefined || user.username =="" || user.password == undefined || user.password == ""){
        res.json({success: false, msg: 'Insert all the valid fileds'});
    }else {
        User.getUserByUserName(user.username, (err, userX)=>{
            if(err) throw err;
            if(!userX) {
                return res.json({success: false, msg: 'User Not Found'});
            }
            User.comparePassword(user.password, userX.password, (err, isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    const token = jwt.sign({userX}, key, {expiresIn: 604800}, (err, token)=>{
                        res.json({
                            success: true,
                            token: 'JWT '+token,
                            user:{
                                id : userX._id,
                                name: userX.name,
                                username: userX.username,
                                email: userX.email
                            }
                        });
                    });                    
                }else{
                    return res.json({success: false, msg: 'Wrong Password'});
                }
            });
        });
    } 
});     // End of the login post

router.post('/profile', verifyToken, (req, res)=>{
    jwt.verify(req.token, key, (err, authData)=>{
        if(err) res.status(403).json({success: false, msg: "Token Invalid"});
        else res.json({success: true, msg: "Token Verified", user: authData.userX});
    });
});


//functions
function verifyToken(req, res, next){
    const tokenHeader = req.headers['authorization'];
    if(tokenHeader != undefined) {
        req.token = tokenHeader;
    }else{
        res.status(403).json({success: false, msg: "No Auth Heared Found"});
    }
    next();
}

validateRegister = (user)=>{
    if(user.name == undefined || user.username == undefined || user.email == undefined || user.password == undefined || !validateEmail(user.email) ){
      return false;
    }else{
      return true;
    }
};

validateEmail = (email)=>{
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

module.exports = router;