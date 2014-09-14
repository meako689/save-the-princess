'use strict';

var User = require('../models/user');
var Step = require('../models/step');
var Challenge = require('../models/challenge');

var UserLibrary = function() {
    return {
        findOrCreate: function (profile, done) {
          User.findOrCreate({
            facebookId:profile.id
          }, function (err, user, created) {
            user.login = profile.id;
            user.name = profile.displayName;
            user.gender = profile.gender;
            user.facebookProfile = profile.profileUrl;
            user.photoUrl = profile.photos[0].value;
            user.save();
            return done(err, user); 
          });
        },

        addAllTheShit: function() { //add all the shit
          //drop all
          console.log('Dropping data');
          User.remove({},function(){
            Challenge.remove({}, function(){
              Step.remove({}, function(){
                insertData()
              });
            });
          });

          var insertData = function insertData() {
              // body...
            var badges = [{title:'strength'},
                          {title:'intellect'},
                          {title:'agility'}];

              var girl1 = new User({
                  name: 'Radistca Cat',
                  gender: 'feemale',
                  photoUrl: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfp1/v/t1.0-1/c18.0.160.160/p160x160/1932275_1474894039392391_1236078164_n.jpg?oh=4c423e8d8dd7379cd0135eab328cc58b&oe=54C8213F&__gda__=1419153586_fd54fcb6e5564d9c2852dcde58417f87',
                  facebookId: '1000061542666',
                  login:'aaa',
              });

              var girl2 = new User({
                  name: 'Vika',
                  gender: 'feemale',
                  photoUrl: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xpf1/v/t1.0-1/c41.0.160.160/p160x160/10157391_736452286407014_7894460211160651227_n.jpg?oh=64d65f93d3f05a400220f996368e2b00&oe=54CFF7BB&__gda__=1418935931_43e10fc7dfc92d2155892a15c58ad9fb',
                  facebookId: '1000061542',
                  login:'bbb',
              });

              //Ignore errors. In this case, the errors will be for duplicate keys as we run this app more than once.
              girl1.save();
              girl2.save();

            var plustwo = new Date();
            plustwo.setHours(plustwo.getHours()+2);

            var c1 = new Challenge({
              babaCreator: girl1._id,
              badges: badges,
              timerStart: plustwo,
            });
            c1.save();

            var c2 = new Challenge({
              babaCreator: girl2._id,
              badges: badges,
              timerStart: plustwo,
            });
            c2.save();

            var step1 = new Step({
              challenge: c1,
              description: "Shave the beaver",
              badge: badges[2],
              timeToComplete: 60*5,//sec
            });
            step1.save();

            var step2 = new Step({
              challenge: c1,
              description: "find the glory",
              badge: badges[1],
              timeToComplete: 60*5,//sec
            });
            step2.save();

            var step3 = new Step({
              challenge: c1,
              description: "make a selfie",
              badge: badges[3],
              timeToComplete: 60*10,//sec
            });
            step3.save();


            var step4 = new Step({
              challenge: c2,
              description: "plant the tree",
              badge: badges[2],
              timeToComplete: 60*5,//sec
            });
            step4.save();

            var step5 = new Step({
              challenge: c2,
              description: "build the house",
              badge: badges[1],
              timeToComplete: 60*5,//sec
            });
            step5.save();

            var step6 = new Step({
              challenge: c2,
              description: "make a selfie",
              badge: badges[3],
              timeToComplete: 60*10,//sec
            });
            step6.save();

            c1.steps.push(step1._id);
            c1.steps.push(step2._id);
            c1.steps.push(step3._id);
            c2.steps.push(step4._id);
            c2.steps.push(step5._id);
            c2.steps.push(step6._id);
            console.log('Bootstrapped default data');
          }

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
