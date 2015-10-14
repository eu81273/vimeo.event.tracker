'use strict';

var app = angular.module('angularApplication', ['angular.panels']);

//add panels
app.config(['panelsProvider', function (panelsProvider) {

	panelsProvider
		.add({
			id: 'menu',
			position: 'left',
			size: '500px',
			templateUrl: 'templates/menu.html',
			controller: 'menuCtrl'
		});
}]);

//default controller
app.controller('defaultController', ['$scope', '$window', 'panels', function ($scope, $window, panels) {

	$scope.eventLogs = [];

	//Universal Analytics Emulation
	$window.ga = function () {
		var args = Array.prototype.slice.call(arguments);
		$scope.$apply(function () {
			$scope.eventLogs.push(args);
		});
	};

	$scope.menuOpen = function () {
		$scope.$broadcast('menu');
	};
}]);

//menu panel controller
app.controller('menuCtrl', ['$scope', 'panels', function ($scope, panels) {
	$scope.$on('menu', function(event, args) {
		panels.open("menu");
	});
}]);
