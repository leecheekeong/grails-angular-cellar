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
	
	$scope.sortfield = "";
	$scope.tpl = 'tpl/wine-list5.html';
	$scope.message = null;
	$scope.errors = null;
	
	$scope.wines = Wine.query();
	$scope.query = new Wine();
	
	$scope.myFilter = function(wine) {
		var ok = !wine._deleted;
		for(field in $scope.query) {
			if ($scope.query[field]) {
				ok = (ok && String(wine[field]).indexOf($scope.query[field]) > -1);
			}
		}
		return ok;
	};

	$scope.mySort = function(wine) {
		return wine[$scope.sortfield];
	}

	$scope.sortHeader = function(field) {
		$scope.sortfield = field;
	}
	
	$scope.reload = function() {
		$scope.tpl = 'tpl/wine-list5.html';
		$scope.message = null;
		$scope.errors = null;
		$scope.wines = Wine.query();
	}
	
	$scope.selectWine = function(id) {
	}
	
	$scope.setDirty = function(rowId) {
		$scope.wines[rowId]._dirty = true;
	}
	
	$scope.saveAll = function() {
		// need to optimize. look for dirty to update.
		for(i=0; i<$scope.wines.length; i++) {
			var obj = $scope.wines[i];
			obj.class = "angcellar.Wines";
			if (obj.id > 0) {
				if (obj._deleted) {
					obj.$delete({id:obj.id});
				} else if (obj._dirty) {
					obj.$update({id:obj.id});
				}
			} else {
				if (!obj._deleted) {
					$scope.wines[i].$save();
				}
			}
		}
		
		// remove deleted records from list
		for(i=0; i<$scope.wines.length; i++) {
			if ($scope.wines[i]._deleted) $scope.wines.splice(i, 1);
		}		
	}
	
	$scope.addWine = function () {
		$scope.query = new Wine();
		$scope.wines.push(new Wine());
    };
}
