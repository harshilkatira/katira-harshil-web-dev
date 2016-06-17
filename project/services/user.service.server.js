module.exports = function (app, models) {

    var userModel = models.userModel;

    app.post("/project/api/user", createUser);
    app.get("/project/api/user", findUser);
    app.get("/project/api/user/:userId", findUserById);
    app.put("/project/api/user/:userId", updateUser);
    app.put("/project/api/user/:userId/like/:gameId", userLikedGame);
    app.put("/project/api/user/:userId/unlike/:gameId", userUnlikedGame);
    app.delete("/project/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var user = req.body;

        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            findUserByCredentials(username, password, res);
        }
        else if(username){
            findUserByUsername(username, res);
        }
        else{
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    //console.log(user);
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserByUsername(username, res) {

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;

        userModel
            .updateUser(userId, newUser)
            .then(
                function (stats) {
                    //console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(
                function (stats) {
                    //console.log(stats);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }
    
    function userLikedGame(req, res) {
        var userId = req.params.userId;
        var gameId = req.params.gameId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    user.likedGames.push(gameId);
                    return userModel.updateUser(userId, user);
                },
                function (error) {
                    res.statusCode(404).send("user not found");
                }
            )
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send("unable to like");
                }
            );
    }
    
    function userUnlikedGame(req, res) {
        var userId = req.params.userId;
        var gameId = req.params.gameId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    var index = user.likedGames.indexOf(gameId);
                    user.likedGames.splice(index,1);
                    return userModel.updateUser(userId, user);
                },
                function (error) {
                    res.statusCode(404).send("user not found");
                }
            )
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send("unable to unlike");
                }
            );
    }
};