'use strict';
var mongoose = require('mongoose');


var stepModel = function () {
        var StepSchema = mongoose.Schema({
            challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
            description: String,
            badge: {title: String},
            timeToComplete: {type: Number, default: 60*30 },//sec
            completed: {type: Boolean, default: false},
            answerPhoto: String,
            answerText: String,
        });

        return mongoose.model('Step', StepSchema);
    };

module.exports = new stepModel();

