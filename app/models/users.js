'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String
    },
    username: {
        type: String,
        index: true
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('User', User);
