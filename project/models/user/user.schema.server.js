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
        google: {
            id:    String,
            token: String
        },
        type: {type: String, default: 'gamer'},
        email: String,
        image: {type: String, default: 'http://knightslpc.com/wp-content/uploads/2016/06/Knights-LPC-Person-Placeholder.jpg'},
        followers: [String],
        following: [String],
        likedGames: [GameSchema],
        role: {type: String, enum: ['admin', 'gamer'], default: 'gamer'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.user"});

    return UserSchema;
};