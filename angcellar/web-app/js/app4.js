//app.js
var myApp = angular.module('myapp', ['ngResource','ng']).
	factory('Wine', function($resource) {
		return $resource('api/wines/:id', 
			{ id: '@id' }, {
			update: { method: 'PUT' }
			});
	});

//controllers.js
function WineCtrl($scope, $http, Wine) {
	$scope.tpl = 'tpl/wine-list4.html';
	$scope.message = null;
	$scope.errors = null;
	$scope.wines = Wine.query();
	$scope.wine = new Wine();

	$scope.reload = function() {
		$scope.tpl = 'tpl/wine-list4.html';
		$scope.message = null;
		$scope.errors = null;
		$scope.wines = Wine.query();
	}
	
	$scope.selectWine = function(id) {
		$scope.tpl = 'tpl/wine-details2.html';
		$scope.message = null;
		$scope.errors = null;
		$scope.wine = Wine.get({id: id});
		self.original = $scope.wine;
	}
	
	$scope.saveWine = function() {
		$scope.wine.class = "angcellar.Wines";
		if ($scope.wine.id > 0) {
            $scope.wine.$update({id:$scope.wine.id});
			$scope.wines = Wine.query();
			$scope.errors = null;
			$scope.message = "Wine is saved";
			self.original = $scope.wine;
			$scope.tpl = 'tpl/wine-list4.html';
		} else {
			//$scope.wine.$save();
			$http.post('api/wines',$scope.wine).success(function(data, status, headers, config) {
				// this callback will be called asynchronously
				// when the response is available
				$scope.wine = new Wine(data);
				$scope.wines = Wine.query();
				$scope.errors = null;
				$scope.message = "Wine is saved";
				self.original = $scope.wine;
				$scope.tpl = 'tpl/wine-list4.html';
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with status
				// code outside of the <200, 400) range
				$scope.message = null;
				$scope.errors = data;
				self.original = $scope.wine;
			});
		}
	};
  
	$scope.deleteWine = function () {
		if ($scope.wine.id) {
			var name = $scope.wine.name;
			$scope.wine.$delete({id:$scope.wine.id}, function() {
				$scope.message = 'Wine ' + name + ' deleted';
				$scope.wines = Wine.query();
				$scope.wine = new Wine();
				self.original = $scope.wine;
				$scope.tpl = 'tpl/wine-list4.html';
			});
		} else {
			alert('This wine has not been saved yet');
		}
    }
	
	$scope.addWine = function () {
		$scope.tpl = 'tpl/wine-details2.html';
		$scope.message = null;
		$scope.errors = null;
		$scope.wine = new Wine();
		self.original = $scope.wine;
    };
}
