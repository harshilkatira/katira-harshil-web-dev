module.exports = function () {

    var mongoose = require("mongoose");

    var UserSchema = require("../user/user.schema.server")();
    var GameSchema = require("../game/game.schema.server")();

    var ReviewSchema = mongoose.Schema({
        rating: Number,
        title: String,
        comment: String,
        user: UserSchema,
        game: GameSchema,
        timestamp: {type: Date, default: Date.now}
    }, {collection: "project.review"});
    
    return ReviewSchema;
};