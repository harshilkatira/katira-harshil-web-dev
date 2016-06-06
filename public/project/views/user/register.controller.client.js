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
                    UserService
                        .findUserByUsername(newUser.username)
                        .then(function (response) {
                            var user = response.data;
                            if (user._id) {
                                vm.error = "Username already exists.";
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
                                    .createUser(user)
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