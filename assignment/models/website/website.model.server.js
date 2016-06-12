module.exports = function () {

    var mongoose = require("mongoose");
    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);
    var User = mongoose.model("User");

    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    function createWebsiteForUser(userId, website) {
        website._user = userId;
        //console.log("up");

        return Website.create(website)
            .then(
                function (website) {
                    User.findById(userId)
                        .then(
                            function (user) {
                                user.websites.push(website._id);
                                user.save(function () {});
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                    // return website;
                });



        /*then(function (website, error) {
         console.log("down");
         if(error) {
         console.log("err"+error);
         } else {
         User.findById(userId).then(function (user, err) {
         if (err) {
         console.log("err1"+err);
         } else {
         user.websites.push(website._id);
         console.log('updated user ' + user);
         user.save(function (error) {
         if(error) {
         console.log(error);
         } else
         return website;
         });
         }
         })
         }
         }
         );*/

        //return Website.create(website);
    }

    function findAllWebsitesForUser(userId) {
        return Website.find({"_user": userId});
    }

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }

    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website.update({_id: websiteId}, {$set: website});
    }

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }
};