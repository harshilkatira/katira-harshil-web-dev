(function () {
    angular
        .module("GamersBay")
        .controller("HomeController", HomeController);

    function HomeController($window, $location, GameService) {
        var vm = this;
        //vm.searchGames = searchGames;
        //vm.getMoreResults = getMoreResults;

        vm.platforms= [
            {
                id: 20,
                image: {
                    icon_url: "http://static.giantbomb.com/uploads/square_avatar/0/498/195092-xbox_360_console_02.jpg",
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/0/498/195092-xbox_360_console_02.jpg",
                    screen_url: "http://static.giantbomb.com/uploads/screen_medium/0/498/195092-xbox_360_console_02.jpg",
                    small_url: "http://static.giantbomb.com/uploads/scale_small/0/498/195092-xbox_360_console_02.jpg",
                    super_url: "http://static.giantbomb.com/uploads/scale_large/0/498/195092-xbox_360_console_02.jpg",
                    thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/0/498/195092-xbox_360_console_02.jpg",
                    tiny_url: "http://static.giantbomb.com/uploads/square_mini/0/498/195092-xbox_360_console_02.jpg"
                },
                name: "Xbox 360"
            },
            {
                id: 35,
                image: {
                    icon_url: "http://static.giantbomb.com/uploads/square_avatar/0/1992/1426360-logo.jpg",
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/0/1992/1426360-logo.jpg",
                    screen_url: "http://static.giantbomb.com/uploads/screen_medium/0/1992/1426360-logo.jpg",
                    small_url: "http://static.giantbomb.com/uploads/scale_small/0/1992/1426360-logo.jpg",
                    super_url: "http://static.giantbomb.com/uploads/scale_large/0/1992/1426360-logo.jpg",
                    thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/0/1992/1426360-logo.jpg",
                    tiny_url: "http://static.giantbomb.com/uploads/square_mini/0/1992/1426360-logo.jpg"
                },
                name: "PlayStation 3"
            },
            {
                id: 146,
                image: {
                    icon_url: "http://static.giantbomb.com/uploads/square_avatar/5/56742/2495936-9012444134_80ba47fd6e_o.jpg",
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/5/56742/2495936-9012444134_80ba47fd6e_o.jpg",
                    screen_url: "http://static.giantbomb.com/uploads/screen_medium/5/56742/2495936-9012444134_80ba47fd6e_o.jpg",
                    small_url: "http://static.giantbomb.com/uploads/scale_small/5/56742/2495936-9012444134_80ba47fd6e_o.jpg",
                    super_url: "http://static.giantbomb.com/uploads/scale_large/5/56742/2495936-9012444134_80ba47fd6e_o.jpg",
                    thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/5/56742/2495936-9012444134_80ba47fd6e_o.jpg",
                    tiny_url: "http://static.giantbomb.com/uploads/square_mini/5/56742/2495936-9012444134_80ba47fd6e_o.jpg"
                },
                name: "PlayStation 4"
            },
            {
                id: 94,
                image: {
                    icon_url: "http://static.giantbomb.com/uploads/square_avatar/0/3661/1650285-ibm_pc_5150.jpg",
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/0/3661/1650285-ibm_pc_5150.jpg",
                    screen_url: "http://static.giantbomb.com/uploads/screen_medium/0/3661/1650285-ibm_pc_5150.jpg",
                    small_url: "http://static.giantbomb.com/uploads/scale_small/0/3661/1650285-ibm_pc_5150.jpg",
                    super_url: "http://static.giantbomb.com/uploads/scale_large/0/3661/1650285-ibm_pc_5150.jpg",
                    thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/0/3661/1650285-ibm_pc_5150.jpg",
                    tiny_url: "http://static.giantbomb.com/uploads/square_mini/0/3661/1650285-ibm_pc_5150.jpg"
                },
                name: "PC"
            },
            {
                id: 17,
                image: {
                    icon_url: "http://static.giantbomb.com/uploads/square_avatar/0/5150/1500874-overview_gallery3_20090828.jpg",
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/0/5150/1500874-overview_gallery3_20090828.jpg",
                    screen_url: "http://static.giantbomb.com/uploads/screen_medium/0/5150/1500874-overview_gallery3_20090828.jpg",
                    small_url: "http://static.giantbomb.com/uploads/scale_small/0/5150/1500874-overview_gallery3_20090828.jpg",
                    super_url: "http://static.giantbomb.com/uploads/scale_large/0/5150/1500874-overview_gallery3_20090828.jpg",
                    thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/0/5150/1500874-overview_gallery3_20090828.jpg",
                    tiny_url: "http://static.giantbomb.com/uploads/square_mini/0/5150/1500874-overview_gallery3_20090828.jpg"
                },
                name: "Mac"
            },
            {
                id: 145,
                image: {
                    icon_url: "http://static.giantbomb.com/uploads/square_avatar/0/1992/2485895-xboxd_logo_consle_sensr_controller_f_greenbg_rgb_2013_610x610.jpg",
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/0/1992/2485895-xboxd_logo_consle_sensr_controller_f_greenbg_rgb_2013_610x610.jpg",
                    screen_url: "http://static.giantbomb.com/uploads/screen_medium/0/1992/2485895-xboxd_logo_consle_sensr_controller_f_greenbg_rgb_2013_610x610.jpg",
                    small_url: "http://static.giantbomb.com/uploads/scale_small/0/1992/2485895-xboxd_logo_consle_sensr_controller_f_greenbg_rgb_2013_610x610.jpg",
                    super_url: "http://static.giantbomb.com/uploads/scale_large/0/1992/2485895-xboxd_logo_consle_sensr_controller_f_greenbg_rgb_2013_610x610.jpg",
                    thumb_url: "http://static.giantbomb.com/uploads/scale_avatar/0/1992/2485895-xboxd_logo_consle_sensr_controller_f_greenbg_rgb_2013_610x610.jpg",
                    tiny_url: "http://static.giantbomb.com/uploads/square_mini/0/1992/2485895-xboxd_logo_consle_sensr_controller_f_greenbg_rgb_2013_610x610.jpg"
                },
                name: "Xbox One"
            }];

        vm.showSpinnerBottom = true;
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
                        vm.showSpinnerBottom = true;
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
            var x = windowBottom + (0.3*windowBottom);
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
                        vm.showSpinnerBottom = false;
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