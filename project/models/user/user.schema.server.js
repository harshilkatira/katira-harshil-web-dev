module.exports = function () {

    var mongoose = require("mongoose");

    var GameSchema = require("../game/game.schema.server")();

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        /*facebook: {
            id:    String,
            token: String,
            displayName: String
        },*/
        type: {type: String, default: 'gamer'},
        email: String,
        image: String,
        followers: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUser'
        }],
        following: [{
            type: mongoose.Schema.Types.ObjectId, ref: 'ProjectUser'
        }],
        likedGames: [GameSchema],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});
    
    return UserSchema;
};