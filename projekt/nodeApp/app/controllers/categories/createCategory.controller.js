const db = require("../../models");
const Cat = db.cat;


exports.create = (req, res) => {

  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const category = new Cat({
    name: req.body.name,
    published: req.body.published
  })
  
  category
    .save(category)
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