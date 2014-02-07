app.controller('ChannelsCtrl', function($scope, Channel, resizeResponder, uuid4) {
	"use strict";

	$scope.showEditor = false;
	$scope.model = {};

	$scope.saveChannel = function() {
		var chn = angular.extend($scope.model, $scope.modelCopy);

		$scope.showEditor = false;
		if(chn.isNew) {
			chn.id = uuid4.generate(); 
			chn.isNew = false;
			$scope.channels.push(chn);
		} 
	};

	$scope.editChannel = function(channel) {
		$scope.model = channel;

		// Should only edit copy of model to be saved.
		$scope.modelCopy = angular.copy(channel);
		$scope.showEditor = true;
		$scope.$apply();
	};

	$scope.deleteChannel = function() {
		var ind = $scope.channels.indexOf($scope.model);

		$scope.channels.splice(ind, 1);
		$scope.showEditor = false;
	};

	$scope.createChannel = function(data, imageSize) {
		$scope.model = new Channel({
			name: $scope.meta.network + '_' + $scope.meta.station,
			position: {
				left: data.left,
				top: data.top 
			},
			isNew: true,
			meta: {
				imageSize: {
					width: imageSize.width,
					height: imageSize.height 
				}
			}
		});
		$scope.modelCopy = angular.copy($scope.model);

		$scope.showEditor = true;
		$scope.$apply();
	};

	$scope.moveChannel = function(channel, size) {
		var oldL = channel.position.left
		  , oldT = channel.position.top
		  , oldS = channel.meta.imageSize;

		channel.position = {
			left: oldL * size.width / oldS.width,
			top: oldT * size.height / oldS.height
		};

		channel.meta.imageSize = {
			width: size.width,
			height: size.height 
		};

		//$scope.$apply();
	};

});
