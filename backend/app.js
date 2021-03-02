const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');
const thing = require('./models/thing');

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

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
        ...req.body
    });
    thing.save()
    .then(() => res.status(201).json({ message: "Object saved!"}))
    .catch(err => res.status(400).json({ error: err }));
});

app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(err => res.status(400).json({ error: err }));
});

module.exports = app;