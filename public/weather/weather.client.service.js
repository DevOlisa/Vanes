angular.module('Weather')
    .factory('WeatherService', ['$http', 'LocationService', function ($http, LocationService) {
        var service = {};
        service.currently = null;
        service.hourly = null;

        service.getWeatherReport = function () {
            return $http.get('http://localhost:4040/currently', {
                params: {
                    lat: LocationService.latitude,
                    long: LocationService.longitude,
                }
            })
        }

        service.setCurrentWeather = function () {
            service.getWeatherReport()
                .then(function (response) {
                    if (response.status === 200) {
                        service.currently = response.data.currently;
                        service.hourly = response.data.hourly;
                        service.timezone = response.data.timezone;
                        console.log(service);
                    } else {
                        console.log('Error occured')
                    }
                }, function (error) {
                    console.log(error);
                })
        }
        return service;
    }]);