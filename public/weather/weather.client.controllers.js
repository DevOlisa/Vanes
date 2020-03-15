// const moment = require("moment");

angular.module('Weather')
    .controller('WeatherController', ['$scope', '$interval', 'WeatherService', function ($scope, $interval, WeatherService) {

        let now = new Date,
            currentTime = now.getHours(),
            currentTimeUnix = now.getTime();

        var updateHours = function () {

            switch (currentTime > 18 || currentTime < 5) {
                case true:
                    $scope.img = "moon-cloudy";
                    break;
                default:
                    $scope.img = "sunny-bright";
            }
        }

        $scope.removePastWeather = function (data) {
            return currentTimeUnix <= (data.time + 3600000);
        }

        var updateTime = function () {
            $interval(function () {
                $scope.currentTime = moment({}).format('MMMM DD, LT');
            }, 1000)
        }

        $scope.refreshData = function () {
            init();
        };

        var init = function (fetchFromAPi = null) {
            WeatherService.setCurrentWeather();

            // for (let i = 0; i < WeatherService.hourly.data.length; i++) {
            //     if (currentTime === new Date(WeatherService.hourly.data[i].time).getHours()) {
            //         $scope.selected = WeatherService.hourly.data[i];
            //         console.log('Updating...');
            //         break;
            //     }
            // };

            $scope.hourly = WeatherService.hourly;
            $scope.timezone = WeatherService.timezone;
            updateTime();
            // updateHours();
        };

        init();

        // console.log($scope.current)
    }])