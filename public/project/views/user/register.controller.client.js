(function () {
    angular
        .module("GamersBay")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (username && password && verifyPassword) {
                if (password !== verifyPassword) {
                    vm.error = "Passwords do not match.";
                }
                else {
                    UserService
                        .findUserByUsername(username)
                        .then(function (response) {
                            var user = response.data;
                            if (user._id) {
                                vm.error = "Username already exists.";
                            }
                            else {
                                var newUser = {
                                    username: username,
                                    password: password
                                };
                                UserService
                                    .createUser(newUser)
                                    .then(function (response) {
                                        var user = response.data;
                                        if (user) {
                                            $location.url("/user/" + user._id);
                                        }
                                        else {
                                            vm.error = "Unable to create new user."
                                        }
                                    });
                            }
                        });
                }
            }
            else {
                vm.error = "Missing required fields."
            }
        }
    }
})();