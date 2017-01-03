
angular.module('eventos.controllers', [])

	.controller('HomeController', 
		['$scope', 'tokenFactory', 'eventosFactory', 
		function($scope, tokenFactory, eventosFactory){

			// Negociamos la sesion, y ejecutamos loadEventos como callback.
			tokenFactory.getSessionAndCall(loadEventos);

			function loadEventos(){
				eventosFactory.getEventos().then(
					function(responseOk){
						$scope.listaEventos = responseOk.data;
					},
					function(responseError){

					});
			};

			$scope.getUrlDetalle = function(evento){
				if(evento.numbered === true){
					return "#/evento/" + evento.id + "/numerado/";
				}
				return "#/evento/" + evento.id + "/no-numerado/";

			}

	}])

	.controller('EventoNoNumeradoController', 
		['$scope', '$stateParams','tokenFactory','eventosFactory', 
		function($scope, $stateParams, tokenFactory, eventosFactory){

			tokenFactory.getSessionAndCall(loadTickets, loadEvento);
				
			function loadEvento(){
				eventosFactory.getEvento(parseInt($stateParams.id,10)).then(
					function(responseOk){
						$scope.evento = responseOk.data;
					},
					function(responseError){

					});
			}

			function loadTickets(){
				eventosFactory.getTicketsEvento(parseInt($stateParams.id,10)).then(
					function(responseOk){
						$scope.ticketsEvento = responseOk.data;
					},
					function(responseError){

					});
			}
	}])

	.controller('EventoNumeradoController', 
		['$scope', '$stateParams','tokenFactory','eventosFactory', 
		function($scope, $stateParams, tokenFactory, eventosFactory){

			tokenFactory.getSessionAndCall();
				
			function loadEvento(){
				eventosFactory.getEvento(parseInt($stateParams.id,10)).then(
					function(responseOk){
						$scope.evento = responseOk.data;
					},
					function(responseError){

					});
			}

			

		//console.log(parseInt($stateParams.id,10));
		//$scope.evento = eventosFactory.getEvento().get({id:parseInt($stateParams.id,10)});

	}])

;
