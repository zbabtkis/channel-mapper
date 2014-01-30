"use strict";

var app = angular.module('channelMapper', ['uuid4']);

app.value("channelDefaults", {
	name: "",
	position: {
		left: 0,
		top: 0
	},
	type: 'pt',
	active: true,
	label: 1
});

app.value('stationDefaults', {
	station: "WLA",
	network: "SB"
});
