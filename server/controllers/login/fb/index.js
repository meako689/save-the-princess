'use strict';


var passport = require('passport');


module.exports = function (router) {
    router.get('/', 
        passport.authenticate('facebook'),
        function(req, res){
        // The request will be redirected to Facebook for authentication, so this
        // function will not be called.
        }
    );

    router.post('/', function (req, res) {

    });



};
