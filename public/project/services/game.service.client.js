(function () {
    angular
        .module("GamersBay")
        .factory("GameService", GameService);
    
    var key = "9ffe43eed92d72de9aa7dbe4fbe8c71bde9a7bb2";
    var urlBase = "http://www.giantbomb.com/api/RESOURCE/?api_key=API_KEY&format=jsonp&json_callback=JSON_CALLBACK";

    var fieldList = "&field_list=aliases,deck,description,developers,expected_release_month," +
        "expected_release_year,franchises,genres,id,image,images,name,original_release_date," +
        "platforms,publishers,similar_games,themes,videos";

    var limit = "&limit=15";

    var sort = "&sort=number_of_user_reviews:desc";

    var search = "&query=QUERY&resources=game";

    function GameService($http) {
        var api = {
            getPopularGamesList: getPopularGamesList,
            getGameById: getGameById,
            searchGames: searchGames
        };
        return api;
        
        function getPopularGamesList() {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "games");

            url = url + limit + sort;
            return $http.jsonp(url);
        }

        function getGameById(gameId) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "game/"+gameId);

            url +=fieldList;

            return $http.jsonp(url);
        }

        function searchGames(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "search");
            url = url + search + limit + sort + fieldList;
            url = url.replace("QUERY", searchTerm);

            return $http.jsonp(url);
        }
    }
})();