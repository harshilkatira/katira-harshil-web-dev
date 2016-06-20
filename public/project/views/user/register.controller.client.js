(function () {
    angular
        .module("GamersBay")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(newUser) {
            if (newUser && newUser.username && newUser.password && newUser.verifyPassword) {
                if (newUser.password !== newUser.verifyPassword) {
                    vm.error = "Passwords do not match.";
                }
                else {
                    var user = {
                        username: newUser.username,
                        password: newUser.password,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        email: newUser.email
                    };
                    UserService
                        .register(user)
                        .then(
                            function (response) {
                                var user = response.data;
                                if (user) {
                                    $location.url("/user");
                                }
                            },
                            function (error) {
                                vm.error = error.data;
                            }
                        );
                }
            }
            else {
                vm.error = "Missing required fields."
            }
        }
    }
})();