app.factory('Channel', function(channelDefaults) {
	"use strict";

	return function Channel(options) {
		var opts = options || {}
		  , obj  = angular.copy(channelDefaults);

		angular.extend(obj, opts);

		return obj;
	};
});
