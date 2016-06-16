module.exports = function () {

    var mongoose = require("mongoose");

    var GameSchema = mongoose.Schema({
        id: Number,
        name: String,
        image: String,
        likedBy: [{type: mongoose.Schema.ObjectId, ref: 'ProjectUser'}],
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.game"});
    
    return GameSchema;
};