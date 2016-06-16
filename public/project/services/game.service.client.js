(function () {
    angular
        .module("GamersBay")
        .factory("GameService", GameService);

    function GameService($http) {
        var api = {
            getPopularGamesList: getPopularGamesList,
            getGameById: getGameById,
            searchGames: searchGames,
            storeGame: storeGame,
            findStoredGameById: findStoredGameById,
            likeGame: likeGame,
            unlikeGame: unlikeGame
        };
        return api;

        var key = "9ffe43eed92d72de9aa7dbe4fbe8c71bde9a7bb2";
        var urlBase = "http://www.giantbomb.com/api/RESOURCE/?api_key=API_KEY&format=jsonp&json_callback=JSON_CALLBACK";

        var detailFieldList = "&field_list=aliases,deck,description,developers,expected_release_month," +
            "expected_release_year,franchises,genres,id,image,images,name,original_release_date," +
            "platforms,publishers,similar_games,themes,videos";

        var searchFieldList = "&field_list=aliases,deck,developers,expected_release_month," +
            "expected_release_year,franchises,genres,id,image,name,original_release_date," +
            "platforms,publishers";

        var limit = "&limit=15";

        var sort = "&sort=number_of_user_reviews:desc";

        var search = "&query=QUERY&resources=game";

        var page = "&page=PAGENO";

        function getPopularGamesList() {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "games");

            url = url + limit + sort + searchFieldList + page;

            return $http.jsonp(url);
        }

        function getGameById(gameId) {

            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "game/"+gameId);

            url += detailFieldList;

            return $http.jsonp(url);
        }

        function searchGames(searchTerm) {

            var url = urlBase + search + limit + searchFieldList;

            url = url
                .replace("API_KEY", key)
                .replace("RESOURCE", "search")
                .replace("QUERY", searchTerm);


            return $http.jsonp(url);
        }

        function storeGame(game) {
            var url = "/projectapi/game";

            return $http.post(url);
        }

        function findStoredGameById(gameId) {
            var url = "/projectapi/game/"+gameId;

            return $http.get(url);
        }

        function likeGame() {

        }

        function unlikeGame() {

        }
    }
})();