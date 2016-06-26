(function () {
    angular
        .module("GamersBay")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($location, $routeParams, UserService, $rootScope, ReviewService) {
        var vm = this;
        vm.setActive = setActive;
        vm.updateUser = updateUser;
        vm.logout = logout;
        vm.deleteImage = deleteImage;
        vm.backToMenu = backToMenu;

        vm.currentUser = $rootScope.currentUser;

        vm.reviewList = [];
        vm.onlyData = false;

        function init() {
            /*UserService
             .findUserById(vm.currentUser._id)
             .then(function (response) {
             vm.user = response.data;
             });*/
            vm.activeMenu = "Liked Games";
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

        function deleteImage() {
            UserService
                .deleteImage(vm.currentUser._id)
                .then(
                    function (response) {
                        vm.currentUser.image = "http://knightslpc.com/wp-content/uploads/2016/06/Knights-LPC-Person-Placeholder.jpg";
                    },
                    function (error) {
                        vm.error = "unable to delete image";
                    }
                );
        }

        function setActive(menu, smallView) {
            vm.activeMenu = menu;

            if(smallView)
                vm.onlyData = true;

            switch (menu){
                case "Liked Games":
                    vm.data = vm.currentUser.likedGames;
                    break;
                case "Following":
                    UserService
                        .getUsersForIds(vm.currentUser.following)
                        .then(
                            function (response) {
                                vm.data = [];
                                for(var i in response){
                                    vm.data.push(response[i].data);
                                }
                                //console.log(vm.data);
                            },
                            function (error) {
                                console.log("error getting users");
                            }
                        );
                    break;
                case "Followers":
                    UserService
                        .getUsersForIds(vm.currentUser.followers)
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
                case "My Reviews":
                    vm.data = vm.reviewList;
                    break;
            }
        }

        function backToMenu() {
            vm.onlyData = false;
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