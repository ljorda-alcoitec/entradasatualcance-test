
angular.module('eventos.controllers', [])

	.controller('HomeController', 
		['$scope', 'tokenFactory', 'eventosFactory', 
		function($scope, tokenFactory, eventosFactory){

			// Pedimos el token.
			tokenFactory.getSession().then(
				function(responseOk){
					// cuando tenemos el token
					// llamamos a pedir eventos
					pedirEventos(responseOk.data.access_token);
				},
				function(responseError){

				}

			);

			function pedirEventos(access_token){
				eventosFactory.getEventos(access_token).query(
					function(response){
                    	$scope.listaEventos = response;
                	},
                	function(response){
                	}
                );
			}

	}])

;
