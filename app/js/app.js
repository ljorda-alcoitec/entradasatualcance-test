'use strict';

angular.module('eventos', ['ui.router', 'ngResource','eventos.controllers', 'eventos.services'])
.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

	.state('app', {
		url:'/',
		views: {
			'header': {
				templateUrl : 'templates/header.html',
			},
			'content': {
				templateUrl : 'templates/home.html',
				controller  : 'HomeController'
			},
			'footer': {
				templateUrl : 'templates/footer.html',
			}
		}
	})

	$urlRouterProvider.otherwise('/');
})
;
