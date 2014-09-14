/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate');

var userModel = function () {
        var userSchema = mongoose.Schema({
            login: { type: String, unique: true },
            name: String,
            gender: String,
            photoUrl: String,
            facebookProfile:String,
            facebookId: { type: String, unique: true },
            challenge: { type: mongoose.Schema.Types.ObjectId,
                        ref: 'Challenge' },
        });

        userSchema.plugin(findOrCreate);

        return mongoose.model('User', userSchema);
    };

module.exports = new userModel();
