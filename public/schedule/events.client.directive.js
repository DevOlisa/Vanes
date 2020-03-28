angular.module('Events')
    .directive('eventCard', ['$rootScope', 'EventService', 'WeatherService', function ($rootScope, EventService, WeatherService) {
        return {
            templateUrl: './schedule/views/event-card.html',
            scope: {
                eventData: "="
            },
            link: function ($scope, element, $attrs) {
                $scope.editMode = false;
                $scope.weatherData = null;

                $scope.delete = function () {
                    console.log(`Deleting ${$scope.eventData.title}`);
                    EventService.deleteEvent($scope.eventData);
                    $rootScope.$broadcast('eventDeleted', $scope.eventData);
                };

                $scope.$on('enterEditMode', function() {
                    $scope.editMode = true;
                });
                
                $scope.$on('leaveEditMode', function() {
                    $scope.editMode = false;
                });

                $scope.weatherData = WeatherService.getForecast($scope.eventData.time);
            }
        }
    }])
    .directive('eventEdit', ['$rootScope', function ($rootScope) {
        return {
            restrict: "AE",
            link: function($scope, element, $attrs) {

            }
        } 
    }])