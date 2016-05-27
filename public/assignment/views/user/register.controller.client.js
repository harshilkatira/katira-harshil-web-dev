(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;

        function register(username, password, verifyPassword) {
            if(password!==verifyPassword){
                vm.error = "Passwords do not match.";
            }
            else{
                var userPresent = UserService.findUserByUsername(username);
                if(userPresent){
                    vm.error = "Username already exists.";
                }
                else{
                    var newUser = {
                        username: username,
                        password: password,
                        firstName: "",
                        lastName: ""
                    };
                    var result = UserService.createUser(newUser);
                    if(result){
                        $location.url("/user/"+result._id);
                    }
                    else{
                        vm.error = "Unable to create new user."
                    }
                }
            }
        }
    }
})();