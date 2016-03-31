/*
 creating a Express app initializing it with the HelloWorld message
 */
'use strict';

function startApplication() {    

    var express = require('express'),
        http = require('http'),
        path = require('path');

    var appConfig = require('./config/appConfig.json');

    var app = express();

    // all environments
    app.set('port',  process.env.OPENSHIFT_PORT);
    app.set('ip', process.env.OPENSHIFT_IP)
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser({ keepExtensions: true, uploadDir: path.join(__dirname, appConfig.directories.publicDir) }));
    app.use(express.methodOverride());
    app.use(express.cookieParser('my v3ry s3cr3t C00k1e k3y d0nt y0u th1nk?'));
    app.use(express.session({
        secret: 'my l1ttl3 s3cret s3ss10n k3y isnt it?',
        maxAge: 3600000
    }));


    //routes
    require('./routes/index')(app);

    app.use(app.router);
    app.use(express.static(path.join(__dirname, appConfig.directories.publicDir)));

    app.use(function (req, res, next) {
        console.log('req.body: ' + JSON.stringify(req.body));
        next();
    });

    // development only
    if ('development' === app.get('env')) {
        app.use(express.errorHandler());
    }


    http.createServer(app).listen(app.get('port'),app.get('ip'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
}

exports.startApplication = startApplication;
