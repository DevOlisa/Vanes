angular.module('Main')
    .controller('MainController', ['$scope', '$timeout', 'WeatherService', function ($scope, $timeout, WeatherService) {
        var self = this;
        $scope.showSettings = false;
        $scope.selected = WeatherService.currently;

        self.toggleSettingsPane = function () {
            $scope.showSettings = !$scope.showSettings;
        };

        self.saveSettings = function () {
            $scope.showSettings = false;
        }

        // Default temperature filter
        self.unitFilter = 'C';

    }])
    .controller('SettingsController', ['$scope', function ($scope) {

    }])