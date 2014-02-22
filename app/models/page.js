'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Design Schema
 */
var PageSchema = new Schema({
    title: {
        type: String,
        default: ""
    },
    blocks: {
        type: Array,
        default: []
    }
});

var BlockSchema = new Schema({
    type: {
        type: String,
        default: ""
    },
    question: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    sel_options: {
        type: Array,
        default: []
    }

});

mongoose.model('Page', PageSchema);
mongoose.model('Block', BlockSchema);
