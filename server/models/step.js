'use strict';
var mongoose = require('mongoose');


var stepModel = function () {
        var CtepSchema = mongoose.Schema({
            challenge: { type: mongoose.Schema.Types.ObjectId, ref: 'Challenge' },
            description: String,
            badges: [{title: String}],
            timerStart: { type: Date, default: Date.now },
            timeToComplete: {type: Number, default: 60*30 },//sec
            completed: {type: Boolean, default: False}
        });

        return mongoose.model('Step', StepSchema);
    };

module.exports = new stepModel();

