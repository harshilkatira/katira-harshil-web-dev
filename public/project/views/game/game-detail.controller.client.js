(function () {
    angular
        .module("GamersBay")
        .controller("GameDetailController", GameDetailController);

    function GameDetailController($sce, $routeParams, GameService, UserService) {
        var vm = this;
        vm.getSafeHtml = getSafeHtml;
        vm.clickLikeDislike = clickLikeDislike;

        vm.gameId = $routeParams.gameId;
        vm.userId = "576344eb500837143f0b8f11";

        function init() {

            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                    },
                    function (error) {
                        console.log("unable to get user by Id");
                    }
                );

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
        
        function clickLikeDislike() {
            if(vm.storedGame) {
                if (vm.user.likedGames.indexOf(vm.gameId) === -1) {
                    likeGame();
                }
                else {
                    dislikeGame();
                }
            }
            else{
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
                .likeGame(vm.userId, vm.gameId)
                .then(
                    function (response) {
                        vm.liked = true;
                    },
                    function (error) {
                        vm.error = "Unable to like game";
                    }
                );
        }

        function dislikeGame() {
            UserService
                .unlikeGame(vm.userId, vm.gameId)
                .then(
                    function (response) {
                        vm.liked = false;
                    },
                    function (error) {
                        vm.error = "Unable to unlike game";
                    }
                );
        }
    }
})();