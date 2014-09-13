'use strict';


var IndexModel = require('../models/index'),
    ProfileModel = require('../models/profile'),
    auth = require('../lib/auth');


module.exports = function (router) {

    var indexmodel = new IndexModel();
    var profilemodel = new ProfileModel();


    router.get('/', function (req, res) {
        res.render('index', indexmodel);
    });


    router.get('/profile', function(req, res) {
        res.render('profile', profilemodel);
    });

    /**
     * Allow the users to log out
     */
    router.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};
