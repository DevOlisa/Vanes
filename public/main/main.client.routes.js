angular.module('Main')
.config(['$stateProvider', '$sceDelegateProvider', function($stateProvider, $sceDelegateProvider) {
    $stateProvider

    .state('places', {
        url: '/places',
        templateUrl: './places/views/places-page.html',
        controller: 'PlacesController as placeCtrl'
    })
    .state('weather', {
        url: '/weather',
        templateUrl: './weather/views/weather-page.html',
    })
    .state('events', {
        url: '/events',
        templateUrl: './schedule/views/events-page.html',
        controller: 'EventsController as ec'
    })
    
    $sceDelegateProvider.resourceUrlWhitelist([
        // Allow same origin resource loads.
        'self',
        // Allow loading from our assets domain.  Notice the difference between * and **.
        'https://dev-q8ikmtc2.auth0.com/api/v2/users'
    ]);
}])