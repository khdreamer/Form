'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Design Schema
 */
var QuestionSchema = new Schema({
    content: {
        type: Schema.ObjectId,
        ref: ''
    }
});

mongoose.model('Question', QuestionSchema);
