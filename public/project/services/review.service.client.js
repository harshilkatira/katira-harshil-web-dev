(function(){
    angular
        .module("GamersBay")
        .factory("ReviewService", ReviewService);

    function ReviewService($http) {
        var api = {
            saveReview: saveReview,
            getAllReviewsByGameId: getAllReviewsByGameId,
            getAllReviewsByUserId: getAllReviewsByUserId,
            updateReview: updateReview,
            deleteReview: deleteReview
        };
        return api;

        function saveReview(review) {
            var url = "/project/api/review";

            return $http.post(url, review);
        }

        function getAllReviewsByGameId(gameId) {
            var url = "/project/api/review/game/"+gameId;

            return $http.get(url);
        }

        function getAllReviewsByUserId(userId) {
            var url = "/project/api/review/user/"+userId;

            return $http.get(url);
        }

        function updateReview(reviewId, review) {
            var url = "/project/api/review/"+reviewId;

            return $http.post(url, review);
        }
        
        function deleteReview(reviewId) {
            var url = "/project/api/review/"+reviewId;

            return $http.delete(url);
        }

    }
})();