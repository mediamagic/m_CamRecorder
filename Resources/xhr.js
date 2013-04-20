function handleRequest(method, action, data, next, mimetype) {
	var xhr = Ti.Network.createHTTPClient();
	//xhr.setRequestHeader('X-HTTP-Method-Override', method);
	
	xhr.onload = function(resp) {
		if(next) 
			next(null, JSON.parse(resp.source.responseData));
	}
	
	xhr.onerror = function() {
		if(next) 
			next('error', null);
	}

	xhr.open(method, global.host + action);
	xhr.setRequestHeader('X-CSRF-Token', global.csrf);
	
	if(mimetype != null) {
		xhr.setRequestHeader("enctype", "multipart/form-data");
		xhr.setRequestHeader("Content-Type", mimetype);
	}
	
	xhr.send(data);
}

module.exports = handleRequest;