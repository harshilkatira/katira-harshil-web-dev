// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, models, userModel, passport) {

    var reviewModel = models.reviewModel;

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    //var userModel = models.userModel;
    app.post ("/project/api/upload", upload.single('myFile'), uploadImage);
    app.post("/project/api/user", createUser);
    app.post("/project/api/register", register);
    app.post("/project/api/login", passport.authenticate('project'), login);
    app.post("/project/api/logout", logout);
    //app.get ('/auth/facebook', passport.authenticate('facebook'));
    /*app.get('/auth/facebook/callback',
     passport.authenticate('facebook', {
     successRedirect: '/assignment/#/user',
     failureRedirect: '/assignment/#/login'
     }));*/
    app.get("/project/api/loggedIn", loggedIn);
    app.get("/project/api/user", findUser);
    app.get("/project/api/user/:userId", findUserById);
    app.get("/project/api/users", findAllUsers);
    app.put("/project/api/user/:userId", updateUser);
    app.put("/project/api/user/:userId/like", userLikedGame);
    app.put("/project/api/user/:userId/unlike/:gameId", userUnlikedGame);
    app.put("/project/api/user/:userId/follow/:followedUserId", followUser);
    app.put("/project/api/user/:userId/unfollow/:unfollowedUserId", unfollowUser);
    app.put("/project/api/user/:userId/image/delete", deleteImage);
    app.delete("/project/api/user/:userId", deleteUser);

    /*passport.use('project', new LocalStrategy(localStrategy));
     passport.serializeUser(serializeUser);
     passport.deserializeUser(deserializeUser);*/


    /*var facebookConfig = {
     clientID     : process.env.FACEBOOK_CLIENT_ID,
     clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
     callbackURL  : process.env.FACEBOOK_CALLBACK_URL
     };*/

    //passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));

    /*function localStrategy(username, password, done) {
     userModel
     .findUserByUsername(username)
     .then(
     function(user) {
     if(user && bcrypt.compareSync(password, user.password)) {
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
     }*/

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var myFile = req.file;

        if(myFile == null) {
            res.redirect("/project/#/user");
            return;
        }

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        var newUser = {
            image: "/uploads/"+filename
        };

        userModel
            .updateUser(userId, newUser)
            .then(
                function (stats) {
                    //console.log(stats);
                    return reviewModel.updateUserImage(userId, "/uploads/"+filename);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    res.redirect("/project/#/user");
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("Username already in use");
                    }
                    else{
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if(user){
                        req.login(user, function (error) {
                            if(error){
                                res.status(400).send(error);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    /*function facebookLogin(token, refreshToken, profile, done) {
     //console.log(profile);
     userModel
     .findFacebookUser(profile.id)
     .then(
     function (facebookUser) {
     //console.log(facebookUser);
     if(facebookUser){
     return done(null, facebookUser);
     }
     else{
     facebookUser = {
     username: profile.displayName.replace(/ /g, ''),
     facebook: {
     id:    profile.id,
     token: token,
     displayName: profile.displayName
     }
     };
     userModel
     .createUser(facebookUser)
     .then(
     function (user) {
     return done(null, user);
     }
     );
     }
     }
     );
     }*/

    function createUser(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("Username already in use");
                    }
                    else{
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
            .then(
                function (user) {
                    if(user){
                        res.json(user);
                    }
                },
                function (error) {
                    res.status(400).send(error);
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

    function loggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else{
            res.send('0');
        }

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
            res.send(404);
        }
    }

    function findUserByCredentials(username, password, req, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    //console.log(user);
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

    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
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
                    return reviewModel
                        .deleteUserFromReview(userId)
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            )
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function userLikedGame(req, res) {
        var userId = req.params.userId;
        var game = req.body;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    var likedGames = user.likedGames;
                    likedGames.push(game);
                    var newUser = {
                        likedGames: likedGames
                    };
                    return userModel.updateUser(userId, newUser);
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
                    var games = user.likedGames;
                    for(var i in games){
                        if(games[i]._id === gameId){
                            games.splice(i,1);
                            break;
                        }
                    }
                    var newUser = {
                        likedGames: games
                    };
                    return userModel.updateUser(userId, newUser);
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

    function followUser(req, res) {
        var userId = req.params.userId;
        var followedUserId = req.params.followedUserId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    var following = user.following;
                    following.push(followedUserId);
                    var newUser = {
                        following: following
                    };
                    return userModel.updateUser(userId, newUser);
                },
                function (error) {
                    res.statusCode(404).send("user not found");
                }
            )
            .then(
                function (stats) {
                     return userModel.findUserById(followedUserId)
                },
                function (error) {
                    res.statusCode(400).send("unable to follow");
                }
            )
            .then(
                function (user) {
                    var followers = user.followers;
                    followers.push(userId);
                    var newUser = {
                        followers: followers
                    };
                    return userModel.updateUser(followedUserId, newUser);
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
                    res.statusCode(400).send("unable to follow");
                }
            );
    }

    function unfollowUser(req, res) {
        var userId = req.params.userId;
        var unfollowedUserId = req.params.unfollowedUserId;

        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    var following = user.following;
                    var index = following.indexOf(unfollowedUserId);
                    following.splice(index,1);
                    var newUser = {
                        following: following
                    };
                    return userModel.updateUser(userId, newUser);
                },
                function (error) {
                    res.statusCode(404).send("user not found");
                }
            )
            .then(
                function (stats) {
                    return userModel.findUserById(unfollowedUserId)
                },
                function (error) {
                    res.statusCode(400).send("unable to unfollow");
                }
            )
            .then(
                function (user) {
                    var followers = user.followers;
                    var index = followers.indexOf(userId);
                    followers.splice(index,1);
                    var newUser = {
                        followers: followers
                    };
                    return userModel.updateUser(unfollowedUserId, newUser);
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
                    res.statusCode(400).send("unable to unfollow");
                }
            );
    }
    
    function deleteImage(req, res) {
        var userId = req.params.userId;
        userModel
            .deleteImage(userId)
            .then(
                function (stats) {
                    return reviewModel.updateUserImage(userId, "http://knightslpc.com/wp-content/uploads/2016/06/Knights-LPC-Person-Placeholder.jpg");
                },
                function (error) {
                    res.statusCode(400).send("unable to delete image");
                }
            )
            .then(
                function (response) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send("unable to delete image from reviews");
                }
            );
    }
};