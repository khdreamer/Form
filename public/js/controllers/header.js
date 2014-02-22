'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Forms',
        'link': 'designs'
    }, {
        'title': 'Design New Form',
        'link': 'designs/create'
    }];
    
    $scope.isCollapsed = false;
}]);