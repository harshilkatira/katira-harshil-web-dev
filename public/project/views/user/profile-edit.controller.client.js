(function () {
    angular
        .module("GamersBay")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.logout = logout;

        var userId = $rootScope.currentUser._id;

        function init() {
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(userId, newUser)
                .then(
                    function (response) {
                        vm.success = "Your profile was saved.";
                    },
                    function (error) {
                        vm.error = "Error saving profile."
                    });
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        $location.url("/login");
                    }
                );
        }
    }
})();