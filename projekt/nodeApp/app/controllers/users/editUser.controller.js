var mongodb = require('mongodb');
const db = require("../../models");
const bcrypt = require('bcrypt');
const user = db.user;

exports.updateUser = async (req, res) => {
    const id = req.body.id;

    const permission = req.user?.tokenObject?.permission
    const currentUserId = req.user?.tokenObject?.id.toString()

    let getUser = await user.findById(id),
        editUserId = getUser?._id.toString()

    let userData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        permission: req.body.permission,
        isActive: req.body.isActive
    }

    const editUser = async () => {
        let emailExist = await user.findOne({ email: req.body.email });
        if (!req.body.email) {
            await res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password.toString(), salt);

        const updateUser = async () =>{
            await user.findByIdAndUpdate(id, userData)
            await res.status(200).send(userData);
        }

        if (emailExist?.email !== undefined) {
            if (emailExist?.email !== getUser?.email) return res.status(400).send('That user already exisits!');
            await updateUser()
        } else {
            await updateUser()
        }
    }

    if (permission === 'admin') {
        return await editUser();
    } else if (editUserId === currentUserId) {
        return await editUser()
    } else {
        return await res.status(401).send("You need Admin permission to edit this user")
    }

}



