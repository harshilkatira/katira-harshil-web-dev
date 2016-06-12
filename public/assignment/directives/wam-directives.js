(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        function linker(scope, element, attributes) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                axis: "y",
                handle: ".sort-handle",
                start: function (event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function (event, ui) {
                    endIndex = ui.item.index();
                    scope.callback({
                        start: startIndex,
                        end: endIndex
                    });
                }
            });
        }
        return {
            scope: {
                callback: "&"
            },
            link: linker
        }
    }
})();