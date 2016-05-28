(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);
    
    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;
        
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.wid;

        function createPage(name, title) {
            if(name) {
                var newPage = {
                    name: name,
                    title: title
                };
                var result = PageService.createPage(vm.websiteId, newPage);
                if (result) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                }
                else {
                    vm.error = "Unable to create page."
                }
            }
            else{
                vm.error = "Page name required."
            }
        }
    }
})();