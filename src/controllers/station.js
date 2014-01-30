app.controller('StationCtrl', function($scope, stationFile, stationDefaults) {
	"use strict";

	$scope.perspectives = {
		BIRDS_EYE: {
			value: 'BE',
			name: 'Birds Eye'
		},
		CROSS_SECTION: {
			value: 'CS',
			name: 'Cross Section'
		}
	};

	$scope.meta = {
		station :    stationDefaults.station,
	 	network:     stationDefaults.network,
		perspective: $scope.perspectives.BIRDS_EYE.value
	};

	$scope.channels = [];

	$scope.export = function() {
		var name = $scope.meta.network + '_' + $scope.meta.station + '_' + $scope.meta.perspective; 

		stationFile.save(name, { 
			$meta: $scope.meta, 
			channels: $scope.channels
		});
	};

	$scope.import = function() {
		stationFile.fetch()
			.then(function(data) {
				$scope.meta     = data.meta;
				$scope.channels = data.channels;
				$scope.$broadcast('channels.import');
			}, function(e) {
				alert(e);
			});
	};
	
});
