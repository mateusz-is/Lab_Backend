const db = require("../../models");
const Ad = db.ad;

exports.findAll = (req, res) => {
    // const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit);

    Ad.find().limit(limit).skip(skip)
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