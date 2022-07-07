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
            phone: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            ownerId: {
                type: String,
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

    const Contact = mongoose.model("form", schema);
    return Contact;
};
