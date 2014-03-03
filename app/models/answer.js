'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Design Schema
 */
var AnswerSchema = new Schema({
    content: {
        type: Array,
        default: []
    },
    created: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Answer', AnswerSchema);
