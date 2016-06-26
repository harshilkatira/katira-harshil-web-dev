(function () {
    angular
        .module("GamersBay")
        .factory("GameService", GameService);

    var key = "9ffe43eed92d72de9aa7dbe4fbe8c71bde9a7bb2";
    var urlBase = "http://www.giantbomb.com/api/RESOURCE/?api_key=API_KEY&format=jsonp&json_callback=JSON_CALLBACK";

    var detailFieldList = "&field_list=aliases,deck,description,developers,expected_release_month," +
        "expected_release_year,franchises,genres,id,image,images,name,original_release_date," +
        "platforms,publishers,similar_games,themes,videos";

    var searchFieldList = "&field_list=deck,developers,expected_release_month," +
        "expected_release_year,franchises,genres,id,image,name,original_release_date," +
        "platforms,publishers";

    var gamesFieldList = "&field_list=deck,id,image,name,platforms";

    var limit = "&limit=6";

    var popularSort = "&sort=number_of_user_reviews:desc";

    var platformSort = "&sort=date_added:desc";

    var search = "&query=QUERY&resources=game";

    var offset = "&offset=OFFSET";

    var page = "&page=PAGENO";

    /*var results6 = {
    data:{
        results: [
            {
                deck: "Take on the role of Niko Bellic, a Serbian immigrant who comes to the US at his cousin Roman's request, to find a better life, search for 'that special someone' and participate in lawless activities in an upgraded generation of Liberty City.",
                expected_release_month: null,
                expected_release_year: null,
                id: 20457,
                image: {
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/9/93770/2446670-gta_1446_a023.jpg"
                },
                name: "Grand Theft Auto IV",
                original_release_date: "2008-04-29 00:00:00"
            },
            {
                deck: "In Bethesda's first-person revival of the classic post-apocalyptic RPG series, the player is forced to leave Vault 101 and venture out into the irradiated wasteland of Washington D.C. to find his or her father.",
                expected_release_month: null,
                expected_release_year: null,
                id: 20504,
                image: {
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/8/87790/1974388-box_fallout3.png"
                },
                name: "Fallout 3",
                original_release_date: "2008-10-28 00:00:00"
            },
            {
                deck: "In 2014, war has become so routine that it is at the core of the global economy. A rapidly aging Solid Snake picks up his gun and embarks upon his final mission in this epic tale of tactical espionage action -- the conclusion to the Solid Snake saga.",
                expected_release_month: null,
                expected_release_year: null,
                id: 20669,
                image: {
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/9/93770/2355512-ps3_mgs4gunsofthepatriots_8.jpg"
                },
                name: "Metal Gear Solid 4: Guns of the Patriots",
                original_release_date: "2008-06-12 00:00:00"
            },
            {
                deck: "Call of Duty 4: Modern Warfare ditches the World War II motif of the past Call of Duty games to tell a story set in contemporary times, and backs it up with a solid, feature-rich multiplayer mode.",
                expected_release_month: null,
                expected_release_year: null,
                id: 2133,
                image: {
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/8/87790/1875205-box_cod4.png"
                },
                name: "Call of Duty 4: Modern Warfare",
                original_release_date: "2007-11-05 00:00:00"
            },
            {
                deck: "Venture into the mysterious, Utopian city of Rapture and discover what exactly has gone wrong in this first-person epic.",
                expected_release_month: null,
                expected_release_year: null,
                id: 17280,
                image: {
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/8/82063/2584146-bioshock.jpg"
                },
                name: "BioShock",
                original_release_date: "2007-08-21 00:00:00"
            },
            {
                deck: "Borderlands is a first-person shooter RPG from Gearbox Software that puts players into the shoes of one of four playable characters as they traverse the hostile planet of Pandora in search of a mysterious 'Vault', said to contain priceless unknown riches and alien technologies.",
                expected_release_month: null,
                expected_release_year: null,
                id: 20487,
                image: {
                    medium_url: "http://static.giantbomb.com/uploads/scale_medium/8/82063/2560037-blclean.jpg"
                },
                name: "Borderlands",
                original_release_date: "2009-10-20 00:00:00"
            }
        ]
        }
    };*/

    function GameService($http, $q) {
        var api = {
            getPopularGamesList: getPopularGamesList,
            searchGamesByPlatformId: searchGamesByPlatformId,
            getGameById: getGameById,
            searchGames: searchGames,
            storeGame: storeGame,
            findStoredGameById: findStoredGameById,
            getVideos: getVideos,
            searchIGDBGame: searchIGDBGame,
            getIGDBGame: getIGDBGame,
            findSimilarGames: findSimilarGames
        };
        return api;

        function getPopularGamesList(offsetValue) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "games");

            url = url + limit + popularSort + gamesFieldList + offset;

            url = url.replace("OFFSET", offsetValue);

            // if(offsetValue === 0){
            //     var deferred = $q.defer();
            //     setTimeout(function() {
            //     deferred.resolve(results6);
            //     }, 1000);
            //     return deferred.promise;
            // }
            // else {
                return $http.jsonp(url);
            //}
        }
        
        function searchGamesByPlatformId(platformId, offsetValue) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "games");

            url = url + limit + platformSort+ gamesFieldList + offset;

            url = url.replace("OFFSET", offsetValue);

            url = url + "&platforms="+platformId;

            console.log(url);

            return $http.jsonp(url);
        }

        function getGameById(gameId) {

            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "game/"+gameId);

            url += detailFieldList;

            return $http.jsonp(url);
        }

        function searchGames(searchTerm, pageno) {

            var url = urlBase + search + limit + searchFieldList+ page;

            url = url
                .replace("API_KEY", key)
                .replace("RESOURCE", "search")
                .replace("QUERY", searchTerm)
                .replace("PAGENO", pageno);

            return $http.jsonp(url);
        }

        function storeGame(game) {
            var url = "/project/api/game";

            return $http.post(url, game);
        }

        function findStoredGameById(gameId) {
            var url = "/project/api/game/"+gameId;

            return $http.get(url);
        }

        function getVideos(videos){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "video/VIDEOID");

            var promiseArray = [];
            var results = [];

            for(var i in videos){
                var id = videos[i].id;
                promiseArray
                    .push($http.jsonp(url.replace("VIDEOID", id))
                        .success(function (response) {
                            //console.log(response);
                            results.push(response);
                        }));
            }
            return $q.all(promiseArray);

            //return $http.jsonp(url);
        }

        function findSimilarGames(similarGames) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("RESOURCE", "game/GAMEID");

            url = url + "&field_list=id,image,name";

            var promiseArray = [];
            var results = [];
            for(var i in similarGames){
                var id = similarGames[i].id;
                promiseArray
                    .push($http.jsonp(url.replace("GAMEID", id))
                        .success(function (response) {
                            //console.log(response);
                            results.push(response);
                        }));
            }
            return $q.all(promiseArray);
        }

        function searchIGDBGame(gameName) {
            var url = "https://crossorigin.me/https://www.igdb.com/api/v1/games/search?token=nqfTe348L9jQMzWCeMKzVjjltsoj3K6Yku4Aq9ERvf4&q="+gameName;
            return $http.get(url);
        }

        function getIGDBGame(gameId) {
            var gameURL = "https://crossorigin.me/https://www.igdb.com/api/v1/games/"+gameId+"?token=nqfTe348L9jQMzWCeMKzVjjltsoj3K6Yku4Aq9ERvf4";
            return $http.get(gameURL);
        }

    }
})();