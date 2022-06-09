const db = require("../../models");
const user = db.user;


exports.registerUser = async (req, res) => {

    if (!req.body.email) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    let isUserExist = await user.findOne({ email: req.body.email });

    if (isUserExist) {
        return res.status(400).send('That user already exisits!');
    } else {
        isUserExist = new user({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            permission: req.body.permission,
            isActive: req.body.isActive
        });
        await isUserExist.save();
        res.send(isUserExist);
    }
};