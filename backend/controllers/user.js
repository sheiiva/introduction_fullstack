const bcrypt = require('bcrypt');

const User = require('../models/User');
const { use } = require('../routes/user');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'User created!' }))
                .catch(err => res.status(400).json({ err }));
        })
        .catch(err => res.status(500).json({ err }));
};

exports.login = (req, res, next) => {

};