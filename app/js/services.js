
angular.module('eventos.services', ['ngResource'])

.constant("baseURL","http://frontendtest.entradasatualcance.com/api/v1/")


.factory('tokenFactory', 
	['$http', 'baseURL',
	function($http, baseURL){
		
		var tokenFactory = {};
		tokenFactory.access_token = '';
		tokenFactory.refresh_token = '';


		tokenFactory.hasSession = function(){
			return tokenFactory.refresh_token !== '';
		};

		
		tokenFactory.getSessionAndCall = function(callback){
			
			if(tokenFactory.hasSession()){
				var encodedString = 'refresh_token=' +
            					encodeURIComponent(tokenFactory.refresh_token);

				$http.post(baseURL+'oauth/refresh', 
						encodedString,
						{
							'headers': { 
								"content-type": "application/x-www-form-urlencoded",
							}
						}).then(
				function(responseOk){
					tokenFactory.access_token = responseOk.data.access_token;
					tokenFactory.refresh_token = responseOk.data.refresh_token;
					callback();
				},
				function(responseError){

				});
				return;
			}
			
			var encodedString = 'username=' +
            					encodeURIComponent('lucia') +
            					'&password=' +
            					encodeURIComponent('Prue4ba16');

			$http.post(baseURL+'oauth/token/user', 
						encodedString,
						{
							'headers': { 
								"content-type": "application/x-www-form-urlencoded",
							}
						}).then(
				function(responseOk){
					tokenFactory.access_token = responseOk.data.access_token;
					tokenFactory.refresh_token = responseOk.data.refresh_token;
					callback();
				},
				function(responseError){

				});
		}

		return tokenFactory;
    }
		
])


.factory('eventosFactory', 
	['$http', 'baseURL', 'tokenFactory',
	function($http, baseURL, tokenFactory){

		var eventosFactory = {};

		eventosFactory.getEventos = function(){
			return $http.get(baseURL+'events?access_token=' + tokenFactory.access_token);
		}

		//Obtener detalles eventos
		eventosFactory.getEvento = function(id){
			return $http.get(baseURL+'events/'+id +'?access_token=' + tokenFactory.access_token);
		}

		eventosFactory.getTicketsEvento = function(id){
			return $http.get(baseURL+'events/'+id +'/tickets?access_token=' + tokenFactory.access_token);
		}

		return eventosFactory;
	}
])
;
