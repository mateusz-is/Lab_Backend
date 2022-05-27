module.exports = app => {
  var router = require("express").Router();
  const ad = require("../controllers/ads/createAd.controller.js");
  const getAll = require("../controllers/ads/findAll.controller.js");
  const getdOne = require("../controllers/ads/findOne.controller.js");
  const getPublished = require("../controllers/ads/findPublished.controller.js");
  const category = require("../controllers/categories/createCategory.controller.js");
  const getAllCategory = require("../controllers/categories/findAll.controller.js")
  const findByCat = require("../controllers/ads/findByCategory.controller.js")
  const findByAuthor = require("../controllers/ads/findByAuthor.controller.js")
  const deleteAd = require("../controllers/ads/deleteAd.controller.js")
  const deleteCat = require("../controllers/categories/deleteCategory.controller.js")


  

  app.get("/", (req, res) => {
    res.json({ message: "Home Page" });
  });

  router.post("/ad/create", ad.create);
  router.get("/ads", getAll.findAll);
  router.get("/ads/category/:id", findByCat.findByCategory);
  router.get("/ads/author/:id", findByAuthor.findByAuthor);
  router.delete("/ads/delete/:id", deleteAd.deleteAd);
  router.delete("/category/delete/:id", deleteCat.deleteCat);
  router.get("/ad/:id", getdOne.findOne);
  router.get("/ads/published", getPublished.findPublished);
  router.post("/category/create", category.create)
  router.get(`/category/all`, getAllCategory.findAll)
  

  app.use("/api", router);
};

