angular.module('Main')
    .controller('MainController', ['$scope', '$interval', 'WeatherService', 
    function ($scope, $interval, WeatherService) {
        var self = this;
        $scope.showSettings = false;
        $scope.selected = WeatherService.currently;

        self.toggleSettingsPane = function () {
            $scope.showSettings = !$scope.showSettings;
        };

        self.saveSettings = function () {
            $scope.showSettings = false;
        }
        
        var updateTime = function () {
            $interval(function () {
                $scope.currentTime = moment({}).format('MMMM DD, LT');
            }, 1000)
        }

        self.setCurrentWeather = function () {
            let now = new Date(),
            cardTime = new Date($scope.weatherData.time);
        };

        // Default temperature filter
        self.unitFilter = 'F';

        var init = function (fetchFromAPi = null) {
            WeatherService.setCurrentWeather();
            self.hourly = WeatherService.hourly;
            self.timezone = WeatherService.timezone;
            $scope.selected = WeatherService.getForecast($scope.currentTime);
            updateTime();
        };

        init();
    }])
    .controller('SettingsController', ['$scope', function ($scope) {

    }])