angular.module('Main')
    .controller('MainController', ['$scope', '$interval', 'WeatherService',
        function ($scope, $interval, WeatherService) {
            var self = this;
            $scope.showSettings = false;

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
            };

            self.getOfflineData = function () {
                    try {
                        var offlineData = WeatherService.getLocalWeatherData();
                        self.hourly = offlineData.hourly;
                        self.timezone = offlineData.timezone;
                        $scope.selected = WeatherService.getForecast($scope.currentTime);
                        console.log("From offline storage");
                    } catch (error) {
                        // throw new Error(error);

                        console.error(error);
                    }
            };

            self.setCurrentWeather = function () {
                if (navigator.onLine) {
                WeatherService.getWeatherReport()
                    .then(function (response) {
                        if (typeof response !== "object") throw new Error('Error receiving data from darksky.net');
                        console.log("From darksky.net api");
                        console.log(response.data);
                        response.data.hourly.data.map(function (data) {
                            data.time *= 1000;
                            data.hour = new Date(data.time).getHours();
                        });
                        WeatherService.saveWeatherData(response.data);
                        self.hourly = response.data.hourly;
                        self.timezone = response.data.timezone;
                        $scope.selected = WeatherService.getForecast($scope.currentTime);
                    }, function (error) {
                        console.log(error);
                        WeatherService.getLocalWeatherData();
                    });
                } else {
                    throw new Error('No connection available');
                }
            };

            // Default temperature filter
            self.unitFilter = 'F';

            var init = function (fetchFromAPi = null) {
                try {
                    self.setCurrentWeather();
                } catch(error) {
                    console.warn(error.message);
                    self.getOfflineData();
                }
                updateTime();
            };

            $scope.refreshData = function () {
                init();
            };

            init();
        }])
    .controller('SettingsController', ['$scope', function ($scope) {

    }])