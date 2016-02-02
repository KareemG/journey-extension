var JourneyAPI = {
	util: null,
	config: null,
	storage: null,
    tracking: false,
    currentEvent: {
        url: null,
        time: 0
    },
    _resetEvent: {
        url: null,
        time: 0
    },
	initialize: function(config, storage, timer, util) {
		this.util = util;
		this.storage = storage;
		this.config = config;
        this.timer = timer;
        return this;
	},
    startJourney: function() {
        var self = this;
        this.resetJourney();
        this.timer.setCurrent();
        this.trackEvent();
    },
    startExport: function() {
        (function(self) {
            var success = function(response) {
                self.tracking = false;
                self.resetJourney();
                alert("Export successful!");
            };
            var fail = function(fail) {
                alert("Export failed :(");
            };
            var params = self.loadEvents();
            self.util.getRequest("http://192.168.56.101:3000/mydata?params=" + params, success, fail, true);
        })(this);
    },
    trackEvent: function() {
        var self = this;
        chrome.tabs.query({
        active: true,
        currentWindow: true
        }, function(tabs) {
            var tabURL = tabs[0].url;
            if (self.currentEvent.url != tabURL) {
                self.pushEvent();
            }
            self.currentEvent.url = tabURL;
            self.currentEvent.time = self.timer.getCurrent();
            if (self.tracking) {
                setTimeout(function() { self.trackEvent(); }, 100);
            }
        });
    },
    pushEvent: function() {
        var myurl = this.util.formatNoQueryUrl(this.currentEvent.url);
        this.storage.setEvent(this.config.common.eventNumber, "" + myurl + "," + this.currentEvent.time);
        this.config.common.eventNumber++;
    },
	loadEvents: function() {
		var events = [];
		for (var i = 1; i < this.config.common.eventNumber; i++) {
			events.push(this.storage.getEvent(i));
		}
		return events;
	},
    resetJourney: function() {
        for (var i = 1; i < this.config.common.eventNumber; i++) {
			this.storage.deleteEvent(i);
		}
        for (var key in this._resetEvent) {
            this.currentEvent[key] = this._resetEvent[key];
        }
        this.config.resetConfig();
    }
}
var EXPORTED_SYMBOLS = ["JourneyAPI"];