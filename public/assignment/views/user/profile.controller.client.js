(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams.uid;

        function init() {
            vm.user = UserService.findUserById(id);
        }
        init();

        function updateUser(newUser) {
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