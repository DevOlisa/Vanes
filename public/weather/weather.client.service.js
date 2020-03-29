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
            
            service.renewWeatherData = function () {
                if (service.autoUpdateWeather) {
                    $interval(function () {
                        service.setCurrentWeather();
                    }, service.autoUpdateWeatherInterval);
                }
            };

            service.saveWeatherData = function (data) {
                if (typeof data == 'object') {
                    service.timezone = data.timezone;
                    service.currently = data.currently;
                    service.hourly = data.hourly;
                    data = JSON.stringify(data);
                    localStorage.setItem('weatherData', data);
                } else {
                    return false;
                }
            };

            service.getLocalWeatherData = function () {
                let data = JSON.parse(localStorage.getItem('weatherData'));
                if (!data) throw new Error('No offline data available');
                service.timezone = data.timezone;
                service.currently = data.currently;
                service.hourly = data.hourly;
                return data;
            };

            service.getForecast = function (time) {
                if (time === null) {
                    throw new Error('Time passed cannot be null');
                }
                let data = {},
                    forecastDate = moment(time);
                service.hourly.data.forEach(hour => {
                    let currentScope = moment(hour.time),
                        diff = forecastDate.diff(currentScope);
                    if (diff <= 3600000 && diff > 0) {
                        console.log('Found the match');
                        data = hour;
                    }
                });
                return data;
            };

            service.renewWeatherData();
            // service.keepCurrentlyUpdated();
            return service;
        }]);