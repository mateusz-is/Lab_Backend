const db = require("../../models");
const Ad = db.ad;

exports.findAll = (req, res) => { 
    // const title = req.query.title;
    // var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    const adId = req.query.id
 
        Ad.find({ id: adId })
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