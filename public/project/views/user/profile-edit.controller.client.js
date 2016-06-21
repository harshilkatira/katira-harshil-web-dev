(function () {
    angular
        .module("GamersBay")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService, $rootScope, ReviewService) {
        var vm = this;
        vm.setActive = setActive;
        vm.updateUser = updateUser;
        vm.logout = logout;

        vm.currentUser = $rootScope.currentUser;

        vm.reviewList = [];

        function init() {
            /*UserService
                .findUserById(vm.currentUser._id)
                .then(function (response) {
                    vm.user = response.data;
                });*/
            vm.activeMenu = "My Games";
            vm.data = vm.currentUser.likedGames;

            ReviewService
                .getAllReviewsByUserId(vm.currentUser._id)
                .then(
                    function (response) {
                        vm.reviewList = response.data;
                        //console.log(vm.reviewList);
                    },
                    function (error) {
                        console.log("error fetching user reviews");
                    }
                );
        }
        init();

        function setActive(menu) {
            vm.activeMenu = menu;
            switch (menu){
                case "My Games":
                    vm.data = vm.currentUser.likedGames;
                    break;
                case "Following":
                    vm.data = vm.currentUser.following;
                    break;
                case "Followers":
                    vm.data = vm.currentUser.followers;
                    break;
                case "My Reviews":
                    vm.data = vm.reviewList;
                    break;
            }
        }

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