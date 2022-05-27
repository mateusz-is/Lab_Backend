const db = require("../../models");
const Ad = db.ad;

exports.findByAuthor = (req, res) => {
    const authorID = req.params.id;

    Ad.find({ authorID: authorID })
    .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Ad from category id:  " + authorID });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Ad with category id=" + authorID });
      });
}