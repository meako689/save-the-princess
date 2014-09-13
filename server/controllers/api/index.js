'use strict';


var ChallengeModel = require('../../models/challenge');
var UserModel = require('../../models/user');




module.exports = function (router) {

    // Challenge API


    router.get('/challenges', function (req, res) {

        ChallengeModel.find().populate("babaCreator").exec(function(err, items){
          res.json(items)
        })
    });


    router.get('/challenge/:id', function (req, res) {

        var item = new ChallengeModel({
          babaCreator: req.user._id,
          badges: req.body.badges
        })

        item.save(function(err, challenge){
          res.json(challenge);
        })
    });


    router.post('/challenge/:id', function (req, res) {

        ChallengeModel.find({_id: req.params.id }).populate("babaCreator").exec(function(err, item){
          res.json(item)
        })
    });


    router.get('/challenge/:id/apply', function (req, res) {

        ChallengeModel.findOne({_id: req.params.id }, function(err, item){
          item.inProgress = true;
          item.members.push(req.user._id);

          item.save(function(err, item){
            res.json({item: item});
          })
        })
    });

    // User API

    router.get('/user', function (req, res) {
      if(!req.user){
        res.redirect("/");
      }
      res.json(req.user);
    });


};
