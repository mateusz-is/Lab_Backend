module.exports = mongoose => {
    var schema = mongoose.Schema(
        {
            firstName: String,
            lastName: String,
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
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
