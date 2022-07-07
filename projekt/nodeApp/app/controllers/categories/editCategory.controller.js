var mongodb = require('mongodb');
const db = require("../../models");
const bcrypt = require('bcrypt');
const Cat = db.cat;

exports.editCategory = async (req, res) => {
    const id = req.body.id;

    const permission = req.user?.tokenObject?.permission

    let getCategory = await Cat.findById(id),
        categoryName = getCategory?.name.toString()

    let categoryData = {
        name: req.body.name,
        published: req.body.published,
    }

    const editCateogry = async () => {
        let categoryExist = await Cat.findOne({ name: req.body.name });
        if (!req.body.name) {
            await res.status(400).send({ message: "Content can not be empty!" });
            return;
        }
        
        const updateCategory = async () =>{
            await Cat.findByIdAndUpdate(id, categoryData)
            await res.status(200).send(categoryData);
        }

        if (categoryExist?.name !== undefined) {
            if (categoryExist?.name !== categoryName) return await res.status(400).send('That category already exisits!');
            await updateCategory()
        } else {
            await updateCategory()
        }
    }

    if (permission === 'string') {
        return await editCateogry();
    } else {
        return await res.status(401).send("You need Admin permission to edit this user")
    }

}



