
const db = require("../models");
const contact = db.contact;


exports.sendForm = async (req, res) => {
   
    if (!req.body.email || !req.body.description) {
        await res.status(400).send({ message: "Content can not be empty!" });
        return;
    }


    let newMessage = new contact({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        email: req.body.email,
        description: req.body.description,
        ownerId: req.body.ownerId,
    });

    
    await newMessage.save();
    await res.status(200).send(newMessage);

};