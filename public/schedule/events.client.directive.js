angular.module('Events')
    .directive('eventCard', ['$rootScope', '$timeout', 'EventService', 'WeatherService', function ($rootScope, $timeout, EventService, WeatherService) {
        return {
            templateUrl: './schedule/views/event-card.html',
            scope: {
                eventData: "="
            },
            replace: true,
            link: function ($scope, element, $attrs) {
                $scope.editMode = false;
                $scope.weatherData = null;
                $scope.deleting = false;
                var deleteEventTracking;

                $scope.startDelete = function () {
                    deleteEventTracking = startDeleteTimeTracking();
                    $scope.deleting =  true;
                };

                var startDeleteTimeTracking = function () {
                    var promise = $timeout(deleteItem, 4000);
                    return promise;
                };

                $scope.cancelDelete = function () {
                    $timeout.cancel(deleteEventTracking);
                    $scope.deleting = false;
                };

                var deleteItem = function () {
                    console.log(`Deleting ${$scope.eventData.title}`);
                    EventService.deleteEvent($scope.eventData);
                    $rootScope.$broadcast('eventDeleted', $scope.eventData);
                    $scope.deleting = false;
                };

                $scope.$on('enterEditMode', function () {
                    $scope.editMode = true;
                });

                $scope.$on('leaveEditMode', function () {
                    $scope.editMode = false;
                });

                $scope.weatherData = WeatherService.getForecast($scope.eventData.time);
            }
        }
    }])
    .directive('eventEdit', ['$rootScope', function ($rootScope) {
        return {
            restrict: "AE",
            link: function ($scope, element, $attrs) {

            }
        }
    }])