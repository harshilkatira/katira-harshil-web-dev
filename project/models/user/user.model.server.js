module.exports = function () {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("ProjectUser", UserSchema);

    var api = {
        //findFacebookUser: findFacebookUser,
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        updateUser: updateUser,
        deleteUser: deleteUser,
        deleteImage: deleteImage
    };
    return api;

    /*function findFacebookUser(id) {
        return User.findOne({"facebook.id": id});
    }*/

    function createUser(user) {
        return User.create(user);
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
               $set: user
            });
    }

    function deleteImage(userId) {
        return User
            .update({_id: userId},{
                $set: {
                    image: undefined
                }
            });
    }
};