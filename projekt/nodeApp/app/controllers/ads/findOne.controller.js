const db = require("../../models");
const Ad = db.ad;

exports.findOne = (req, res) => {
    const id = req.params.id;

    Ad.findById(id)
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Ad with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Ad with id=" + id });
      });
}