'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Design Schema
 */
var DesignSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    form_name: {
        type: String,
        default: "New Form"
    },
    pages: {
        type: Array,
        default: []  
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    answers: {
        type: Array,
        default: []
    }
});

/**
 * Validations
 */
DesignSchema.path('form_name').validate(function(form_name) {
    return form_name.length;
}, 'Title cannot be blank');

/**
 * Statics
 */
DesignSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Design', DesignSchema);
