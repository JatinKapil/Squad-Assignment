(function() {
    angular
        .module("squadApp")
        .service("AuthService", AuthService)
        .run(function($rootScope, $window, AuthService) {
            $rootScope.user = {};
            $window.fbAsyncInit = function() {
                FB.init({
                    appId: '751619261663923',
                    cookie: true,
                    xfbml: true,
                    version: 'v2.8'
                });
                FB.AppEvents.logPageView();
                console.log("done !");
            };

            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        });

    function AuthService(UserService, $q, $rootScope) {
        var api = {
            checkLoginStatus: checkLoginStatus,
            loginWithFacebook: loginWithFacebook,
            logOut: logOut
        };
        return api;

        function checkLoginStatus() {
            var deferred = $q.defer();
            var responseObject = {};
            var accessToken = "";
            FB.getLoginStatus(function(response) {
                if (response) {
                    deferred.resolve(response);
                    //$rootScope.currentToken = responseObject.authResponse.accessToken;
                    //console.log(responseObject.authResponse.accessToken);
                } else deferred.reject();
            });
            return deferred.promise;
        }

        function loginWithFacebook() {
            var deferred = $q.defer();

            FB.login(function(response) {
                if (response.status === 'connected') {
                    getInfo().then(
                        function(response) {
                            findOrCreateUser(response)
                                .then(
                                    function(user) {
                                        $rootScope.currentUser = user;
                                        if (user.id) deferred.resolve(user);
                                    },
                                    function(error) {
                                        deferred.reject(error);
                                    }
                                );
                        },
                        function(error) {
                            console.log("error");
                            deferred.reject(error);
                        });

                } else {
                    deferred.reject("error");
                }
            });
            //}
            return deferred.promise;
        }

        function findOrCreateUser(user) {
            console.log("findOrCreateUser" + user.id);
            var deferred = $q.defer();
            UserService
                .findUserById(user.id)
                .then(function(response) {
                    console.log("findOrCreateUser" + response);
                    var foundUser = response.data;
                    if (foundUser.id) {
                        deferred.resolve(foundUser);
                    } else {
                        UserService
                            .createUser(user)
                            .then(function(response) {
                                var newUser = response.data;
                                if (newUser) {
                                    deferred.resolve(newUser);
                                } else {
                                    deferred.reject("error while creating user");
                                }
                            });
                    }
                }, function(error) {
                    deferred.reject(error);
                });
            return deferred.promise;
        }

        function getInfo() {
            var deferred = $q.defer();
            FB.api('/me', 'GET', {
                fields: 'id,name,picture.width(900).height(900)'
            }, function(response) {
                console.log("getInfo" + response);
                if (response.id) deferred.resolve(response);
                else deferred.reject("error");
            });
            return deferred.promise;
        }

        function logOut() {
            FB.logout(function(response) {
                // Person is now logged out
                console.log("logout !");
                $rootScope.currentUser = null;
                return response;
            });
        }
    }

})();
