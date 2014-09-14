'use strict';
var mongoose = require('mongoose');


var challengeModel = function () {
        var ChallengeSchema = mongoose.Schema({
            babaCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            badges: [{title: String}],
            timerStart: { type: Date, default: Date.now },
            inProgress: Boolean
        });

        return mongoose.model('Challenge', ChallengeSchema);
    };

module.exports = new challengeModel();
