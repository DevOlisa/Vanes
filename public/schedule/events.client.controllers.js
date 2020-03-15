angular.module('Events')
.controller('EventsController', ['$scope', function($scope) {
    let self =  this;

    function Event(evt) {
        this.title = evt.title;
        this.time = evt.time;
        this.weatherData = evt.weatherData;
        console.log('New event created!')
    }

    self.events =  new Event(
        {
            title: "Tinder Date with Mimi",
            time: new Date(),
            weatherData: {}
        }
    )
}])