'use strict';

//Setting up route
angular.module('mean').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('all designs', {
        url: '/designs',
        templateUrl: 'views/designs/list.html'
    })
      .state('create design', {
        url: '/designs/create',
        templateUrl: 'views/designs/create.html'
    })
      .state('edit designs', {
        url: '/designs/:designId/edit',
        templateUrl: 'views/designs/edit.html'
    })
      .state('view responses', {
        url: '/designs/:designId/response',
        templateUrl: 'views/designs/response.html'
    })
      .state('design by id', {
        url: '/designs/:designId',
        templateUrl: 'views/designs/view.html'
    })
      .state('home', {
        url: '/',
        templateUrl: 'views/index.html'
    })
      .state('thank you', {
        url: '/thank',
        templateUrl: 'views/designs/thank.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('mean').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
}
]);
