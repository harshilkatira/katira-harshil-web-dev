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
                WebsiteService
                    .createWebsite(vm.userId, newWebsite)
                    .then(function (response) {
                        var website = response.data;
                        if (website) {
                            $location.url("/user/" + vm.userId + "/website");
                        }
                        else {
                            vm.error = "Unable to create website."
                        }
                    });
            }
            else{
                vm.error = "Website name required."
            }
        }
    }
})();