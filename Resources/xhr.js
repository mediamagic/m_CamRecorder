function handleRequest(method, action, data, next, mimetype, progressFunction) {
	var xhr = Ti.Network.createHTTPClient();
	//xhr.setRequestHeader('X-HTTP-Method-Override', method);
	
	xhr.onload = function(resp) {
		if(next != null) 
			next(null, JSON.parse(resp.source.responseData))
	}
	
	xhr.onerror = function() {
		if(next != null) 
			next('error', null);
	}
	
	if(progressFunction) {
		// xhr.upload.onprogress = function(e) {
			// if (e.lengthComputable) {
 				// progressFunction(Math.ceil(((e.loaded / e.total) * 100))); 				     				
 			// }
		// }
		xhr.ondatastream = function(e)
	  	{
	    	progressFunction(Math.ceil((e.progress * 100)));		 
	    };
	 
		xhr.onsendstream = function(e)
	    {
	    	progressFunction(Math.ceil((e.progress * 100)));		 
	    };
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