module.exports = function (app,models) {

    var reviewModel = models.reviewModel;

    app.post("/project/api/review", saveReview);
    app.get("/project/api/review/game/:gameId",getAllReviewsByGameId);
    app.get("/project/api/review/user/:userId",getAllReviewsByUserId);
    app.put("/project/api/review/:reviewId", updateReview);
    app.delete("/project/api/review/:reviewId", deleteReview);

    function saveReview(req, res) {
        var review = req.body;

        reviewModel
            .saveReview(review)
            .then(
                function (review) {
                    res.json(review);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
    }

    function getAllReviewsByGameId(req, res) {
        var gameId = req.params.gameId;

        reviewModel
            .getAllReviewsByGameId(gameId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function getAllReviewsByUserId(req, res) {
        var userId = req.params.userId;

        reviewModel
            .getAllReviewsByUserId(userId)
            .then(
                function (reviews) {
                    res.json(reviews);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function updateReview(req, res) {
        var reviewId = req.params.reviewId;
        var review = req.body;

        reviewModel
            .updateReview(reviewId, review)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

    function deleteReview(req, res) {
        var reviewId = req.params.reviewId;

        reviewModel
            .deleteReview(reviewId)
            .then(
                function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                }
            );
    }

};