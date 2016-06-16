(function () {
    angular
        .module("GamersBay")
        .controller("HomeController", HomeController);

    function HomeController(GameService) {
        var vm = this;
        vm.searchGames = searchGames;

        function init() {
            GameService
                .getPopularGamesList()
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

        function searchGames(searchText) {
            GameService
                .searchGames(searchText)
                .then(
                    function (response) {
                        vm.games = response.data.results;
                    },
                    function (error) {
                        vm.games = error.status;
                    }
                );
        }
    }
})();