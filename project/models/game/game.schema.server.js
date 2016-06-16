module.exports = function () {

    var mongoose = require("mongoose");

    var GameSchema = mongoose.Schema({
        _id: String,
        name: String,
        image: String,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "project.game"});
    
    return GameSchema;
};