(function(){
    angular
        .module("GamersBay")
        .factory("UserService", UserService);

    function UserService($http){
        var api = {
            createUser: createUser,
            register: register,
            login: login,
            logout: logout,
            loggedIn: loggedIn,
            findUserById: findUserById,
            findUserByUsername: findUserByUsername,
            findUserByCredentials: findUserByCredentials,
            updateUser: updateUser,
            deleteUser: deleteUser,
            likeGame: likeGame,
            unlikeGame: unlikeGame,
            followUser: followUser,
            unfollowUser: unfollowUser,
            deleteImage: deleteImage
        };
        return api;

        function register(newUser) {
            return $http.post("/project/api/register", newUser);
        }

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

        function login(username, password) {
            var newUser = {
                username: username,
                password: password
            };
            return $http.post("/project/api/login", newUser);
        }

        function logout() {
            return $http.post("/project/api/logout");
        }

        function loggedIn() {
            return $http.get("/project/api/loggedIn");
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
        
        function likeGame(userId, game) {
            var url = "/project/api/user/"+userId+"/like";
            return $http.put(url, game);
        }
        
        function unlikeGame(userId, gameId) {
            var url = "/project/api/user/"+userId+"/unlike/"+gameId;
            return $http.put(url);
        }
        
        function followUser(loggedInUserId, followedUserId) {
            var url = "/project/api/user/"+loggedInUserId+"/follow/"+followedUserId;
            return $http.put(url);
        }
        
        function unfollowUser(loggedInUserId, unfollowedUserId) {
            var url = "/project/api/user/"+loggedInUserId+"/unfollow/"+unfollowedUserId;
            return $http.put(url);
        }

        function deleteImage(userId) {
            var url = "/project/api/user/"+userId+"/image/delete";
            return $http.put(url);
        }
    }
})();