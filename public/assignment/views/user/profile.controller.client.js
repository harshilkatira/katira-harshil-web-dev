(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.uid;

        function init() {
            vm.user = angular.copy(UserService.findUserById(id));
            console.log(vm.user);
        }
        init();

        function updateUser(newUser) {
            // console.log("here");
            var result = UserService.updateUser(id, newUser);
            if(result){
                vm.message = "Your profile was saved."
            }
            else{
                vm.error = "Error saving profile."
            }
        }

    }
})();