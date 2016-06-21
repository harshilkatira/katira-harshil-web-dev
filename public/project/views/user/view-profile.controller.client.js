(function () {
    angular
        .module("GamersBay")
        .controller("ViewProfileController", ViewProfileController);

    function ViewProfileController($location, $routeParams, UserService, $rootScope, ReviewService) {
        var vm = this;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.setActive = setActive;

        vm.userId = $routeParams.userId;

        vm.currentUser = $rootScope.currentUser;

        vm.reviewList = [];

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                });

            vm.following = false;
            if(vm.currentUser) {
                if(vm.currentUser.following.indexOf(vm.userId) != -1){
                    vm.following = true;
                }
            }

            vm.activeMenu = "Liked Games";
            vm.data = vm.currentUser.likedGames;

            ReviewService
                .getAllReviewsByUserId(vm.userId)
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

        function setActive(menu) {
            vm.activeMenu = menu;
            switch (menu){
                case "Liked Games":
                    vm.data = vm.currentUser.likedGames;
                    break;
                case "Following":
                    vm.data = vm.currentUser.following;
                    break;
                case "Followers":
                    vm.data = vm.currentUser.followers;
                    break;
                case "Reviews":
                    vm.data = vm.reviewList;
                    break;
            }
        }


        function followUser() {
            if(vm.currentUser) {
                UserService
                    .followUser(vm.currentUser._id, vm.userId)
                    .then(
                        function (response) {
                            vm.following = true;
                        },
                        function (error) {
                            console.log("error following user");
                        }
                    );
            }
            else{
                vm.error = "Please login to follow";
            }
        }

        function unfollowUser() {
            UserService
                .unfollowUser(vm.currentUser._id, vm.userId)
                .then(
                    function (response) {
                        vm.following = false;
                    },
                    function (error) {
                        console.log("error unfollowing user");
                    }
                );
        }
    }
})();