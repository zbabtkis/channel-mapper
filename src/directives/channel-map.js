app.directive('channelMap', function() {
	"use strict";

	return {
		restrict: "A",
		link: function(scope, elem, attr, ctrl) {
			var svg = d3.select(elem[0])
			  , openChannelForm
			  , drawMap;

			openChannelForm = function() {
				scope.createChannel({
					left: d3.event.offsetX,
					top: d3.event.offsetY
				}, {
					width: this.width.baseVal.value, 
					height: this.height.baseVal.value 
				});
			};

			drawMap = function() {
				if(scope.data && scope.data.$meta.image) {
					svg.selectAll('image')
						.data([scope.data.$meta.image])
						.enter()
							.append('svg:image')
								.attr('width', '100%')
								.attr('height', '100%')
								.attr('preserveAspectRatio', 'none')
								.attr('xlink:href', function(d) { return d; })
								.on('click', openChannelForm);
				}
			};

			scope.$watch(attr.channelMap, drawMap);
		}
	};
});
