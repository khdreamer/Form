'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Design = mongoose.model('Design'),
    _ = require('lodash');


/**
 * Find design by id
 */
exports.design = function(req, res, next, id) {
    Design.load(id, function(err, design) {
        if (err) return next(err);
        if (!design) return next(new Error('Failed to load design ' + id));
        req.design = design;
        next();
    });
};

/**
 * Create an design
 */
exports.create = function(req, res) {
    var design = new Design(req.body);
    design.user = req.user;

    design.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                design: design
            });
        } else {
            res.jsonp(design);
        }
    });
};

/**
 * Update an design
 */
exports.update = function(req, res) {
    var design = req.design;

    design = _.extend(design, req.body);

    design.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                design: design
            });
        } else {
            res.jsonp(design);
        }
    });
};

/**
 * Delete an design
 */
exports.destroy = function(req, res) {
    var design = req.design;

    design.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                design: design
            });
        } else {
            res.jsonp(design);
        }
    });
};

/**
 * Show an design
 */
exports.show = function(req, res) {
    res.jsonp(req.design);
};

/**
 * List of Designs
 */
exports.all = function(req, res) {
    Design.find().sort('-created').populate('user', 'name username').exec(function(err, designs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(designs);
        }
    });
};
