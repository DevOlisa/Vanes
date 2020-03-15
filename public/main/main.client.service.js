angular.module('Main')
    .factory('NetworkMonitor', [function () {
        var service = {};
        service.online = null;

        return service;
    }])
.constant("moment", moment)
.value("UserOpt", {
    tempUnit: 'C',
    updateInterval: 60000
})
