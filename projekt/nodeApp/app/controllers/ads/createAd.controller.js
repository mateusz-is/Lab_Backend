const db = require("../../models");
const Ad = db.ad;


exports.create = (req, res) => {

  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const advertisment = new Ad({
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price,
    phone: req.body.phone,
    mail: req.body.mail,
    category: req.body.category,
    published: req.body.published ? req.body.published : false
  });

  
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
};