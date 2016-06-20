module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        facebook: {
            id:    String,
            token: String,
            displayName: String
        },
        email: String,
        phone: String,
        type: {type: String, default: 'developer'},
        websites: [{type: mongoose.Schema.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.user"});
    
    return UserSchema;
};