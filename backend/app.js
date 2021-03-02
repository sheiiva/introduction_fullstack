const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Thing = require('./models/thing');

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
        .then(() => res.status(201).json({ message: "Object saved!" }))
        .catch(err => res.status(400).json({ error: err }));
});

app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id}, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json( { message: 'Object modified!' }))
        .catch(err => res.status(404).json({ err }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Object deleted!'}))
        .catch(err => res.status(400).json({ err }));
});

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(err => res.status(400).json({ err }));
});

app.use('/api/stuff', (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(err => res.status(400).json({ err }));
});

module.exports = app;