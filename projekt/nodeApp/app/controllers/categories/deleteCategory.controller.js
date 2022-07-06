var mongodb = require('mongodb');
const db = require("../../models");
const Cat = db.cat;
const checkToken = require("../auth/auth.controller")


exports.deleteCat = (req, res) => {
    const id = req.params.id

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

};

