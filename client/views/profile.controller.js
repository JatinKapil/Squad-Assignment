(function() {
    angular.module('squadApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($scope, $stateParams, $state, $rootScope, UserService, AuthService) {

        function init() {
            if ($rootScope.currentUser == null) $state.transitionTo('home');
        }
        init();

        $scope.user = $rootScope.currentUser;
        $scope.logout = function() {
            AuthService.logOut();
            $state.transitionTo('home');
        };
    }
})();
