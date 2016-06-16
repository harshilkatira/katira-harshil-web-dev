module.exports = function () {

    var mongoose = require("mongoose");
    var GameSchema = require("./game.schema.server")();
    var Game = mongoose.model("Game", GameSchema);

    var api = {

    };
    return api;

    
};