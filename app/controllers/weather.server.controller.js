const forecast = require('forecastio'),
    // create a new forecast object using the dev key
    weather = new forecast("97007b08b33b2da670c6b8ebd3c22505");

exports.getCurrentWeather = (req, res, next) => {
    console.log(req.query);
    weather.forecast(req.query.lat, req.query.long, {lang: "en"},function (err, data) {
        if (err) {
            next();
            return;
        }
        console.log(data)

        res.json({
            currently: data.currently,
            hourly: data.hourly,
            timezone: data.timezone,
        });
    });
};