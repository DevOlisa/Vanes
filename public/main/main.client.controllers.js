angular.module('Main')
.controller('MainController', ['$scope', '$q', 'WeatherService', function($scope, $q, WeatherService) {
    var self = this;

    self.currently = {};
    WeatherService.getWeatherReport()
    .then(function(response) {
        self.currently = response;
        console.log(self.currently);

    }, function(error) {
        console.log(error);
    })
}])