var JourneyLocalStorage = {
	proxyStorage: null,
	cOffset: "journey.config.",
	eOffset: "journey.events.",
	initialize: function() {
		//this.util = util;
		this.proxyStorage = localStorage;
		return this;
	},
	setConfig: function(key, value) {
		this.proxyStorage.setItem(this.cOffset + key, value);
	},
	getConfig: function(key) {
		return this.proxyStorage.getItem(this.cOffset + key);
	},
	deleteConfig: function(key) {
		return this.proxyStorage.removeItem(this.cOffset + key);
	},
	setEvent: function(key, value) {
		this.proxyStorage.setItem(this.eOffset + key, value);
	},
	getEvent: function(key) {
		return this.proxyStorage.getItem(this.eOffset + key);
	},
	deleteEvent: function(key) {
		return this.proxyStorage.removeItem(this.eOffset + key);
	}
}
var EXPORTED_SYMBOLS = ["JourneyLocalStorage"];