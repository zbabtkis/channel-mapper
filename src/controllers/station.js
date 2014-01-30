app.controller('StationCtrl', function($scope, stationDefaults) {
	"use strict";
	$scope.station = stationDefaults.station; 
	$scope.network = stationDefaults.network;
	$scope.data = { $meta: {}, channels: [] };

	$scope.export = function() {
		var data  = JSON.stringify($scope.data, null, '\t')
		  , blob  = new Blob([data], {type: 'application/json'})
		  , url   = window.URL.createObjectURL(blob)
		  , $link = $('<a />');

		$link.attr('href', url);
		$link.attr('download', $scope.station + '.json');

		$link[0].click();
	};

	$scope.import = function() {
		var file   = $('<input type="file" />').click();
		var reader = new FileReader();
		reader.onload = function(data) {
			$scope.data = JSON.parse(reader.result);
			$scope.$apply();
		};

		file.change(function() {
			reader.readAsText(file[0].files[0]);
		});
	};
	
});
