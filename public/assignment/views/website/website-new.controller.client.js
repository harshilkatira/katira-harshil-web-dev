(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);
    
    function NewWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.createWebsite = createWebsite;
        
        vm.userId = $routeParams.uid;

        function createWebsite(name, desc) {
            var newWebsite = {
                name: name,
                description: desc
            };
            var result = WebsiteService.createWebsite(vm.userId, newWebsite);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }
            else{
                vm.error = "Unable to create website."
            }
        }
    }
})();