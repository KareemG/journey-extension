var JourneyPopup = {
	api: null,
	defaultDisplay: "n/a",
    showingEvents: false,
	initialize: function(myApi) {
		this.api = myApi;
        this.setTitle();
		this.setExport();
		this.setStart();
		this.setStop();
        this.setDisplay();
        if (this.api.tracking) {
            this.refresh();
        }
		console.log("Initalized " + this.api);
        console.log("Tracking " + this.api.tracking);
		return this;
	},
	refresh: function() {
		if (this.api.tracking == true) {
			this.displayInfo();
            var self = this;
		    setTimeout(function() { self.refresh(); }, 100);
            document.getElementById("start").innerHTML = "Tracking!";
		} else {
            document.getElementById("start").innerHTML = "Start Journey";
        }
	},
    setTitle: function() {
        var self = this;
        document.getElementById("title").addEventListener('click', function() {
            self.openUrlInTab(self.api.config.common.url);
        });
        document.getElementById("title").addEventListener('mouseover', function() {
            this.style.color = "blue";
            this.style.cursor = "pointer";
        });
        document.getElementById("title").addEventListener('mouseleave', function() {
            this.style.color = "black";
        });
    },
	setExport: function() {
		var self = this;
		document.getElementById("export").addEventListener('click', function() {
            if (self.showingEvents) {
                self.toggleEvents();
            }
            self.api.startExport();
		});
	},
	setStart: function() {
		var self = this;
		document.getElementById("start").addEventListener('click', function() {
            if (self.showingEvents) {
                self.toggleEvents();
            }
			self.api.tracking = true;
			self.api.startJourney();
            self.refresh();
		});
	},
	setStop: function() {
		var self = this;
		document.getElementById("stop").addEventListener('click', function() {
			self.api.tracking = false;
            self.api.pushEvent();
            var timeDisplay = document.getElementById("time");
			var pageDisplay = document.getElementById("webpage");
			timeDisplay.innerHTML = self.defaultDisplay;
			pageDisplay.innerHTML = self.defaultDisplay;
		});
	},
    setDisplay: function() {
        var self = this;
        document.getElementById("display").addEventListener('click', function() {
			self.toggleEvents();
		});
    },
    toggleEvents: function(showing) {
        console.log(this.api.config.common.eventNumber);
        var eventDisplay = document.getElementById("events");
        var displayButton = document.getElementById("display");
        if (!this.showingEvents) {
            var events = this.api.loadEvents();
            if (events.length == 0) {
                eventDisplay.innerHTML = "No events available.";
            } else {
                events = events.join("<br>");
                events = "Showing " + (this.api.config.common.eventNumber-1) + " Events: <br>" + events;
                eventDisplay.innerHTML = events;
            }
            this.showingEvents = true;
            displayButton.innerHTML = "Hide Events";
        }
        else {
            this.showingEvents = false;
            eventDisplay.innerHTML = "";
            displayButton.innerHTML = "Display Events";
        }
    },
	openUrlInTab: function(url) {
        chrome.tabs.create({'url': url}, function(tab) {});
    },
	displayInfo: function() {
		var timeDisplay = document.getElementById("time");
        var pageDisplay = document.getElementById("webpage");
		timeDisplay.textContent = " " + this.api.currentEvent.time;
        pageDisplay.innerHTML = " " + this.api.currentEvent.url;
	}
}
var EXPORTED_SYMBOLS = ["JourneyPopup"];