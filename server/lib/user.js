'use strict';

var User = require('../models/user');

var UserLibrary = function() {
    return {
        findOrCreate: function (profile, done) {
          console.log(profile);
          User.findOrCreate({
            facebookId:profile.id
          }, function (err, user, created) {
            debugger;
            user.name = profile.displayName;
            user.save();
            return done(err, user); 
          });
        },
        serialize: function(user, done) {
            done(null, user.id);
        },
        deserialize: function(id, done) {
            User.findOne({
                _id: id
            }, function(err, user) {
                done(null, user);
            });
        }
    };
};

module.exports = UserLibrary;
