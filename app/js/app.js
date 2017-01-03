

angular.module('eventos', ['ui.router', 'ngResource','eventos.controllers', 'eventos.services'])
.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider.state('app', {
		url:'/eventos/',
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
	});

	$stateProvider.state('eventos', {
		url:'/evento/:id/',
		views: {
			'content': {
				templateUrl : 'templates/evento.html',
				controller  : 'EventoController'
			}
		}
	});

	$urlRouterProvider.otherwise('/eventos/');
})
;
