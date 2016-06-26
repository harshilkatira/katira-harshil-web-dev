(function () {
    angular
        .module("GamersBay")
        .controller("PlatformController", PlatformController);

    function PlatformController($window, $location, $routeParams, GameService, PlatformService) {
        var vm = this;
        //vm.searchGames = searchGames;
        //vm.getMoreResults = getMoreResults;
        //vm.searchGamesByPlatform = searchGamesByPlatform;

        vm.showSpinnerBottom = true;
        vm.offset = 0;
        vm.called = false;

        vm.platformId = $routeParams.platformId;

        function init() {

            vm.platforms = PlatformService.getAllPlatforms();

            vm.platform = PlatformService.getPlatformById(vm.platformId);

            console.log(vm.platform);

            if(!vm.platform){
                vm.error = "Unable to find games for this platform."
            }
            /*GameService
             .getPopularGamesList(vm.offset)
             .then(
             function (response) {
             //vm.games = response.results;
             vm.games = response.data.results;
             vm.offset = vm.offset + vm.games.length;
             vm.showSpinnerBottom = false;
             },
             function (error) {
             vm.games = error.status;
             }
             );*/
            GameService
                .searchGamesByPlatformId(vm.platformId, vm.offset)
                .then(
                    function (response) {
                        vm.games = response.data.results;
                        vm.offset = vm.offset + vm.games.length;
                        vm.showSpinnerBottom = false;
                    },
                    function (error) {
                        vm.error = "No games found."
                    }
                );
        }
        init();

        angular.element($window).bind("scroll", function() {
            var windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            var body = document.body, html = document.documentElement;
            var docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight,  html.scrollHeight, html.offsetHeight);
            windowBottom = windowHeight + window.pageYOffset;
            var x = windowBottom + (0.3*windowBottom);
            if (x >= docHeight && !vm.called) {
                x = 0;
                vm.showSpinnerBottom = true;
                getMoreResults();
            }});

        function getMoreResults() {
            vm.called = true;
            GameService
                .searchGamesByPlatformId(vm.platformId, vm.offset)
                .then(
                    function (response) {
                        vm.called = false;
                        vm.games = vm.games.concat(response.data.results);
                        vm.offset = vm.offset + vm.games.length;
                        vm.showSpinnerBottom = false;
                    },
                    function (error) {
                        vm.showSpinnerBottom = false;
                        console.log("error getting more data");
                    }
                );
        }
    }
})();