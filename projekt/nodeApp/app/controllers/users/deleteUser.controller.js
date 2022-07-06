var mongodb = require('mongodb');
const db = require("../../models");
const user = db.user;

exports.deleteUser = async (req, res) => {
    const id = req.params.id;
    const permission = req.user?.tokenObject?.permission

    const deleteOne = () => {
        user.deleteOne({ _id: new mongodb.ObjectID(id.toString()) })
            .then(data => {
                res.send({
                    data
                });
            })
            .catch(err => {
                res.status(500).send("Some error occurred while retrieving user.");
            });
    }

    if (permission === 'admin') return deleteOne();

    res.status(401).send("You need Admin permission to delete User")


};