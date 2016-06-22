(function () {
    angular
        .module("GamersBay")
        .controller("GameDetailController", GameDetailController);

    function GameDetailController($sce, $routeParams, $rootScope, $location, GameService, UserService, ReviewService) {
        var vm = this;
        vm.getSafeHtml = getSafeHtml;
        vm.clickLike = clickLike;
        vm.unlikeGame = unlikeGame;
        vm.submitReview = submitReview;
        vm.viewProfile = viewProfile;

        vm.currentUser = $rootScope.currentUser;
        vm.gameId = $routeParams.gameId;

        function init() {

            GameService
                .getGameById(vm.gameId)
                .then(
                    function (response) {
                        vm.game = response.data.results;
                        /*if(vm.game.description) {
                         vm.game.description = vm.game.description
                         .split('<img')
                         .join('<img class="img-responsive col-xs-12"');
                         vm.game.description = vm.game.description
                         .split('<table')
                         .join('<div class="table-responsive">' +
                         '<table class="table table-condensed"');
                         vm.game.description = vm.game.description
                         .split('</table>')
                         .join('</table></div>');
                         }*/
                    },
                    function (error) {
                        vm.error = error.status;
                    }
                );

            vm.liked = false;
            if(vm.currentUser){
                var likedGames = vm.currentUser.likedGames;
                for(var i in likedGames){
                    if(likedGames[i]._id === vm.gameId){
                        vm.liked = true;
                        break;
                    }
                }
            }

            vm.review = {
                rating:0,
                title:"",
                comment:""
            };

            vm.reviewList = [];
            ReviewService
                .getAllReviewsByGameId(vm.gameId)
                .then(
                    function (response) {
                        vm.reviewList = response.data;
                    },
                    function (error) {
                        console.log("error finding reviews for game");
                    }
                );

            GameService
                .findStoredGameById(vm.gameId)
                .then(
                    function (response) {
                        vm.storedGame = response.data;
                    },
                    function (error) {
                        console.log("game is not stored");
                    }
                );
        }
        init();

        function getSafeHtml(desc) {
            return $sce.trustAsHtml(desc);
        }

        function clickLike() {
            if (vm.currentUser) {

                if (vm.storedGame) {
                    likeGame();
                }
                else {
                    storeTheGame()
                        .then(
                            function (response) {
                                vm.storedGame = response.data;
                                likeGame();
                            },
                            function (error) {
                                console.log("unable to store game");
                            }
                        );
                }
            }
            else {
                vm.error = "Please login to like a game";
            }
        }

        function storeTheGame() {
            var game = {
                _id: vm.gameId,
                name: vm.game.name,
                image: vm.game.image.medium_url
            };
            return GameService.storeGame(game);
        }

        function likeGame() {
            UserService
                .likeGame(vm.currentUser._id, vm.storedGame)
                .then(
                    function (response) {
                        vm.liked = true;
                    },
                    function (error) {
                        vm.error = "Unable to like game";
                    }
                );
        }

        function unlikeGame() {
            UserService
                .unlikeGame(vm.currentUser._id, vm.gameId)
                .then(
                    function (response) {
                        vm.liked = false;
                    },
                    function (error) {
                        vm.error = "Unable to unlike game";
                    }
                );
        }

        function submitReview(review) {
            if (vm.currentUser) {

                if (vm.storedGame) {
                    saveReview();
                }
                else {
                    storeTheGame()
                        .then(
                            function (response) {
                                vm.storedGame = response.data;
                                saveReview();
                            },
                            function (error) {
                                console.log("unable to store game");
                            }
                        );
                }
            }
            else {
                vm.error = "Please login to post review"
            }
        }

        function saveReview() {

            var user = {
                _id: vm.currentUser._id,
                username: vm.currentUser.username,
                image: vm.currentUser.image
            };

            var game = {
                _id: vm.storedGame._id,
                name: vm.storedGame.name,
                image: vm.storedGame.image
            };

            vm.review.user = user;
            vm.review.game = game;

            //console.log(vm.review);

            ReviewService
                .saveReview(vm.review)
                .then(
                    function (response) {
                        var newReview = response.data;
                        vm.reviewList.push(newReview);
                        vm.review = {};
                    },
                    function (error) {
                        vm.review = {};
                        vm.error = "unable to save review";
                    }
                );
        }

        function viewProfile(userId) {
            if(vm.currentUser && vm.currentUser._id === userId){
                $location.url("/user");
            }
            else{
                $location.url("/user/"+userId);
            }
        }
    }
})();