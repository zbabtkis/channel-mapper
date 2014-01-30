app.service('resizeResponder', function() {
	"use strict";

	var callbacks = [];

	window.onresize = function() {
		callbacks.forEach(function(func) {
			func();
		});
	};

	this.respond = function(func) {
		callbacks.push(func);

		return callbacks.length - 1;
	};

	this.remove = function(id) {
		delete callbacks[id];
	};
});
