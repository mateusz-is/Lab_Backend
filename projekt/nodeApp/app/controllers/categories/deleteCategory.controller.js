var mongodb = require('mongodb');
const db = require("../../models");
const Cat = db.cat;
const checkToken = require("../auth/auth.controller")


exports.deleteCat = async (req, res) => {
    const id = req.params.id

    const permission = req.user?.tokenObject?.permission


    const deleteCategory = () => {
        Cat.deleteOne({ _id: new mongodb.ObjectID(id.toString()) })
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving ads."
                });
            });
    }

    if (permission === 'admin') {
        return deleteCategory();
    } else {
        return res.status(401).send("You need Admin permission to delete Category")
    }


};

