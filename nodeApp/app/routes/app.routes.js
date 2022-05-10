module.exports = app => {
  var router = require("express").Router();
  const ad = require("../controllers/ad.controller.js");

  
  app.get("/", (req, res) => {
    res.json({ message: "Witam na stronie głównej" });
  });


  router.post("/ad/create", ad.create);
  app.use("/api", router);
};
