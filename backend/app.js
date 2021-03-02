const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');

mongoose.connect(
    'mongodb://' + process.env.MONGODB_IP + ':' + process.env.MONGODB_PORT + '/backend',
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (err)
        console.log("MongoDB connection error:" + err);
      else console.log("MongoDB connected");
    }
)

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false); // Allow elements of DB to be modified
mongoose.set('useCreateIndex', true);

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);


module.exports = app;