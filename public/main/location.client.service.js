angular.module('Main')
.factory('LocationService', [function() {
    var service = {};
    service.longitude = "";
    service.latitude = "";
    service.personal = true;

    service.options = {  enableHighAccuracy: false,  maximumAge: 60000,  timeout: 45000 };

    service.saveCoordinates =  function(position) {
        service.latitude = position.coords.latitude;
        service.longitude = position.coords.longitude;
        if (position.coords.speed) service.options.maximumAge = 20000;
    };

    
    service.handleError =  function() {
        alert('An error occured!');
    };
    
    return service;
}])