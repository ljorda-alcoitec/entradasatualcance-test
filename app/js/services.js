
angular.module('eventos.services', ['ngResource'])

.constant("baseURL","http://frontendtest.entradasatualcance.com/api/v1/")


.factory('tokenFactory', 
	['$http', 'baseURL',
	function($http, baseURL){
		
		var tokenFactory = {};
		tokenFactory.refresh_token = '';


		tokenFactory.hasSession = function(){
			return tokenFactory.refresh_token !== '';
		};

		/*
		var refresh_token = $rootScope.refresh_token;

		if(refresh_token !== null){
			// Llamar a refresh, y guardamos access_token y refresh_token en rootscope
			//var datosSesion = $resource(baseURL + "oauth/refresh");

			//$rootScope.refresh_token = 	datosSesion.refresh_token;
			//$rootScope.access_token = 	datosSesion.access_token;
			return;
		}
		*/
		
		tokenFactory.getSession = function(callBackOk, callBackError){
			
			if(tokenFactory.hasSession()){
				var encodedString = 'username=' +
            					encodeURIComponent('lucia') +
            					'&password=' +
            					encodeURIComponent('Prue4ba16');

				return $http.post(baseURL+'oauth/token/refresh', 
						encodedString,
						{
							'headers': { 
								"content-type": "application/x-www-form-urlencoded",
							}
						});
			}
			
			var encodedString = 'username=' +
            					encodeURIComponent('lucia') +
            					'&password=' +
            					encodeURIComponent('Prue4ba16');

			return $http.post(baseURL+'oauth/token/user', 
						encodedString,
						{
							'headers': { 
								"content-type": "application/x-www-form-urlencoded",
							}
						});
		}

		return tokenFactory;
    }
		
])


.factory('eventosFactory', 
	['$resource', 'baseURL', 'tokenFactory',
	function($resource, baseURL, tokenFactory){

		var eventosFactory = {};

		eventosFactory.getEventos = function(access_token){
			return $resource(baseURL+'events?access_token=' + access_token);
		}

		return eventosFactory;
	}
])
;
