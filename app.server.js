process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const
    express = require('./config/express'),
    path = require('path');

const app = express();
// const passport = passportConfig();

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
  });

app.listen(4040);
module.exports = app;
console.log('Server running at http://localhost:4040/');