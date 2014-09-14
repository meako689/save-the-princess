'use strict';


var ChallengeModel = require('../../models/challenge');
var UserModel = require('../../models/user');
var StepModel = require('../../models/step');




module.exports = function (router) {

    // Challenge API


    router.get('/challenges', function (req, res) {

        ChallengeModel.find().populate("babaCreator").exec(function(err, items){
          res.json(items)
        })
    });


    router.post('/challenge', function (req, res) {

        var item = new ChallengeModel({
          babaCreator: req.user._id,
          badges: req.body.badges
        })

        item.save(function(err, challenge){
          res.json(challenge);
        })
    });


    router.get('/challenge/:id', function (req, res) {
        ChallengeModel.find({_id: req.params.id }).populate("babaCreator").exec(function(err, item){
          res.json(item)
        })
    });

    router.post('/challenge/:id/apply', function (req, res) {
        ChallengeModel.findOne({_id: req.params.id }, function(err, item){

          console.log("acc", item);

          item.members.push(req.user._id);
          item.inProgress = true;

          item.save(function(err, item){
            res.json({item: item});
          })
        })
    });

    router.get('/challenge/male/current', function (req, res) {
        ChallengeModel.find({members: req.user._id, inProgress:true}).populate("steps").exec(function(err, item){
          res.json(item)
        })
    });

    // Steps

    router.get('/steps/:challenge_id', function (req, res) {
        StepModel.find({challenge:req.params.challenge_id}, function(err, items){
          res.json(items)
        })
    });

    router.get('/steps/:id', function (req, res) {
        StepModel.findOne({_id:req.params.id}).populate("challenge").exec(function(err, item){
          res.json(items)
        })
    });

    router.post('/steps/:id/complete', function (req, res) {
        StepModel.findOne({_id:req.params._id}, function(err, item){
          item.answer = req.body.answer;
          item.save();
          res.json(item)
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
