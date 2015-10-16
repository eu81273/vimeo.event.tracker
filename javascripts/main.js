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

//Universal Analytics Emulation
function ga () {
	var args = Array.prototype.slice.call(arguments);
	var eventLog = document.querySelector("#eventLog");

	eventLog.innerHTML = eventLog.innerHTML + "	<div class=\"alert alert-info\"><p>" + JSON.stringify(args, null, "  ") + "</p></div>"
};
