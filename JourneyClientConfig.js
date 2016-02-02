var JourneyClientConfig = {
	storage: null,
	common: {
		accountKey: null,
		accountName: null,
		journeyName: null,
		url: "http://192.168.56.101:3000",
		eventNumber: 0
	},
	_resetCommon: {
		accountKey: null,
        accountName: null,
		journeyName: null,
        eventNumber: 0
	},
	initialize: function(storage) {
		this.util = storage.util;
		this.storage = storage;
		this.loadLocalConfig();
        console.log(this.common);
		return this;
	},
	loadLocalConfig: function() {
		var value;
		for (var key in this.common) {
			value = this.common[key];
			this.common[key] = this.storage.getConfig(key);
			if (this.common[key] == null) {
				this.common[key] = value;
			}
		}
	},
    resetConfig: function() {
        var self = this;
        for (var key in this._resetCommon) {
			this.common[key] = this._resetCommon[key];
		}
    }
}
var EXPORTED_SYMBOLS = ["JourneyClientConfig"];