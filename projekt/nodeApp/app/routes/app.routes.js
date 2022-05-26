module.exports = app => {
  var router = require("express").Router();
  const ad = require("../controllers/ads/createAd.controller.js");
  const getAll = require("../controllers/ads/findAll.controller.js");
  const getdOne = require("../controllers/ads/findOne.controller.js");
  const getPublished = require("../controllers/ads/findPublished.controller.js");
  const category = require("../controllers/categories/createCategory.controller.js");
  const getAllCategory = require("../controllers/categories/findAll.controller.js")


  app.get("/", (req, res) => {
    res.json({ message: "Witam na stronie głównej" });
  });

  router.post("/ad/create", ad.create);
  router.get("/ads", getAll.findAll);
  router.get("/ad/:id", getdOne.findOne);
  router.get("/published", getPublished.findPublished);
  router.post("/category/create", category.create)
  router.get(`/category/all`, getAllCategory.findAll)


  app.use("/api", router);
};

