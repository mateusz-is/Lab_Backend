module.exports = mongoose => {
    let schema = mongoose.Schema(
        {
            firstName: {
                type: String,
                required: true,
            },
            lastName: {
                type: String,
                required: true,
            },
            email: {
                type: String,
                unique: true,
                required: true
            },
            password: {
                type: String,
                required: true,
            },
            permission: {
                type: String,
            },  
            token: {
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
