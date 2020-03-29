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
                $scope.event.time = self.createTime();
                EventService.createEvent($scope.event);
                $scope.eventsData = EventService.getLocalEventsData();
            }

            self.createTime = function () {
                var time = moment($scope.event.time, moment.HTML5_FMT.TIME, "HH:MM");
                var date = moment([$scope.event.year, $scope.event.month, $scope.event.day]);
                // date.add()
                console.log(date);
                console.log(time);
                date.add(time);
                console.log("After adding time");
                console.log(date);
                // return $scope.event.date.getTime() + $scope.event.time.getTime();
                $scope.event.date = $scope.event.time = null;
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