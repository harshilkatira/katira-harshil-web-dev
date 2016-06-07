(function () {
    angular
        .module("GamersBay")
        .controller("GameDetailController", GameDetailController);

    function GameDetailController($routeParams, GameService) {
        var vm = this;

        vm.gameId = $routeParams.gameId;

        function init() {
            GameService
                .getGameById(vm.gameId)
                .then(
                    function (response) {
                        vm.game = response.data.results;
                        if(vm.game.description) {
                            vm.game.description = vm.game.description
                                .split('<img').join('<img class="img-responsive col-xs-12"');
                        }
                    },
                    function (error) {
                        vm.error = error.status;
                    }
                );
        }
        init();
    }
})();