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

            if(vm.currentUser && vm.userId === vm.currentUser._id){
                $location.url("/user");
            }

            UserService
                .findUserById(vm.userId)
                .then(
                    function (response) {
                        vm.user = response.data;
                        if(!vm.user._id){
                            $location.url("/home");
                        }
                        vm.activeMenu = "Liked Games";
                        vm.data = vm.user.likedGames;
                    },
                    function (error) {
                        $location.url("/home");
                    }
                );

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
                    UserService
                        .getUsersForIds(vm.user.following)
                        .then(
                            function (response) {
                                vm.data = [];
                                for(var i in response){
                                    vm.data.push(response[i].data);
                                }
                            },
                            function (error) {
                                console.log("error getting users");
                            }
                        );
                    break;
                case "Followers":
                    UserService
                        .getUsersForIds(vm.user.followers)
                        .then(
                            function (response) {
                                vm.data = [];
                                for(var i in response){
                                    vm.data.push(response[i].data);
                                }
                            },
                            function (error) {
                                console.log("error getting users");
                            }
                        );
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