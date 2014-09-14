'use strict';
var FACEBOOK_APP_ID = '1462699280677867';
var FACEBOOK_APP_SECRET ='76d5521fc4a59e5f34f95014ec46f331';
var FACEBOOK_CALLBACK_URL ="/login/fb/callback";

var express = require('express'),
    passport = require('passport'),
    auth = require('../lib/auth'),
    userLib = require('./user')(),
    FacebookStrategy = require('passport-facebook').Strategy,
    db = require('../lib/database');

module.exports = function spec(app) {
    app.on('middleware:after:session', function configPassport(eventargs) {
        //Tell passport to use our newly created local strategy for authentication
        //passport.use(auth.localStrategy());
        //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
        passport.use(new FacebookStrategy({
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: FACEBOOK_CALLBACK_URL,
            enableProof: false,
            profileFields: ['id', 'displayName', 'picture.type(large)','link', 'gender']
          },
          function(accessToken, refreshToken, profile, done) {

            userLib.findOrCreate(profile,function (err, user) {
              return done(err, user);
            });
          }
        ));
        passport.serializeUser(userLib.serialize);
        passport.deserializeUser(userLib.deserialize);
        app.use(passport.initialize());
        app.use(passport.session());
    });
    return {
        onconfig: function(config, next) {

          if (process.env.HEROKU){
            var dbConfig = config.get('databaseConfig').cloud;
            console.log('Using cloud mongo');
          }else{
            var dbConfig = config.get('databaseConfig').local;
            console.log('Using local mongo');
          }
            db.config(dbConfig);
            userLib.addAllTheShit();
            next(null, config);
        }
    };

};
