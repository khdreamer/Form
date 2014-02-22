'use strict';

// Design routes use designs controller
var designs = require('../controllers/designs');
var authorization = require('./middlewares/authorization');

// Authorization helpers
var hasAuthorization = function(req, res, next) {
	if (req.designs.user.id !== req.user.id) {
        return res.send(401, 'User is not authorized');
    }
    next();
};

module.exports = function(app) {

    app.get('/designs', designs.all);
    app.post('/designs', authorization.requiresLogin, designs.create);
    app.get('/designs/:designId', designs.show);
    app.put('/designs/:designId', authorization.requiresLogin, hasAuthorization, designs.update);
    app.del('/designs/:designId', authorization.requiresLogin, hasAuthorization, designs.destroy);

    // Finish with setting up the designId param
    app.param('designId', designs.design);

};