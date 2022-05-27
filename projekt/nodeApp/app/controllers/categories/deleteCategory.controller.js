const ObjectId  = require("bson");
const db = require("../../models");
const Cat = db.cat;


exports.deleteCat = (req, res) => {
    const id = req.query.id

    Cat.deleteOne({id: ObjectId(id)})
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

