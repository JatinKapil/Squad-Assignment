angular.module('squadApp', ['ui.router'])

    .config(function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            // STATES AND VIEWS
            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .state('users', {
                url: '/user/:username',
                templateUrl: 'views/profile.view.html',
                controller: 'ProfileController'
            });

    });
