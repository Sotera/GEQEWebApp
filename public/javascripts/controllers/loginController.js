angular.module('GEQE')
  .constant('authUrl', '/login')
  .controller('loginController', ['$scope', '$http', '$window', '$cookies', 'authUrl', 'authService',
    function ($scope, $http, $window, $cookies, authUrl, authService) {

      //HACK: default user/pass for demos
      $scope.data = {
        rememberMe: $cookies.rememberMe === 'true',
        username: 'demo',
        password: 'demo'
      };

      $scope.authenticationError = false;

      $scope.authenticate = function () {
        $http.post(authUrl, $scope.data, {
          withCredentials: true
        })
          .success(function (res) {
            $scope.authenticationError = false;
            authService.setCookies(res, $scope.data);
            $window.location.href = '/';
          })
          .error(function (error) {
            $scope.authenticationError = true;
          });
      }

      //HACK: bypass login for demos: auto-authenticates with pre-configured user data above
      $scope.authenticate()
  }]);
