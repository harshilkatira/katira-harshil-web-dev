(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);
    
    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;

        function init() {
            vm.website = angular.copy(WebsiteService.findWebsiteById(vm.websiteId))
        }
        init();

        function updateWebsite(newWebsite) {
            if(newWebsite.name) {
                var result = WebsiteService.updateWebsite(vm.websiteId, newWebsite);
                if (result) {
                    $location.url("/user/" + vm.userId + "/website");
                }
                else {
                    vm.error = "Error updating website details."
                }
            }
            else {
                vm.error = "Website name cannot be empty."
            }
        }

        function deleteWebsite(){
            var result = WebsiteService.deleteWebsite(vm.websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();