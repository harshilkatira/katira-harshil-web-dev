(function () {
    angular
        .module("GamersBay")
        .controller("AdminController", AdminController);

    function AdminController($location, $rootScope, UserService) {
        var vm = this;
        vm.remove = remove;
        vm.update = update;
        vm.add = add;
        vm.select = select;

        var user = $rootScope.currentUser;


        function init() {
            if(!user){
                $location.url("/login");
            }

            vm.selected = false;
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                        vm.inputUser = {};
                        vm.selected = false;
                    }, error);
        }
        init();

        function remove(user) {
            if(user.role != "admin") {
                UserService
                    .deleteUser(user._id)
                    .then(
                        function (response) {
                            for (var i in vm.users) {
                                if (vm.users[i]._id === user._id) {
                                    vm.users.splice(i, 1);
                                }
                            }
                        }, error);
            }
            else{
                vm.error = "Unable to delete admin."
            }
        }

        function update(user) {
            UserService
                .updateUser(user._id, user)
                .then(
                    function (response) {
                        vm.inputUser = {};
                        vm.selected = false;
                        for(var i in vm.users){
                            if(vm.users[i]._id === user._id){
                                vm.users.splice(i,1);
                            }
                        }
                        vm.users.push(user);
                    }, error);
        }

        function add(user) {
            if(user.username) {
                UserService
                    .createUser(user)
                    .then(
                        function (response) {
                            vm.inputUser = {};
                            vm.selected = false;
                            vm.users.push(response.data);
                        }, error);
            }
            else{
                vm.error = "Username is mandatory.";
            }
        }

        function select(user) {
            vm.inputUser = angular.copy(user);
            vm.selected = true;
        }

        function success(response) {
            console.log(response.data);
            
        }

        function error(error) {
            vm.error = "Error creating/updating user";
        }
    }
})();