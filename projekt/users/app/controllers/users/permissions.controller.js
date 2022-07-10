const db = require("../../models");
const user = db.user;

exports.changePermission = async (req, res) => {
    const id = req.body.userId;

    const permission = req.user?.tokenObject?.permission

    let newPermission = {
        permission: req.body.permission,
    }

    console.log(id)
    const editUser = async () => {
        await user.findByIdAndUpdate(id, newPermission)
        await res.status(200).send(newPermission);

    }

    if (permission === 'admin') {
        await editUser();
        return;
    } else {
        await res.status(401).send("You need Admin permission to edit permision");
        return;
    }

}



