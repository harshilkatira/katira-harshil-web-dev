(function () {
    angular
        .module("GamersBay")
        .controller("HomeController", HomeController);

    function HomeController($window, $location, GameService) {
        var vm = this;
        //vm.searchGames = searchGames;
        //vm.getMoreResults = getMoreResults;

        vm.showSpinnerBottom = false;
        vm.offset = 0;
        vm.called = false;

        function init() {
            GameService
                .getPopularGamesList(vm.offset)
                .then(
                    function (response) {
                        //vm.games = response.results;
                        vm.games = response.data.results;
                        vm.offset = vm.offset + vm.games.length;
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
            var x = windowBottom + (0.02*windowBottom);
            if (x >= docHeight && !vm.called) {
                x = 0;
                vm.showSpinnerBottom = true;
                getMoreResults();
            }});

        function getMoreResults() {
            vm.called = true;
            GameService
                .getPopularGamesList(vm.offset)
                .then(
                    function (response) {
                        vm.called = false;
                        vm.games = vm.games.concat(response.data.results);
                        vm.offset = vm.offset + vm.games.length;
                        vm.showSpinnerBottom = false;
                    },
                    function (error) {
                        console.log("error getting more data");
                    }
                );
        }

        /*function searchGames(searchText) {
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
         }*/
    }
})();