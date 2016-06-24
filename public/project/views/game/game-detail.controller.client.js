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
        vm.deleteReview = deleteReview;
        vm.getYoutubeURL = getYoutubeURL;


        vm.currentUser = $rootScope.currentUser;
        vm.gameId = $routeParams.gameId;

        function init() {
            vm.videos = 1;
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
                        //console.log(vm.game);

                        //For GB vidoes
                        /*var videos = vm.game.videos;
                        videos.splice(5);
                        return GameService
                            .getVideos(videos);*/

                        return GameService
                            .searchIGDBGame(vm.game.name);


                    },
                    function (error) {
                        vm.error = error.status;
                    }
                )
                .then(
                    function (response) {
                        var games = response.data.games;
                        //console.log(games);
                        return GameService
                                .getIGDBGame(games[0].id);
                    }
                )
                .then(
                    function (response) {
                        vm.videos = response.data.game.videos;
                        //console.log(vm.IGDBGame);
                    }
                );
            //For GB videos
                /*.then(
                    function (response) {

                        vm.gameVideos = [];
                        for(var i in response){
                            vm.gameVideos.push(response[i].data.results);
                        }
                        console.log(vm.gameVideos);
                    },
                    function (error) {
                        console.log("error getting videos");
                    }
                );*/

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

            //vm.review = {};

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


        function getYoutubeURL(youtubeId) {
            var url = "https://www.youtube.com/embed/"+youtubeId;
            return $sce.trustAsResourceUrl(url);
        }

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
            if (review) {
                vm.reviewError = "";
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
            else{
                vm.reviewError = "Please enter a review"
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
                        vm.review = undefined;
                    },
                    function (error) {
                        vm.review = {};
                        vm.error = "Unable to save review";
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

        function deleteReview(reviewId) {
            ReviewService
                .deleteReview(reviewId)
                .then(
                    function (response) {
                        for(var i in vm.reviewList){
                            if(vm.reviewList[i]._id === reviewId){
                                vm.reviewList.splice(i,1);
                                break;
                            }
                        }
                    },
                    function (error) {
                        vm.error = "Unable to delete review"
                    }
                );
        }
    }
})();