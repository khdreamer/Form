'use strict';

// Design service used for design REST endpoint
angular.module('mean.designs').factory('Designs', ['$resource', function($resource) {
    return $resource('designs/:designId', {
        designId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);