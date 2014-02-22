'use strict';

angular.module('mean.system').controller('HeaderController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.menu = [{
        'title': 'Forms',
        'link': 'design'
    }, {
        'title': 'Design New Form',
        'link': 'design/create'
    }];
    
    $scope.isCollapsed = false;
}]);