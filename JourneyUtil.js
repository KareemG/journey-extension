var JourneyUtil = {
	_logger_enabled: false,
	_logger: null,
	initialize: function() {
		var self = this;
		this._logger = function() {
			if (self._log_enabled) {
                self.getBackgroundPage().console.log(self.formatLog(Array.prototype.slice.call(arguments))); 
            }
		}
		return this;
	},
	getBackgroundPage: function() {
		return chrome.extension.getBackgroundPage();
	},
	getWindow: function() {
		return window;
	},
	formatSafeData: function(data) {
		if (data != null) {
            if (data.length > 1024) {
                data = data.substring(0,1023);
            }
        }
        return data;
	},
	formatLog: function(logs) {
		var output = (Date.now()/1000) + "Journey: " + strings.join('');
		return output;
	},
	formatNoQueryUrl: function(url) {
		if (url != null) {
            if (url.indexOf("?") > -1) {
                url = url.substring(0, url.indexOf('?'));
            }
        }
        return url;
	},
	getRequest: function(url, successCallback, failCallback, async) {
        if (successCallback == null) { successCallback = function(response) {};	}
        if (failCallback == null) { failCallback = function(response) {}; }	
        var request = new XMLHttpRequest();
        this._logger('getRequest : ', url);
        request.open("GET", url, async);
        if (async) {
        	request.onreadystatechange = function () { 
                if (request.readyState == 4 && request.status == 200) {
	               successCallback(request); 
                }
	        }
    	}
        request.send();
        if (!async) {
            if(request.status == 200) {
                successCallback(request);              
            } else {
                failCallback(request);
            }
        }
    },
    //is actually get request, will implement later when csrf is ready
    postRequest: function(url, params, successCallback, failCallback, async) {
    	if (successCallback == null) { successCallback = function(response) {};	}
        if (failCallback == null) { failCallback = function(response) {}; }	
        var request = new XMLHttpRequest();
        this._logger('postRequest : ', url, params);
        request.open("GET", url + "?" + "params=" + params, async);
        if (async) {
        	request.onreadystatechange = function () {  
	            if (request.readyState == 4) {  
	                if (request.status == 200) {
	                    successCallback(request);              
	                } else {
	                    failCallback(request);
	                }
	            }
	        }
    	}
        request.send();
        if (!async) {
            if(request.status == 200) {
                successCallback(request);              
            } else {
                failCallback(request);
            }
        }
    }
}
var EXPORTED_SYMBOLS = ["JourneyUtil"];