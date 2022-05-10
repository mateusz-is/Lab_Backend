module.exports = app => {
  var router = require("express").Router();
  const ad = require("../controllers/createAd.controller.js");
  const getAllAds = require("../controllers/getAllAds.controller.js");


  app.get("/", (req, res) => {
    res.json({ message: "Witam na stronie głównej" });
  });

  router.post("/ad/create", ad.create);
  router.get("/", getAllAds.findAll);
 
  app.use("/api", router);
};
