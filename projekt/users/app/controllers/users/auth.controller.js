const jwt = require('jsonwebtoken');
const db = require("../../models");
const bcrypt = require('bcrypt');
const user = db.user;

const jwtKey = "my_secret_key"


exports.authUser = async (req, res) => {

    if (!req.body.email) {
        return res.status(400).send('Email is required');
    }

    let userLogin = await user.findOne({ email: req.body.email });
    if (!userLogin) {
        return res.status(400).send('Incorrect email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, userLogin.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    let userData = await user.findOne({ email: req.body.email });

    let tokenObject = new user({
        _id: userData._id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        permission: userData.permission,
        isActive: userData.isActive
    })

    const token = jwt.sign({tokenObject}, jwtKey, {
        expiresIn: '24h'
    });

    res.status(200).send({ token: token });

};


