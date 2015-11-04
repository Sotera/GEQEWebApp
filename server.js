var debug = require('debug')('server');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

// handle server listen port this way for now
app.set('port', process.env.PORT || 3001);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({secret: 'mySecret', resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/views/partials', require('./routes/partials'));

app.use('/views/app', require('./routes/app/app'));
app.use('/app/controlBox', require('./routes/app/controlBox'));
app.use('/app/users', require('./routes/app/users'));
app.use('/app/sitelists',require('./routes/app/sitelists'));
app.use('/app/geqeModels',require('./routes/app/geqeModels'));
app.use('/app/datasets',require('./routes/app/datasets'));
app.use('/app/resultsets',require('./routes/app/resultsets'));
app.use('/app/jobs',require('./routes/app/jobs'));
app.use('/app/socialMediaQuery', require('./routes/app/socialMediaQuery'));
app.use('/app/posts',require('./routes/app/posts'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// and let's get things started
var server = app.listen(app.get('port'), function() {
  app.emit('started');
  console.log('Express server listening on port ' + server.address().port);
});
