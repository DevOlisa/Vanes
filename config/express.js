const config = require('./config'),
 express = require('express'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session =require('express-session'),
flash = require('connect-flash'),
passport =require('passport'),
moment = require('moment');

module.exports = function() {
    const app = express();

    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('short'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // configure Session
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));
    
    //Set EJS as the default templating engine
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Enable CORS
    // app.use(require('cors')());

    // Set Flash Module
    app.use(flash());
    // Set passport sessions
    app.use(passport.initialize());
    app.use(passport.session());

    require('../app/routes/index.server.routes.js')(app);
    // require('../app/routes/articles.server.routes.js')(app);
    // require('../app/routes/users.server.routes.js')(app);
    // require('../app/routes/appgets.server.routes.js')(app);
    // require('../app/routes/questions.server.routes.js')(app);
    // require('../app/routes/answers.server.routes.js')(app);
    // require('../app/routes/search.server.routes.js')(app);


    // Use the Express static to serve files
    app.use(express.static('./public'));
    // express.static('/public', {})

    return app;
}