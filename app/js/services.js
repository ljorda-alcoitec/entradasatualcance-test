
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

		
		tokenFactory.getSession = function(callBackFunction){
			
			if(tokenFactory.hasSession()){
				var encodedString = 'refresh_token=' +
            					encodeURIComponent(tokenFactory.refresh_token);

				$http.post(baseURL+'oauth/token/refresh', 
						encodedString,
						{
							'headers': { 
								"content-type": "application/x-www-form-urlencoded",
							}
						}).then(
				function(responseOk){
					tokenFactory.access_token = responseOk.data.access_token;
					tokenFactory.refresh_token = responseOk.data.refresh_token;
					callBackFunction();
				},
				function(responseError){

				});
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
					callBackFunction();
				},
				function(responseError){

				});
		}

		return tokenFactory;
    }
		
])


.factory('eventosFactory', 
	['$resource', 'baseURL', 'tokenFactory',
	function($resource, baseURL, tokenFactory){

		var eventosFactory = {};

		eventosFactory.getEventos = function(){
			return $resource(baseURL+'events?access_token=' + tokenFactory.access_token);
		}

		return eventosFactory;
	}
])
;
