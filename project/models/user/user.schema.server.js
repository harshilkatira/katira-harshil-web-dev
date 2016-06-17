module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        image: String,
        followers: [{type: mongoose.Schema.ObjectId, ref: 'ProjectUser'}],
        following: [{type: mongoose.Schema.ObjectId, ref: 'ProjectUser'}],
        likedGames: [String],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});
    
    return UserSchema;
};