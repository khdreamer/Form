'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all design', {
        url: '/design',
        templateUrl: 'views/design/list.html'
    })
      .state('create design', {
        url: '/design/create',
        templateUrl: 'views/design/create.html'
    })
    //   .state('edit design', {
    //     url: '/design/:designId/edit',
    //     templateUrl: 'views/design/edit.html'
    // })
      .state('design by id', {
        url: '/design/:designId',
        templateUrl: 'views/design/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
