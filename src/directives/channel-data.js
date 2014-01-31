app.directive('channelData', function(resizeResponder) {
	"use strict";

	return {
		restrict: "A",
		link: function(scope, elem, attr, ctrl) {
			var move = function(d) {
				scope.$apply(function() {
					d.position.top = d3.event.y;
					d.position.left = d3.event.x;
				});
			};
			
			var handleDrag = d3.behavior.drag()
				.on('drag', move); 

			var svg = d3.select(elem[0]);

			var colorRegistry = function() {
				var rules = {};

				var getColor = function(d) {
					if(rules[d.type]) {
						return rules[d.type]();
					}
				};

				getColor.addRule = function(type, func) {
					rules[type] = func;
				};

				return getColor;
			}();

			colorRegistry.addRule('pt', function() {
				return 'blue';
			});

			colorRegistry.addRule('acc', function() {
				return 'red';
			});

			var drawChannels = function() {
				if(!scope.channels) return;
				var circle = svg.selectAll('circle')
					.data(scope.channels, function(d) { return d.id; });

				circle.enter()
					.append('circle')
					.attr('cx', function(d) { return d.position.left; })
					.attr('cy', function(d) { return d.position.top; })
					.attr('r', 10)
					.attr('fill', colorRegistry)
					.on('click', scope.editChannel)
					.call(handleDrag);

				circle.exit()
					.remove();

				circle.transition()
					.attr('cx', function(d) { return d.position.left; })
					.attr('cy', function(d) { return d.position.top; });
			};

			var reMap = function() {
				scope.channels.forEach(function(channel) {
					var size = {
						width: elem.width(),
						height: elem.height()
					};

					scope.moveChannel(channel, size);
				});
			};

			resizeResponder.respond(reMap);
			scope.$watch('channels', drawChannels, true);
			scope.$on('channels.import', reMap);
		}
	};
});
