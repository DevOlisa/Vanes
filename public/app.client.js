angular.module('Vane', ['ui.router', 'ngAnimate',
    'ngSanitize', 'ngResource', 'Main', 'Places', 'Weather'])
    .run(['LocationService', 'WeatherService', function (LocationService, WeatherService) {
        if (window.navigator.geolocation) {
            if (LocationService.personal) {
                LocationService.latitude = 10.5132588;
                LocationService.longitude = 7.4376231;
            } else {
                window.navigator.geolocation
                .getCurrentPosition(
                    LocationService.saveCoordinates,
                    LocationService.handleError,
                    LocationService.options);
            }
        } else {
            alert("Browser doesn't support geolocation");
        }
    }])
    .config([
        '$stateProvider',
        '$locationProvider',
        function (
            $stateProvider,
            $locationProvider) {
            var AUTH0_CLIENT_ID = '0vY23DZFjen2aUzWrgFsc13yepS0S55j';
            var AUTH0_DOMAIN = 'dev-q8ikmtc2.auth0.com';
            var AUTH0_CALLBACK_URL = 'http://localhost:3000/callback';

            $stateProvider
                .state('callback', {
                    url: '/callback',
                    templateUrl: 'app/callback/callback.html',
                    controllerAs: 'vm'
                });

            // // Initialization for the angular-auth0 library
            // angularAuth0Provider.init({
            //     clientID: '0vY23DZFjen2aUzWrgFsc13yepS0S55j',
            //     domain: 'dev-q8ikmtc2.auth0.com',
            //     responseType: 'token id_token',
            //     redirectUri: 'http://localhost:3000/',
            //     scope: 'openid'
            // });

            // $urlRouterProvider.otherwise('/');

            $locationProvider.hashPrefix('!');

            /// Comment out the line below to run the app
            // without HTML5 mode (will use hashes in routes)
        }])