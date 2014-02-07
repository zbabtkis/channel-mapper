app.service('resizeResponder', function($rootScope, $window) {
	"use strict";

	var callbacks = []
	  , bounceLimit = 200;

	function debounce(func) {
		var timeout;

		return function() {
			if(timeout) return;
			timeout = setTimeout(function() {
				func.apply(this, arguments);
				clearTimeout(timeout); timeout = undefined;
			}, bounceLimit);
		};
	};

	function loopResponders() {
		var args = arguments;

		callbacks.forEach(function(func) {
			if(!angular.isFunction(func)) return;

			func.apply($window, args);
			$rootScope.$apply();
		});
	};

	/** Public Service API */

	// Add callback to window resize event.
	this.respond = function(func) {
		return angular.isFunction(func) && 
			callbacks.push(func) &&
			func;
	};

	// Remove callback from window resize event.
	this.remove = function(func) {
		return angular.isFunction(func) && 
			callbacks.splice(callbacks.indexOf(func), 1) &&
			func;
	};

	$window.addEventListener('resize', debounce(loopResponders));
});
