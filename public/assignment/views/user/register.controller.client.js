(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if (username && password && verifyPassword) {
                if (password !== verifyPassword) {
                    vm.error = "Password and Verify Password fields do not match.";
                }
                else {
                    UserService
                        .register(username, password)
                        .then(
                            function (response) {
                                var user = response.data;
                                if (user) {
                                    $location.url("/user/" + user._id);
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