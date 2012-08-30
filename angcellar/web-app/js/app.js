//app.js
angular.module('myapp', ['ngResource']).
	config(['$routeProvider', function($routeProvider) {
		$routeProvider.
		when('/wines', {controller:WineListCtrl, templateUrl:'tpl/welcome.html'}).
		when('/wines/add', {controller:WineDetailCtrl, templateUrl:'tpl/wine-details.html'}).
		when('/wines/:id', {controller:WineDetailCtrl, templateUrl:'tpl/wine-details.html', resolve: WineDetailCtrl.resolve}).
		otherwise({redirectTo:'/wines'});
	}]).
	factory('Wine', function($resource) {
		return $resource('api/wines/:id', 
			{ id: '@id' }, {
			update: { method: 'PUT' }
			});
	});

//controllers.js
function WineListCtrl($rootScope, $scope, Wine) {
	$rootScope.wines = Wine.query();
	
	$rootScope.addWine = function () {
        window.location = "#/wines/add";
    };

	$rootScope.reload = function () {
        window.location = "#/wines";
    };
}
  
function WineDetailCtrl($scope, $location, $routeParams, Wine) {
	if ($routeParams.id !== undefined) {
		$scope.wine = Wine.get({id: $routeParams.id});
	} else {
		$scope.wine = new Wine();
	}
	
	$scope.saveWine = function() {
		$scope.wine.class = "angcellar.Wines";
		if ($scope.wine.id > 0)
            $scope.wine.$update({id:$scope.wine.id});
        else
			$scope.wine.$save();

		window.location = "#/wines";
	};
  
	$scope.deleteWine = function () {
		if ($scope.wine.id) {
			var name = $scope.wine.name;
			$scope.wine.$delete({id:$scope.wine.id}, function() {
				alert('Wine ' + name + ' deleted')
				window.location = "#/wines";
			});
		} else {
			alert('This wine has not been saved yet');
		}
    }
}