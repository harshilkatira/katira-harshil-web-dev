(function () {
    angular
        .module("GamersBay")
        .factory("GameService", GameService);
    
    var key = "9ffe43eed92d72de9aa7dbe4fbe8c71bde9a7bb2";
    var urlBase = "http://www.giantbomb.com/api/RESOURCE/?api_key=API_KEY&format=jsonp&json_callback=JSON_CALLBACK";

    function GameService($http) {
        var api = {
            getGamesList: getGamesList,
            getGameById: getGameById
        };
        return api;
        
        function getGamesList() {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "games");
            return $http.jsonp(url);
        }

        function getGameById(gameId) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "game/"+gameId);
            return $http.jsonp(url);
        }
    }
})();