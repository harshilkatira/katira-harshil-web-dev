(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function init() {
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .then(function (response) {
                    vm.website = response.data;
                });
        }
        init();

        function updateWebsite(newWebsite) {
            if(newWebsite.name) {
                WebsiteService
                    .updateWebsite(vm.websiteId, newWebsite)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website");
                        },
                        function (error) {
                            vm.error = "Error updating website details."
                        });
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