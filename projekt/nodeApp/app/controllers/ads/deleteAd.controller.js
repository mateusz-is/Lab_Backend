var mongodb = require('mongodb');
const db = require("../../models");
const Ad = db.ad;


exports.deleteAd = (req, res) => {
    const id = req.params.id
    
    Ad.deleteOne({_id: new mongodb.ObjectID(id.toString())})
        .then(data => {
            res.send({
               data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving ads."
            });
        });
};