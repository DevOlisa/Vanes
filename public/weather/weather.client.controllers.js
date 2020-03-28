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

        $scope.refreshData = function () {
            init();
        };

        // console.log($scope.current)
    }])