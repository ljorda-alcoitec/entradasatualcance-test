
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

	.controller('InformesController', 
				['$scope','tokenFactory','ordersFactory','$filter',
		function($scope, tokenFactory, ordersFactory, $filter){
		
			tokenFactory.getSessionAndCall(loadOrders);

			function loadOrders(){
				ordersFactory.getOrders().then(
					function(responseOk){
						$scope.listaOrders = responseOk.data;
						getArrayEventosOrder();
						obtenerArrayEventosAgrupadosPorId();
					},
					function(responseError){

					});
			};

		function getArrayEventosOrder(){
			
			$scope.listaEventosOrder = [];
			
			angular.forEach($scope.listaOrders, function(lines){
				angular.forEach(lines.lines, function (ticket) {
					if(typeof $scope.listaOrders != "undefined" 
							&& $scope.listaOrders != null 
							&& $scope.listaOrders.length > 0){
							$scope.listaEventosOrder.push({
							id: ticket.ticket.event.id,
							name: ticket.ticket.event.name,
							price: ticket.ticket.price,
							quantity: ticket.quantity,
							date: ticket.ticket.event.date,
							description: ticket.ticket.event.description
						});
					}else{
						console.log("El listado de Orders esta vacio");
					}
				});
			});
		}
		
	}])

	.filter('agruparPorID', function(){
		return _.memoize(function(listadoParaAgrupar){
			var listadoAgrupado = [];
			console.log("He entrado en el filtro");
			angular.forEach(listadoParaAgrupar, function(evento){
				var indice =arrayObjectIndexOf(listadoAgrupado, evento.id);
				if (indice == null){
					listadoAgrupado.push({
						id: evento.id,
						name: evento.name,
						price: evento.price,
						quantity: evento.quantity,
						date: evento.date,
						description: evento.description
					});
				}else{
					listadoAgrupado[indice].quantity += evento.quantity;
				}
			});
			return listadoAgrupado;
		});

		function arrayObjectIndexOf(array, obj){
 			for (var i = 0; i<array.length; i++) {
 				console.log("entro en el for " + i);
      			if (array[i].id === obj) {
      				console.log( "indice i " + i);
        			return i;
     		 	}
			}
			return null;
     	}

	})



				

