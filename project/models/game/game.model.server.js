module.exports = function () {

    var mongoose = require("mongoose");
    var GameSchema = require("./game.schema.server")();
    var Game = mongoose.model("Game", GameSchema);

    var api = {
        storeGame: storeGame,
        findStoredGameById: findStoredGameById
    };
    return api;

    function storeGame(game) {
        return Game.create(game);
    }

    function findStoredGameById(gameId) {
        return Game.findById(gameId);
    }
    
};