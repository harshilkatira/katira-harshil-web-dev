module.exports = function () {

    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server")();
    var Review = mongoose.model("Review", ReviewSchema);

    var api = {

    };
    return api;


};