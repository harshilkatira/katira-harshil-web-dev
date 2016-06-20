(function () {
    angular
        .module("GamersBay")
        .controller("NavbarController", NavbarController);
    
    function NavbarController($rootScope, $location, UserService) {
        var vm = this;
        vm.logout = logout;

        function logout() {
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