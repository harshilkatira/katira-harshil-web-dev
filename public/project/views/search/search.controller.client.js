(function () {
    angular
        .module("GamersBay")
        .controller("SearchController", SearchController);

    function SearchController($window, $routeParams, GameService) {
        var vm = this;
        vm.searchGames = searchGames;
        vm.getMoreResults = getMoreResults;

        vm.searchText = $routeParams.searchText;
        vm.showSpinnerBottom = false;
        vm.pageNo = 1;
        vm.games = [];

        function init() {
            GameService
                .searchGames(vm.searchText, vm.pageNo)
                .then(
                    function (response) {
                        vm.games = response.data.results;
                        vm.pageNo = ((response.data.offset)/(response.data.limit)) + 2;
                        console.log(response.data);
                    },
                    function (error) {
                        vm.games = error.status;
                    }
                );
        }
        init();

        angular.element($window).bind("scroll", function() {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                vm.showSpinnerBottom = true;
                vm.getMoreResults();
            }});

        function getMoreResults() {
            GameService
                .searchGames(vm.searchText, vm.pageNo+1)
                .then(
                    function (response) {
                        vm.games = vm.games.concat(response.data.results);
                        vm.pageNo = ((response.data.offset)/(response.data.limit)) + 2;
                        vm.showSpinnerBottom = true;
                    },
                    function (error) {
                        console.log("error getting more data");
                    }
                );
        }

        function searchGames() {
            vm.games = [];
            vm.pageNo = 1;
            GameService
                .searchGames(vm.searchText, vm.pageNo)
                .then(
                    function (response) {
                        vm.games = response.data.results;
                        vm.pageNo = ((response.data.offset)/(response.data.limit)) + 2;
                    },
                    function (error) {
                        console.log("Error searching games");
                    }
                );
        }
    }
})();