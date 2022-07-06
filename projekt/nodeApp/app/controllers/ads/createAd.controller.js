const db = require("../../models");
const Ad = db.ad;

exports.create = (req, res) => {
  const permission = req.user?.tokenObject?.permission
  const authorId = req.user?.tokenObject?.id;
 
  const advertisment = new Ad({
    title: req.body.title,
    description: req.body.description,
    authorID: authorId,
    price: req.body.price,
    categoryID: req.body.categoryID,
    published: req.body.published ? req.body.published : false
  });

  if (permission === 'admin') {
    if (!req.body.title) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
    advertisment
      .save(advertisment)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating new ad."
        });
      });
  } else {
    return res.status(401).send("You need Editor permission to create new Ad")
  }
};

