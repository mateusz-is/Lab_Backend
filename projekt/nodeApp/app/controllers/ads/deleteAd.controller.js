var mongodb = require('mongodb');
const db = require("../../models");
const Ad = db.ad;


exports.deleteAd = async (req, res) => {
    const id = req.params.id;

    let adsData = await Ad.findById(id)
    let authorId = adsData?.authorID

    const permission = req.user?.tokenObject?.permission
    const currentUserId = req.user?.tokenObject?.id

    const deleteAd = () => {
        Ad.deleteOne({ _id: new mongodb.ObjectID(id.toString()) })
            .then(data => {
                res.send({
                    data
                });
            })
            .catch(err => {
                res.status(500).send("Some error occurred while retrieving ads.");
            });
    }

    if (permission === 'admin') {
       return deleteAd();
    } else if (authorId === currentUserId) {
        return deleteAd()
    } else {
        return res.status(401).send("You need Admin permission to delete this Ad")
    }

};