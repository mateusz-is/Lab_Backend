var mongodb = require('mongodb');
const db = require("../../models");
const bcrypt = require('bcrypt');
const user = db.user;

exports.updateUser = async (req, res) => {
    const id = req.body.id;

    if (!req.body.email) {
        await res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    let userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        permission: req.body.permission,
        isActive: req.body.isActive
    }

    let emailExist = await user.findOne({ email: req.body.email });

    if (emailExist) return res.status(400).send('That user already exisits!');

    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(userData.password.toString(), salt);

    await user.findByIdAndUpdate(id, userData)
    await res.status(200).send(userData);

}



