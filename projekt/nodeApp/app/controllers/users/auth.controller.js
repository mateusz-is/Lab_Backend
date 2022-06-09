const db = require("../../models");
const bcrypt = require('bcrypt');
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

    res.send(true);
    
};