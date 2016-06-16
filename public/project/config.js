(function(){
    angular
        .module("GamersBay")
        .config(Config);

    function Config($routeProvider){
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:userId", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/game/:gameId", {
                templateUrl: "views/game/game-detail.view.client.html",
                controller: "GameDetailController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model"
            });
            /*.otherwise({
                redirectTo: "/login"
            });*/
    }
})();