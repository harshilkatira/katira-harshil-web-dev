module.exports = function () {

    var mongoose = require("mongoose");
    var ReviewSchema = require("./review.schema.server")();
    var Review = mongoose.model("Review", ReviewSchema);

    var api = {
        saveReview: saveReview,
        getAllReviewsByGameId: getAllReviewsByGameId,
        getAllReviewsByUserId: getAllReviewsByUserId,
        updateReview: updateReview,
        deleteReview: deleteReview,
        updateUserImage: updateUserImage
    };
    return api;

    function saveReview(review) {
        return Review.create(review);
    }

    function getAllReviewsByGameId(gameId) {
        return Review.find({"game._id": gameId});
    }

    function getAllReviewsByUserId(userId) {
        return Review.find({"user._id": userId});
    }

    function updateReview(reviewId, review) {
        delete review._id;
        review.timestamp = Date.now();
        return Review
            .update({_id: reviewId},{
                $set: review
            });
    }

    function deleteReview(reviewId) {
        return Review.remove({_id: reviewId});
    }

    function updateUserImage(userId, imageUrl) {
        return Review.update({"user._id": userId},{
            $set: {
                "user.image": imageUrl
            }
        });
    }

};