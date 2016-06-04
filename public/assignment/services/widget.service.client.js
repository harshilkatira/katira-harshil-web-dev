(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService($http) {
        var api = {
            createWidget: createWidget,
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget
        };
        return api;
        
        function createWidget(pageId, widget) {
            var newWidget = {
                widgetType: widget.widgetType,
                pageId: pageId
            };
            var url = "/api/page/"+pageId+"/widget";
            return $http.post(url, newWidget);
        }
        
        function findWidgetsByPageId(pageId) {
            var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function findWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function updateWidget(widgetId, widget) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    widgets[i].name = widget.name;
                    widgets[i].text = widget.text;
                    switch (widget.widgetType){
                        case "HEADER":
                            widgets[i].size = widget.size;
                            break;
                        case "IMAGE":
                        case "YOUTUBE":
                            widgets[i].width = widget.width;
                            widgets[i].url = widget.url;
                            break;
                    }
                    return true;
                }
            }
            return false;
        }

        function deleteWidget(widgetId) {
            for(var i in widgets) {
                if (widgets[i]._id === widgetId) {
                    widgets.splice(i, 1);
                    return true;
                }
            }
            return false;
        }
    }
})();