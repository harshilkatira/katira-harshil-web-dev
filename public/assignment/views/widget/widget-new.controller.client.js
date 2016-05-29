(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    
    function NewWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.createWidget = createWidget;
        
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;

        function createWidget(widgetType) {
            var newWidget = {
                widgetType: widgetType
            };
            var result = WidgetService.createWidget(vm.pageId, newWidget);
            if (result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + result._id);
            }
            else {
                vm.error = "Unable to create widget."
            }
        }
    }
})();