(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    
    function EditWidgetController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.updateHeader = updateHeader;
        vm.updateMedia = updateMedia;
        vm.deleteWidget = deleteWidget;
        
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.widgetId = $routeParams.widgetId;

        function init() {
            WidgetService
                .findWidgetById(vm.widgetId)
                .then(function (response) {
                    vm.widget = response.data;
                });
        }
        init();

        function updateHeader(newWidget) {
            if(newWidget.text && newWidget.size) {
                WidgetService
                    .updateWidget(vm.widgetId, newWidget)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.error = "Error updating widget details."
                        }
                    );
            }
            else{
                vm.error = "Text and Size are required fields.";
            }
        }

        function updateMedia(newWidget) {
            if(newWidget.url && newWidget.width) {
                WidgetService
                    .updateWidget(vm.widgetId, newWidget)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function (error) {
                            vm.error = "Error updating widget details."
                        }
                    );
            }
            else{
                vm.error = "URL and Width are required fields.";
            }
        }

        function deleteWidget(){
            var result = WidgetService.deleteWidget(vm.widgetId);
            if(result) {
                $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
            } else {
                vm.error = "Unable to delete widget";
            }
        }
    }
})();