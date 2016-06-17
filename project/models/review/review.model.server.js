module.exports = function () {

    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server")();
    var Review = mongoose.model("Review", ReviewSchema);

    var api = {
        saveReview: saveReview,
        getAllReviewsByGameId: getAllReviewsByGameId,
        getAllReviewsByUserId: getAllReviewsByUserId,
        updateReview: updateReview,
        deleteReview: deleteReview
    };
    return api;

    function saveReview(review) {
        return Review.create(review);
    }

    function getAllReviewsByGameId(gameId) {
        return Review.find({gameId: gameId});
    }

    function getAllReviewsByUserId(userId) {
        return Review.find({userId: userId});
    }

    function updateReview(reviewId, review) {
        delete review._id;
        return Review
            .update({_id: reviewId},{
                $set: review
            });
    }

    function deleteReview(reviewId) {
        return Review.remove({_id: reviewId});
    }

};