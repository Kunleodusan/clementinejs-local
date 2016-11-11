'use strict';

var LocalStrategy = require('passport-local').Strategy;

var userController = require('../controllers/userController.server.js');
var userCtrl = new userController();


module.exports = function (passport) {
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		userCtrl.getUserById(id, function (err, user) {
			done(err, user);
		});
	});


	// Local Strategy
	passport.use(new LocalStrategy(
	  function(username, password, done) {
	    userCtrl.getUserByUsername(username, function (err, user){
	        if(err) throw err;

	        if(!user) {
	            return done(null, false, {message: 'User not found'});
	        }

	        userCtrl.comparePassword(password, user.password, 
	        	function (err, isMatch) {
		            if(err) throw err;
		            if(isMatch) {
		                return done(null, user);
		            } else {
		                return done(null, false, { message: 'Invalid password'});
		            }
	        	}
	        );
    	}); 
  }));

};
