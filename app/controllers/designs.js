'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Design = mongoose.model('Design'),
    Page = mongoose.model('Page'),
    Block = mongoose.model('Block'),
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
    console.log("create:" + req.body);

    var pages = [];
    for(var i = 0; i < req.body.pages.length; i++){
        var p = req.body.pages[i];
        var blocks = [];
        for(var j = 0; j < p.blocks.length; j++){

            var block = new Block(p.blocks[j]);
            block.sel_options = p.blocks[j].options;
            blocks.push(block);

        }
        var page = new Page();
        page.blocks = blocks;
        page.title = p.title;
        pages.push(page);
    }

    var design = new Design();
    design.created = req.created;
    design.user = req.user;
    design.pages = pages;

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

    console.log("update: " + JSON.stringify(req.body) );
    // console.log("update from " + req.design + "to " + design);

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
            console.log("after destroy: " + design);
            res.jsonp(design);
        }
    });
};

/**
 * Show an design
 */
exports.show = function(req, res) {
    console.log("show: " + req.design);
    res.jsonp(req.design);
};

/**
 * List of Designs
 */
exports.all = function(req, res) {
    console.log("all");
    console.log(req.params);
    Design.find().sort('-created').populate('user', 'name username').exec(function(err, designs) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            console.log(designs);
            res.jsonp(designs);
        }
    });
};
