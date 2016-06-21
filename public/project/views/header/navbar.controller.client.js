(function () {
    angular
        .module("GamersBay")
        .controller("NavbarController", NavbarController);
    
    function NavbarController($rootScope, $location, UserService) {
        var vm = this;
        vm.logout = logout;

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