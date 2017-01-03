
angular.module('eventos.controllers', [])

	.controller('HomeController', 
		['$scope', 'tokenFactory', 'eventosFactory', 
		function($scope, tokenFactory, eventosFactory){

			// Negociamos la sesion, y ejecutamos loadEventos como callback.
			tokenFactory.getSession(loadEventos);

			function loadEventos(){
				eventosFactory.getEventos().query(
					function(response){
                    	$scope.listaEventos = response;
                	},
                	function(response){
                	}
                );
			};

			$scope.getUrlDetalle = function(evento){
				if(evento.numbered === true){
					return "#/evento/" + evento.id + "/numerado/";
				}
				return "#/evento/" + evento.id + "/no-numerado/";

			}

	}])

	.controller('EventoController', ['$scope', '$stateParams', function($scope, $stateParams){

	}])

;
