(function(){
    angular
        .module("GamersBay")
        .factory("UserService", UserService);

    function UserService($http){
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            likeGame: likeGame,
            unlikeGame: unlikeGame
        };
        return api;

        function createUser(user) {
            var newUser = {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            };
            return $http.post("/project/api/user", newUser);
        }

        function findUserById(userId) {
            var url = "/project/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/project/api/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/project/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/project/api/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/project/api/user/"+userId;
            return $http.delete(url);
        }
        
        function likeGame(userId, gameId) {
            var url = "/project/api/user/"+userId+"/like/"+gameId;
            return $http.put(url);
        }
        
        function unlikeGame(userId, gameId) {
            var url = "/project/api/user/"+userId+"/unlike/"+gameId;
            return $http.put(url);
        }
    }
})();