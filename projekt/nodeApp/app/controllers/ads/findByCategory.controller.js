const db = require("../../models");
const Ad = db.ad;

exports.findByCategory = (req, res) => {
    const categoryID = req.params.id;

    Ad.find({ categoryID: categoryID })
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Ad from category id:  " + categoryID });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Ad with category id=" + categoryID });
      });
}