module.exports = function () {

    var mongoose = require("mongoose");

    var ReviewSchema = mongoose.Schema({
        rating: Number,
        title: String,
        comment: String,
        reviewer: {type: mongoose.Schema.ObjectId, ref: 'ProjectUser'},
        reviewedGame: {type: mongoose.Schema.ObjectId, ref: 'Game'},
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.review"});
    
    return ReviewSchema;
};