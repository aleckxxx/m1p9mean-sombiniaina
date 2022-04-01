require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routeConfig = require('./api/helpers/route.helper');
const errorHandler = require('./api/helpers/errorHandler.helper');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

routeConfig(app);

app.use(errorHandler);

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('database connection failed!');
    console.debug(err);
});

db.on('connected',()=>{
    console.log('database connection success');
});

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 3000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});