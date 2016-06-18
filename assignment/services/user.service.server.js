var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, models) {

    var userModel = models.userModel;

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    app.post("/api/user", createUser);
    app.post("/api/login", passport.authenticate('assignment'), login);
    app.post("/api/logout", logout);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    passport.use('assignment', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    }
                    else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

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

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.send(200);
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password){
            findUserByCredentials(username, password, req, res);
        }
        else if(username){
            findUserByUsername(username, res);
        }
        else{
            res.send(users);
        }
    }

    function findUserByCredentials(username, password, req, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    //console.log(user);

                    //console.log(req.session);
                    req.session.currentUser = user;

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
};