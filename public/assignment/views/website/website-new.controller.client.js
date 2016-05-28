(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);
    
    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        
        vm.userId = $routeParams.userId;

        function createWebsite(name, desc) {
            if(name) {
                var newWebsite = {
                    name: name,
                    description: desc
                };
                var result = WebsiteService.createWebsite(vm.userId, newWebsite);
                if (result) {
                    $location.url("/user/" + vm.userId + "/website");
                }
                else {
                    vm.error = "Unable to create website."
                }
            }
            else{
                vm.error = "Website name required."
            }
        }
    }
})();