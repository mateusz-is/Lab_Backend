const db = require("../../models");
const Cat = db.cat;


exports.findAll = (req, res) => {
    // const published = req.query.published
    Cat.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Something is not working ;p"
            })
        })

}

