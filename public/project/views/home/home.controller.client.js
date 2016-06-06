(function () {
    angular
        .module("GamersBay")
        .controller("HomeController", HomeController);

    function HomeController(GameService) {
        var vm = this;

        function init() {
            GameService
                .getGamesList()
                .then(
                    function (response) {
                        vm.games = response.data.results;
                    },
                    function (error) {
                        vm.games = error.status;
                    }
                );
        }
        init();
    }
})();