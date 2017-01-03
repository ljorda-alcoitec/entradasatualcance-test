

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

	$stateProvider.state('eventoNumerado', {
		url:'/evento/:id/numerado/',
		views: {
			'content': {
				templateUrl : 'templates/eventoNumerado.html',
				controller  : 'EventoNumeradoController'
			}
		}
	});

	$stateProvider.state('eventoNoNumerado', {
		url:'/evento/:id/no-numerado/',
		views: {
			'content': {
				templateUrl : 'templates/eventoNoNumerado.html',
				controller  : 'EventoNoNumeradoController'
			}
		}
	});

	$urlRouterProvider.otherwise('/eventos/');
})
;
