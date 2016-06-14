(function () {
    angular
        .module("GamersBay")
        .controller("GameDetailController", GameDetailController);

    function GameDetailController($sce, $routeParams, GameService) {
        var vm = this;
        vm.getSafeHtml = getSafeHtml;

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
        }
        init();

        function getSafeHtml(desc) {
            return $sce.trustAsHtml(desc);
        }
    }
})();