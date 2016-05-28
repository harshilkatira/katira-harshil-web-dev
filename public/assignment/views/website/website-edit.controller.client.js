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
            var result = WebsiteService.updateWebsite(vm.websiteId, newWebsite);
            if(result){
                $location.url("/user/"+vm.userId+"/website");
            }
            else{
                vm.error = "Error updating website details."
            }
        }

        function deleteWebsite(websiteId){
            var result = WebsiteService.deleteWebsite(websiteId);
            if(result) {
                $location.url("/user/"+vm.userId+"/website");
            } else {
                vm.error = "Unable to delete website";
            }
        }
    }
})();