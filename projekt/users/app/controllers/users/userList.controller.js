const db = require("../../models");
const user = db.user;


exports.userList = async (req, res) => {
    const permission = req.user?.tokenObject?.permission
    const userList = await user.find()

    if (permission === 'admin') {
        res.status(200).send(userList);
        return;
    } else {
        res.status(401).send("You need Admin permission to list users")
        return;
    }
   
}

