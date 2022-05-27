const ObjectId  = require("bson");
const db = require("../../models");
const Ad = db.ad;

exports.deleteAd = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const id = req.query.id

    Ad.deleteOne({id: ObjectId(id)})
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