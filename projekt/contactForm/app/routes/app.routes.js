const auth = require("../controllers/auth/auth.controller.js");

module.exports = app => {
  var router = require("express").Router();
  const sendForm = require("../controllers/newMessage.controller")
  const getMessage = require("../controllers/messages.controller")
  app.get("/", (req, res) => {
    res.json({ message: "Contact Form" });
  });

  router.post("/send/message/", auth, sendForm.sendForm)
  router.get("/logged/message/list/", auth, getMessage.getMessage)
  app.use("/api", router);

};

