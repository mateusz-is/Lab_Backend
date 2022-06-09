module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            firstName: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            lastName: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 50
            },
            email: {
                type: String,
                minlength: 5,
                maxlength: 255,
                unique: true,
                required: true
            },
            password: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 1024
            },
            permission: {
                type: String,
            },
            isActive: {
                type: Boolean,
                required: true
            }
        },
        { timestamps: true }
    );
    schema.method("toJSON", function () {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Users = mongoose.model("users", schema);
    return Users;
};
