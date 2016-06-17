module.exports = function () {

    var mongoose = require("mongoose");

    var ReviewSchema = mongoose.Schema({
        rating: Number,
        title: String,
        comment: String,
        userId: String,
        gameId: String,
        timestamp: {type: Date, default: Date.now}
    }, {collection: "project.review"});
    
    return ReviewSchema;
};