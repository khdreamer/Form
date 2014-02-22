'use strict';

// Design routes use design controller
var design = require('../controllers/design');
var authorization = require('./middlewares/authorization');

// Authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.article.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/design', design.all);
    app.post('/design', authorization.requiresLogin, design.create);
    app.get('/design/:designId', design.show);
    app.put('/design/:designId', authorization.requiresLogin, hasAuthorization, design.update);
    app.del('/design/:designId', authorization.requiresLogin, hasAuthorization, design.destroy);

    // Finish with setting up the designId param
    app.param('designId', design.design);

};