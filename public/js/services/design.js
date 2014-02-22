'use strict';

// Design service used for design REST endpoint
angular.module('mean.design').factory('Design', ['$resource', function($resource) {
    return $resource('design/:designId', {
        designId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);