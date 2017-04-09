(function() {
    angular
        .module("squadApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var api = {
            createUser: createUser,
            findUserById: findUserById,
            deleteUser: deleteUser,
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findUserById(id) {
            console.log("factory");
            var url = "/api/user?userId=" + id;
            return $http.get(url);
        }

        function deleteUser(id) {
            var url = "/api/user/" + id;
            return $http.delete(url);
        }

    }
})();
