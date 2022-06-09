const jwt = require('jsonwebtoken');
const db = require("../../models");
const bcrypt = require('bcrypt');
const config = require('config');
const user = db.user;


exports.authUser = async (req, res) => {

    if (!req.body.email) {
        return res.status(400).send('Something went wrong');
    }

    let userLogin = await user.findOne({ email: req.body.email });
    if (!userLogin) {
        return res.status(400).send('Incorrect email or password.');
    }

    const validPassword = await bcrypt.compare(req.body.password, userLogin.password);
    if (!validPassword) {
        return res.status(400).send('Incorrect email or password.');
    }

    let userDetail = await user.findOne({ email: req.body.email }, { _id: 0, firstName: 1, lastName: 1, email: 1, permission: 1, isActive: 1 });
    const token = jwt.sign({ _id: user._id }, 'PrivateKey');


    res.send([{ userDetail, token: token  }]);

};