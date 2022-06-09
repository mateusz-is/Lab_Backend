const config = require('config');
const jwt = require('jsonwebtoken');
const db = require("../../models");
const bcrypt = require('bcrypt');
const user = db.user;


exports.registerUser = async (req, res) => {

    if (!req.body.email) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    let newUser = await user.findOne({ email: req.body.email });

    if (newUser) {
        return res.status(400).send('That user already exisits!');
    } else {
        newUser = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            permission: req.body.permission,
            isActive: req.body.isActive
        });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(newUser.password, salt);
        await newUser.save();
        const token = jwt.sign({ _id: user._id }, config.get('PrivateKey'));
        res.header('x-auth-token', token).send(newUser);
    }
};