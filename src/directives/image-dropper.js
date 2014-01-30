app.directive('imageDropper', function() {
	"use strict";

	return {
		restrict: "A",
		link: function(scope, elem, attr, ctrl) {
			var stop = function(e) {
				e.preventDefault();
				e.stopPropagation();
			};

			elem.bind('dragenter', function(e) {
				stop(e);
				scope.entered = true;
				scope.$apply();
			});
			
			elem.bind('dragleave dragend drop', function(e) {
				stop(e);
				scope.entered = false;
				scope.$apply();
			});

			elem.bind('dragover', function(e) {
				stop(e);
				scope.entered = true;
				scope.$apply();
			});

			elem.bind('drop', function(e) {
				var file = e.originalEvent.dataTransfer.files[0]
				  , reader = new FileReader();

				stop(e);
				reader.onload = function(e) {
					var url = e.target.result;
					scope.meta.image = url;
					scope.$apply();
				};

				reader.readAsDataURL(file);
			});
		}
	};
});
