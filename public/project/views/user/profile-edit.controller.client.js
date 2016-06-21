(function () {
    angular
        .module("GamersBay")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService, $rootScope, ReviewService) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.logout = logout;

        vm.currentUser = $rootScope.currentUser;

        function init() {
            /*UserService
                .findUserById(vm.currentUser._id)
                .then(function (response) {
                    vm.user = response.data;
                });*/

            ReviewService
                .getAllReviewsByUserId(vm.currentUser._id)
                .then(
                    function (response) {
                        vm.reviewList = response.data;
                    },
                    function (error) {
                        console.log("error fetching user reviews");
                    }
                );
        }
        init();

        function updateUser(newUser) {
            UserService
                .updateUser(vm.currentUser._id, newUser)
                .then(
                    function (response) {
                        vm.success = "Your profile was saved.";
                    },
                    function (error) {
                        vm.error = "Error saving profile."
                    });
        }

        function logout() {
            $rootScope.currentUser = null;
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