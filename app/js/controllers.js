
angular.module('eventos.controllers', ['ngAnimate','ui.bootstrap'])

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

			};

	}])

	.controller('EventoNoNumeradoController', 
		['$scope', '$stateParams','$uibModal','$log', '$document', 'tokenFactory','eventosFactory', 
		function($scope, $stateParams, $uibModal, $log, $document, tokenFactory, eventosFactory){

			tokenFactory.getSessionAndCall(cargarDatosEventoNoNumerado);

			function cargarDatosEventoNoNumerado(){
				loadEvento();
				loadTickets();
			}
				
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

			$scope.open = function(evento){
				var modalInstance =	$uibModal.open({
					templateUrl:'templates/seleccionEntradas.html',
					controller : 'SeleccionEntradasController',
					size: 'lg',
					resolve: {
						evento: function(){
							return evento;
						}
					}
				});
			};
	}])

	.controller('SeleccionEntradasController', 
		['$scope','$uibModalInstance', 'evento',
		function($scope, $uibModalInstance, evento){
			$scope.evento = evento;
			
			$scope.range = function(min, max, step) {
				   step = step || 1;
				   var input = [];
				   for (var i = min; i <= max; i += step) {
				       input.push(i);
				   }
				   return input;
				};

			$scope.cancel = function(){
				$uibModalInstance.dismiss('cancel');
			};

			$scope.validarFormulario = function(){
				$uibModalInstance.close();
    		};
	
		}])

	.controller('EventoNumeradoController', 
		['$scope', '$stateParams','tokenFactory','eventosFactory', 
		function($scope, $stateParams, tokenFactory, eventosFactory){

		/*	tokenFactory.getSessionAndCall();
				
			function loadEvento(){
				eventosFactory.getEvento(parseInt($stateParams.id,10)).then(
					function(responseOk){
						$scope.evento = responseOk.data;
					},
					function(responseError){

					});
			}*/

			

		//console.log(parseInt($stateParams.id,10));
		//$scope.evento = eventosFactory.getEvento().get({id:parseInt($stateParams.id,10)});

	}])

;
