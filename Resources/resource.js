module.exports = function(template) {
	return {
		get: function(data, next) {				
			new XHR('GET', template, data, function(err, res) {
				if(next != null)
					next(err, res);
			});
		},
		post: function(data, next) {
			new XHR('POST', template, data, function(err, res) {
				if(next != null)
					next(err, res);
			});
		},
		put: function(data, next) {	
			new XHR('PUT', template, data, function(err, res) {
				console.log('return from put');
				console.log(next);
				if(next != null)
					next(err, res);
			});
		},
		del: function(data, next) {
			new XHR('DELETE', template, data, function(err, res) {
				if(next != null)
					next(err, res);
			});
		},
		upload: function(file, mimetype, progressFunction, next) {
			new XHR('POST', template, file, function(err, res) {
				if(next != null)
					next(err, res);
			}, mimetype, progressFunction);
		}
	}
}