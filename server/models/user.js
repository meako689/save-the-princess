/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate');

var userModel = function () {

        var userSchema = mongoose.Schema({
            name: String,
            photoUrl: String,
            facebookId: { type: String, unique: true },
        });

        userSchema.plugin(findOrCreate);


        return mongoose.model('User', userSchema);
    };

module.exports = new userModel();
