(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var userId = $routeParams.userId;

        function init() {
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();

        function updateUser(newUser) {
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