module.exports = function () {

    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);
    var Website = mongoose.model("Website");

    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page)
            .then(
                function (page) {
                    Website.findById(websiteId)
                        .then(
                            function (website) {
                                website.pages.push(page._id);
                                website.save(function () {});
                            },
                            function (error) {
                                console.log(error);
                            }
                        );
                    // return website;
                }
            );
    }

    function findAllPagesForWebsite(websiteId) {
        return Page.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return Page.findById(pageId);
    }

    function updatePage(pageId, page) {
        delete page._id;
        return Page.update({_id: pageId}, {$set: page});
    }

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }
};