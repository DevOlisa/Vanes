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
                $scope.isCurrent = false;

                var setCurrent = function () {
                    let now = new Date(),
                        cardTime = new Date($scope.weatherData.time);
                    if (now.getDay() !== cardTime.getDay()) return;
                    if (now.getHours() === cardTime.getHours()) {
                        $scope.isCurrent = true;
                        $scope.view();
                    }
                };

                $scope.selected = function () {
                    if ($scope.$parent.$parent.$parent.selected === $scope.weatherData) {
                        return true;
                    }
                };

                $scope.view = function () {
                    $scope.$parent.$parent.$parent.selected = $scope.weatherData;
                };

                setCurrent();
            }
        }
    }])