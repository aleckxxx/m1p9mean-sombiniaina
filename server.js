const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routeConfig = require('./api/helpers/route.helper');
const errorHandler = require('./api/helpers/errorHandler.helper');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.use(express.static(path.join(__dirname, '/dist/m1p9meansombiniaina')));

routeConfig(app);


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/m1p9meansombiniaina/index.html'));
});


app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/ekaly',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const db = mongoose.connection;

db.on('error',(err)=>{
    console.log('database connection failed!');
    console.debug(err);
});

db.on('connected',()=>{
    console.log('database connection success');
});

// start server
const port = process.env.PORT || 8080;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});

module.exports = app;