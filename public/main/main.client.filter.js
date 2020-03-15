// const moment = require("moment");

angular.module('Main')
.filter('twitterAgo', ['moment', function (moment) {
    return function (date, formatString) {
        return moment(date).format("HH:MM");
    };
}])
.filter('addMilliseconds', function() {
    return function(timestamp) {
        return timestamp * 1000;
    }
})
.filter('tempUnit', [ 'UserOpt', function(UserOpt) {
    return function(temp) {
        if (UserOpt.tempUnit === 'C') {
            return Math.floor((temp - 32) * (5/9));
        } else {
            return Math.floor(temp);
        }
    }
}])