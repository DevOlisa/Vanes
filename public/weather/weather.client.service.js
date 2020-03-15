// const moment = require("moment");

angular.module('Weather')
    .factory('WeatherService', ['$http', '$q', '$interval', 'LocationService', 'NetworkMonitor',
        function ($http, $q, $interval, LocationService, NetworkMonitor) {
            var service = {};
            // moment =  require('moment')
            service.selected = {};
            service.currently = null;
            service.hourly = null;
            service.autoUpdateWeather = true;
            service.autoUpdateWeatherInterval = 600000;

            service.getWeatherReport = function () {
                return $http.get('http://localhost:4040/currently', {
                    params: {
                        lat: LocationService.latitude,
                        long: LocationService.longitude,
                    }
                })
            }

            service.setCurrentWeather = function () {
                console.log(navigator.onLine);
                if (!navigator.onLine && localStorage.getItem('weatherData')) {
                    console.log("From offline storage");
                    service.getLocalWeatherData();
                    service.hourly.data.map(function (data) {
                        data.time *= 1000;
                        data.hour = new Date(data.time).getHours();
                    })
                } else {
                    service.getWeatherReport()
                        .then(function (response) {
                            if (response.status === 200) {
                                service.currently = response.data.currently;
                                service.hourly = response.data.hourly;
                                service.timezone = response.data.timezone;
                                service.saveWeatherData(response.data);
                                console.log("From darksky.net api");
                                console.log(response.data);
                            } else if (response.status > 500) {
                                console.log('Internal Server Error Occured');
                            }
                        }, function (error) {
                            console.log(error);
                        })
                }
            };

            service.renewWeatherData = function () {
                if (service.autoUpdateWeather) {
                    $interval(function () {
                        service.setCurrentWeather();
                    }, service.autoUpdateWeatherInterval);
                }
            };

            service.saveWeatherData = function (data) {
                if (typeof data == 'object') {
                    data = JSON.stringify(data);
                    localStorage.setItem('weatherData', data);
                } else {
                    return false;
                }
            };

            service.getLocalWeatherData = function () {
                let data = JSON.parse(localStorage.getItem('weatherData'));
                service.timezone = data.timezone;
                service.currently = data.currently;
                console.log(data)
                service.hourly = data.hourly;
            };

            service.renewWeatherData();
            // service.keepCurrentlyUpdated();
            return service;
        }]);