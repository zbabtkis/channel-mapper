app.service('stationFile', function($rootScope, $q) {
	this.save = function(name, data) {	
		var json  = angular.toJson(data, true) 
		  , blob  = new Blob([json], {type: 'application/json'})
		  , url   = URL.createObjectURL(blob)
		  , $link = angular.element('<a />');

		$link.attr('href', url);
		$link.attr('download', name + '.json');

		$link[0].click();
	};

	this.fetch = function() {
		var file   = angular.element('<input type="file" />').click()
		  , reader = new FileReader()
		  , defer = $q.defer();

		reader.onload = function(data) {
			var data = angular.fromJson(reader.result);

			if(angular.isObject(data.meta) && angular.isArray(data.channels)) {
				defer.resolve(data);
				$rootScope.$apply();
			} else {
				defer.reject("The file you imported is invalid");
			}
		};

		file.change(function() {
			reader.readAsText(file[0].files[0]);
		});

		return defer.promise;
	};
});

