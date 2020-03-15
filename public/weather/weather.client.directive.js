angular.module('Weather')
    .directive('weatherCard', ['WeatherService', function (WeatherService) {
        return {
            templateUrl: './weather/views/widgets/weather-card.html',
            restrict: 'AE',
            replace: true,
            scope: {
                weatherData: '='
            },
            link: function ($scope, $element, $attrs) {
                $scope.show = true;

                $scope.isCurrent = function () {
                    let now = new Date(),
                    cardTime = new Date($scope.weatherData.time);
                    if (now.getDay() !== cardTime.getDay()) return false;
                    if (now.getHours() === cardTime.getHours()) {
                        // $scope.view();
                        // $scope.$parent.$parent.$parent.selected = $scope.weatherData;
                        return true;
                    }
                    return false;
                };

                $scope.selected = function () {
                    if ($scope.$parent.$parent.$parent.selected === $scope.weatherData) {
                        return true;
                    }
                };

                $scope.view = function () {
                    $scope.$parent.$parent.$parent.selected = $scope.weatherData;
                };

                if ($scope.isCurrent()) {
                    $scope.view();
                }
            }
        }
    }])