module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: {type: String, required: true},
        firstName: String,
        lastName: String,
        /*facebook: {
            id:    String,
            token: String,
            displayName: String
        },*/
        email: String,
        image: String,
        followers: [{type: mongoose.Schema.ObjectId, ref: 'ProjectUser'}],
        following: [{type: mongoose.Schema.ObjectId, ref: 'ProjectUser'}],
        likedGames: [String],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});
    
    return UserSchema;
};