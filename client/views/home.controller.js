(function() {

    angular.module('squadApp')
        .controller('HomeController', HomeController);

    function HomeController($scope, $state, UserService, AuthService) {
        $scope.error = null;

        $scope.loginWithFacebook = function() {
            AuthService.loginWithFacebook()
                .then(function(user) {
                    if (user.id) {
                        console.log("controller");
                        $state.transitionTo('users', {
                            userObject: user
                        });
                    }
                }, function(error) {
                    $scope.error = "Unable to login";
                });
        }
    }
})();
