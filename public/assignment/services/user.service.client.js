(function(){
    angular
        .module("WebAppMaker")
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
            deleteUser: deleteUser
        };
        return api;

        function register(username, password) {
            var newUser = {
                username: username,
                password: password
            };
            return $http.post("/api/register", newUser);
        }

        function createUser(user) {
            var newUser = {
                username: user.username,
                password: user.password
            };
            return $http.post("/api/user", newUser);
        }

        function login(username, password) {
            var newUser = {
                username: username,
                password: password
            };
            return $http.post("/api/login", newUser);
        }

        function logout() {
            return $http.post("/api/logout");
        }
        
        function loggedIn() {
            return $http.get("/api/loggedIn");
        }

        function findUserById(userId) {
            var url = "/api/user/"+userId;
            return $http.get(url);
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url);
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url);
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user);
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url);
        }
    }
})();