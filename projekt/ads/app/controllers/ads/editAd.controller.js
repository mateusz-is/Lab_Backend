const db = require("../../models");
const Ad = db.ad;

exports.updateAd = async (req, res) => {
    const id = req.body.id;

    const permission = req.user?.tokenObject?.permission,
        currentUserId = req.user?.tokenObject?.id.toString()

    let getUser = await Ad.findById(id),
        editUserId = getUser?.authorID.toString()

    let AdData = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        categoryID: req.body.categoryID,
        published: req.body.published,
    }

    const editAd = async () => {

        if (!req.body.title) {
            await res.status(400).send({ message: "Content can not be empty!" });
            return;
        }

        await Ad.findByIdAndUpdate(id, AdData)
        await res.status(200).send(AdData);
    }

    if (permission === 'admin') {
        return await editAd();
    } else if (editUserId === currentUserId) {
        return await editAd()
    } else {
        return await res.status(401).send("You need Admin permission to edit this ad")
    }

}



