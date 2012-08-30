//app.js
var myApp = angular.module('myapp', ['ngResource','ng']).
	factory('Wine', function($resource) {
		return $resource('api/wines/:id', 
			{ id: '@id' }, {
			update: { method: 'PUT' }
			});
	});

//controllers.js
function WineCtrl($scope, Wine) {
	$scope.tpl = 'tpl/wine-list3.html';
	$scope.wines = Wine.query();
	$scope.wine = new Wine();

	$scope.reload = function() {
		$scope.tpl = 'tpl/wine-list3.html';
		$scope.message = null;
		$scope.wines = Wine.query();
	}
	
	$scope.selectWine = function(id) {
		$scope.tpl = 'tpl/wine-details.html';
		$scope.message = null;
		$scope.wine = Wine.get({id: id});
	}
	
	$scope.saveWine = function() {
		$scope.wine.class = "angcellar.Wines";
		if ($scope.wine.id > 0) {
            $scope.wine.$update({id:$scope.wine.id});
			$scope.wines = Wine.query();
			$scope.message = "Wine is saved";
			$scope.tpl = 'tpl/wine-list3.html';
		} else {
			$scope.wine.$save();
			$scope.wines = Wine.query();
			$scope.message = "Wine is saved";
			$scope.tpl = 'tpl/wine-list3.html';
		}
	};
  
	$scope.deleteWine = function () {
		if ($scope.wine.id) {
			var name = $scope.wine.name;
			$scope.wine.$delete({id:$scope.wine.id}, function() {
				$scope.message = 'Wine ' + name + ' deleted';
				$scope.wines = Wine.query();
				$scope.wine = new Wine();
				$scope.tpl = 'tpl/wine-list3.html';
			});
		} else {
			alert('This wine has not been saved yet');
		}
    };
	
	$scope.addWine = function () {
		$scope.tpl = 'tpl/wine-details.html';
		$scope.message = null;
		$scope.wine = new Wine();
    };
}
