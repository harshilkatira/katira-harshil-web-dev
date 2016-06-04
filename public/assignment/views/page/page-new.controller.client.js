(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($location, $routeParams, PageService) {
        var vm = this;
        vm.createPage = createPage;

        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        function createPage(name, title) {
            if(name) {
                var newPage = {
                    name: name,
                    title: title
                };
                PageService
                    .createPage(vm.websiteId, newPage)
                    .then(function (response) {
                        var page = response.data;
                        if (page) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        }
                        else {
                            vm.error = "Unable to create page."
                        }
                    });
            }
            else{
                vm.error = "Page name required."
            }
        }
    }
})();