angular.module('GEQE')
    .controller('jobsTabsController', ['$scope','$rootScope','$http', function ($scope, $rootScope, $http) {
        $scope.tabs = [{
            title: 'Query',
            url: 'one.tpl.html'

        }, {
            title: 'Model',
            url: 'two.tpl.html'
        }];

        $scope.currentTab = 'one.tpl.html';

        $scope.onClickTab = function (tab) {
            $scope.currentTab = tab.url;
        };

        $scope.isActiveTab = function(tabUrl) {
            return tabUrl == $scope.currentTab;
        };

        $scope.clearMarkers = function(){
            $rootScope.$emit("clearMarkers",['training','score']);
        };

        $scope.clearShapes = function(){
            $rootScope.$emit("clearCurrentShapes",["score","polyset"]);
        };

        $scope.clearResults = function(){
            $rootScope.$emit("clearResults");
        };

        $scope.clearAll = function(){
            $rootScope.$emit("clearAll");
            $scope.clearResults();
        };

 }]);
