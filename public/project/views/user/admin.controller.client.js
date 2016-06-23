(function () {
    angular
        .module("GamersBay")
        .controller("AdminController", AdminController);

    function AdminController(UserService) {
        var vm = this;

        function init() {
            UserService
                .findAllUsers()
                .then(
                    function (response) {
                        vm.users = response.data;
                    },
                    function (error) {
                        vm.error = "Unable to get users data."
                    }
                );
        }
        init();
    }
})();