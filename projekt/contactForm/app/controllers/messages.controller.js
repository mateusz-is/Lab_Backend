
const db = require("../models");
const Contact = db.contact;


exports.getMessage = async (req, res) => {

    const currentUserId = req.user?.tokenObject?.id.toString()

    const userMessage = await Contact.find({ownerId: currentUserId})

    await res.status(200).send(userMessage)
    console.log(currentUserId)
    // await newMessage.save();
    // await res.status(200).send(newMessage);

};