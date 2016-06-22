(function () {
    angular
        .module("GamersBay")
        .controller("LoginController", LoginController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            if (username && password) {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {
                            var user = response.data;
                            if (user) {
                                $location.url("/user");
                            }
                            else {
                                vm.error = "Unable to login.";
                            }
                        },
                        function (error) {
                            vm.error = "Invalid Username or Password.";
                        }
                    );
            }
            else{
                vm.error = "Username and Password are mandatory.";
            }
        }
    }
})();