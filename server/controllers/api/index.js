'use strict';


var ChallengeModel = require('../../models/challenge');



module.exports = function (router) {


    router.get('/challenges', function (req, res) {

        ChallengeModel.find().populate("babaCreator").exec(function(err, items){
          res.json(items)
        })

    });


    router.get('/challenge/:id', function (req, res) {

        ChallengeModel.findOne({_id: req.params.id }).populate("babaCreator").exec(function(err, item){
          res.json(item)
        })

    });

    router.get('/challenge/:id/apply', function (req, res) {
        var body = req.body;

        ChallengeModel.findOne({_id: req.params.id }, function(err, item){
          item.inProgress = true;
          item.members.push(body.guy.id);

          item.save(function(err, item){
            res.json({item: item});
          })
        })

    });



};
