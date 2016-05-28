(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var userId = $routeParams.userId;

        function init() {
            vm.user = angular.copy(UserService.findUserById(userId));
        }
        init();

        function updateUser(newUser) {
            // console.log("here");
            var result = UserService.updateUser(userId, newUser);
            if(result){
                vm.message = "Your profile was saved."
            }
            else{
                vm.error = "Error saving profile."
            }
        }

    }
})();