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
            .when("/user", {
                templateUrl: "views/user/profile-edit.view.client.html",
                controller: "ProfileEditController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:userId", {
                redirectTo: "/user"
            })
            .when("/game/:gameId", {
                templateUrl: "views/game/game-detail.view.client.html",
                controller: "GameDetailController",
                controllerAs: "model"
            })
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "model",
                resolve: {
                    getLoggedIn: getLoggedIn
                }
            });
        /*.otherwise({
         redirectTo: "/login"
         });*/

        function checkLoggedIn(UserService, $location, $q, $rootScope) {

            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        //console.log(user);
                        if(user == '0'){
                            $rootScope.currentUser = null;
                            deferred.reject();
                            $location.url("/login");
                        }
                        else{
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }

        function getLoggedIn(UserService, $q, $rootScope) {
            var deferred = $q.defer();

            UserService
                .loggedIn()
                .then(function (response) {
                    var currentUser = response.data;
                    if (currentUser) {
                        $rootScope.currentUser = currentUser;
                    }
                    deferred.resolve();
                });

            return deferred.promise;
        }

    }
})();