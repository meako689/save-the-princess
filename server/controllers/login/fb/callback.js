'use strict';


var User = require('../../../models/user'),
 passport = require('passport');


module.exports = function (router) {

    var model = new User();


    /**
     * Display the login page. We also want to display any error messages that result from a failed login attempt.
     */
    router.get('/', 
      passport.authenticate('facebook', { failureRedirect: '/' }),
      function(req, res) {
        res.redirect('/app/');
    });
    /**
     * Receive the login credentials and authenticate.
     * Successful authentications will go to /profile or if the user was trying to access a secured resource, the URL
     * that was originally requested.
     *
     * Failed authentications will go back to the login page with a helpful error message to be displayed.
     */
    router.post('/', function (req, res) {

        passport.authenticate('local', {
            successRedirect: req.session.goingTo || '/profile',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res);

    });



};
