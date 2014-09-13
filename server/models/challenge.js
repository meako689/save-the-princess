/**
 * A model for our user
 */
'use strict';
var mongoose = require('mongoose');


var challengeModel = function () {

        var ChallengeSchema = mongoose.Schema({
            babaCreator: { type: Schema.Types.ObjectId, ref: 'User' }
            badges: [{title: String}],
            timerStart: { type: Date, default: Date.now },
            inProgress: Boolean
        });

        userSchema.plugin(findOrCreate);


        return mongoose.model('Challenge', challengeSchema);
    };

module.exports = new challengeModel();
