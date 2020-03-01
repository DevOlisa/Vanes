const weather = require('../controllers/weather.server.controller');

module.exports = (app) => {
    app.route('/currently')
    .get(weather.getCurrentWeather);
    
};