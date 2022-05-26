const db = require("../../models");
const Ad = db.ad;

exports.findPublished = (req, res) => {
    Ad.find({ published: true })
        .then(data => {
            if (!data) {
                res.status(400).send({ alert: 'Not found' })
            } else res.send(data)
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving  published ad"});
        });
}