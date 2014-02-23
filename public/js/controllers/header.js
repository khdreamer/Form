'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'All Forms',
        'link': 'designs'
    }, {
        'title': 'Create New Form',
        'link': 'designs/create'
    }];
    
    $scope.isCollapsed = false;
}]);