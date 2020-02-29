process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    path = require('path'),
    passportConfig = require('./config/passport');

const db = mongoose();
const app = express();
// const passport = passportConfig();

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

app.listen(4040);
module.exports = app;
console.log('Server running at http://localhost:4040/');