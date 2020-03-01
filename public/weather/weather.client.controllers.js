angular.module('Weather')
    .controller('WeatherController', ['$scope', '$timeout', 'WeatherService', function ($scope, $timeout, WeatherService) {
        $scope.info = [1, 2, 3, 4, 5];
        WeatherService.setCurrentWeather();
        var self = this;
        $scope.$parent.weatherData = WeatherService;


        // console.log($scope.current)
    }])