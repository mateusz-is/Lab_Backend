const db = require("../../models");
const Cat = db.cat;
const checkToken = require("../auth/auth.controller")


exports.create = (req, res) => {
  const permission = req.user?.tokenObject?.permission

  const category = new Cat({
    name: req.body.name,
    published: req.body.published
  })


  if (permission === 'admin') {
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }

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
  } else {
    return res.status(401).send("You need Admin permission to create new Ad")
  }

};