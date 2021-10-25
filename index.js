var Express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const app = new Express();
var cors = require('cors');
var path = require('path')


require('dotenv').config();

var mainRoute = require('./routes/route');
var databaseConfig = require('./configuration/serverConfig');


app.use(Express.static(path.join(__dirname, '/guttermeshadmin')))


mongoose.connect(databaseConfig.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 10,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(cors())
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));


app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if ('OPTIONS' == req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(function (err, req, res, next) {  // eslint-disable-line
    res.status(err.status || 500).json(res.error(err.status || 500));
});

process.on('uncaughtException', function (err) {
    console.log('An unknown error occured internally', err); // eslint-disable-line
});

setTimeout(function () {
}, 500);

app.use('/api', mainRoute);

app.listen(databaseConfig.port, (error) => {
    if (!error) {
        console.log(`Server is running on port: ${databaseConfig.port}!`); // eslint-disable-line
    }
});

module.exports = app;
