'use strict';

/**
 * @ngdoc overview
 * Main module of the application.
 */
angular
  .module('nvaApp', ['ngCookies', 'ngRoute', 'ui.bootstrap'])
  .config(function($locationProvider, $routeProvider) {
        // close the HTML5 mode to avoid server side url rewriting
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        $routeProvider
            .when('/create_experiment_app', {
                templateUrl: '/nva/admin/app/views/create_experiment.html',
                controller: 'CreateExperimentController',
                controllerAs: 'ceCtrl'
            })
            .when('/create_variance_app', {
                templateUrl: '/nva/admin/app/views/create_variance.html',
                controller: 'CreateVarianceController',
                controllerAs: 'cvCtrl'
            })
            .when('/view_experiment_app', {
                templateUrl: '/nva/admin/app/views/view_edit_experiment.html',
                controller: 'ViewEditExperimentController',
                controllerAs: 'veCtrl'
            })
            .when('/edit_variance_app', {
                templateUrl: '/nva/admin/app/views/edit_variance.html',
                controller: 'EditVarianceController',
                controllerAs: 'evCtrl'
            })
            .when('/search_experiment_app', {
                templateUrl: '/nva/admin/app/views/search_experiment.html',
                controller: 'SearchExperimentControl',
                controllerAs: 'seCtrl'
            })
            .otherwise({
                redirectTo: '/search_experiment_app'
            });
    });