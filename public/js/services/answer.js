'use strict';

// Answer service used for getting users' response
angular.module('mean.designs').factory('Answer', ['$resource', function($resource) {
    return $resource('designs/:designId', {
        designId: '@_id'
    }, {});
}]);