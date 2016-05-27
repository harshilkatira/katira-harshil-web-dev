(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);
    
    function ProfileController(UserService) {
        var vm = this;

        vm.login = login;

        function login(username, password) {
            var user = UserService.findUserByCredentials(username, password);
            if(user){
                $location.url("/user/"+user._id);
            }
            else{
                vm.error = "User not found..";
            }
        }
    }
})();