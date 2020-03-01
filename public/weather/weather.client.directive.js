angular.module('Weather')
.directive('weatherCard', [ function() {
    return {
        templateUrl: './weather/views/widgets/default.html',
        restrict: 'AE',
        replace: true,
        scope: {
            weatherData: '='
        },
        link: function($scope, $element, $attrs) {
            $scope.show = true;
        }
    }
}])