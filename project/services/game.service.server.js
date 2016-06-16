module.exports = function (app, models) {
    var userModel = models.userModel;
    var gameModel = models.gameModel;

    app.post("/projectapi/game", storeGame);
    app.get("/projectapi/like/:gameId", findStoredGameById);

    function storeGame(req, res) {
        var game = req.body;
        gameModel
            .storeGame(game)
            .then(
                function (game) {
                    res.json(game);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findStoredGameById(req, res) {
        var gameId = req.params.gameId;
        gameModel
            .findStoredGameById(gameId)
            .then(
                function (game) {
                    res.json(game);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
};