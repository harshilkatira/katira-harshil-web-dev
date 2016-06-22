(function () {
    angular
        .module("GamersBay")
        .controller("ViewProfileController", ViewProfileController);

    function ViewProfileController($location, $routeParams, UserService, $rootScope, ReviewService) {
        var vm = this;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;
        vm.setActive = setActive;
        vm.backToMenu = backToMenu;

        vm.userId = $routeParams.userId;

        vm.currentUser = $rootScope.currentUser;

        vm.reviewList = [];
        vm.onlyData = false;

        function init() {
            UserService
                .findUserById(vm.userId)
                .then(function (response) {
                    vm.user = response.data;
                    vm.activeMenu = "Liked Games";
                    vm.data = vm.user.likedGames;
                });

            vm.following = false;
            if(vm.currentUser) {
                if(vm.currentUser.following.indexOf(vm.userId) != -1){
                    vm.following = true;
                }
            }

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

        function setActive(menu, smallView) {
            vm.activeMenu = menu;

            if(smallView)
                vm.onlyData = true;

            switch (menu){
                case "Liked Games":
                    vm.data = vm.user.likedGames;
                    break;
                case "Following":
                    vm.data = vm.user.following;
                    break;
                case "Followers":
                    vm.data = vm.user.followers;
                    break;
                case "Reviews":
                    vm.data = vm.reviewList;
                    break;
            }
        }

        function backToMenu() {
            vm.onlyData = false;
        }

        function followUser() {
            if(vm.currentUser) {
                UserService
                    .followUser(vm.currentUser._id, vm.userId)
                    .then(
                        function (response) {
                            vm.following = true;
                            vm.user.followers.push(vm.currentUser._id);
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
                        var index = vm.user.followers.indexOf(vm.currentUser._id);
                        vm.user.followers.splice(index, 1);
                    },
                    function (error) {
                        console.log("error unfollowing user");
                    }
                );
        }
    }
})();