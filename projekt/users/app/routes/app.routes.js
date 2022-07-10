const auth = require("../controllers/auth/auth.controller.js");

module.exports = app => {
  var router = require("express").Router();
  const changePermission = require('../controllers/users/permissions.controller.js');
  const registerUser = require('../controllers/users/register.controller.js');
  const authUser = require('../controllers/users/auth.controller.js');
  const userList = require('../controllers/users/userList.controller.js');
  const deleteUser = require('../controllers/users/deleteUser.controller.js');
  const updateUser = require('../controllers/users/editUser.controller.js');

  
  app.get("/", (req, res) => {
    res.json({ message: "Contact Form" });
  });

  router.post("/user/register", registerUser.registerUser)
  router.post("/user/login", authUser.authUser)
  router.get("/users/list", auth, userList.userList)
  router.delete("/user/delete/:id", auth, deleteUser.deleteUser)
  router.put("/user/update/", auth, updateUser.updateUser)
  router.put("/user/update/permission", auth, changePermission.changePermission)
  app.use("/api", router);

};

