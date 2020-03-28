// const moment = require("moment");

angular.module('Events')
    .controller('EventsController', ['$rootScope', '$scope', '$timeout', 'EventService',
        function ($rootScope, $scope, $timeout, EventService) {
            let self = this;
            $scope.eventsData = [];
            $scope.addEventDialog = false;
            $scope.editingEvents = false;

            self.getEvents = function () {
                $scope.eventsData = EventService.getLocalEventsData();
            };

            self.submit = function () {
                console.log($scope.event);
                self.createTime();
                EventService.createEvent($scope.event);
                $scope.eventsData = EventService.getLocalEventsData();
            }

            self.createTime = function () {
                $scope.event.time = $scope.event.date.getTime() + $scope.event.time.getTime();
            };

            self.editEvents = function () {
                $scope.editingEvents = !$scope.editingEvents;
            }

            $scope.enterEditMode = function () {
                $scope.$broadcast('enterEditMode');
                $scope.editingEvents = true;
            }

            $scope.leaveEditMode = function () {
                $scope.$broadcast('leaveEditMode');
                $scope.editingEvents = false;
            }

            var init = function () {
                if ($scope.eventsData.length === 1) {
                    $scope.editingEvents = false;
                }
                self.getEvents();
            }

            $rootScope.$on('eventDeleted', function () {
                init();
            })

            init();

        }])