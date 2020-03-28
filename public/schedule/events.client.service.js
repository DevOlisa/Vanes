angular.module('Events')
    .factory('EventService', ['$timeout', function ($timeout) {
        var service = {};
        service.events = [];

        function Event(evt) {
            this.title = evt.title;
            this.time = evt.time;
            this.time = evt.time;
            this.created = new Date();
            this.weatherData = evt.weatherData;
            console.log('New event created!');
        }

        service.createEvent = function (data) {
            if (!service.events) service.events = [];
            service.events.push(new Event(data));
            service.saveEventsData();
        };

        service.updateArray = function (event) {
            var itemExist = false;
            if (array.length > 0) {
                array.map(function (arrayItem) {
                    if (event.title === arrayItem.title) {
                        arrayItem = event;
                        itemExist = true;
                    }
                });
            }
            if (!itemExist) service.createEvent(event);
        };

        service.saveEventsData = function () {
            var data = JSON.stringify(service.events);
            localStorage.setItem('eventsData', data);
        };

        service.deleteEvent = function (event) {
            if (service.events.includes(event)) {
                service.events = service.events.filter(function (data) {
                    return event != data;
                })
                service.saveEventsData();
            }
        };

        service.deleteAllEvents = function () {
            service.events = [];
            service.saveEventsData();
        }

        service.getLocalEventsData = function () {
            service.events = JSON.parse(localStorage.getItem('eventsData'));
            return service.events;
        };

        return service;
    }])