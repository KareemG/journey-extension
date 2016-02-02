var JourneyTimer = {
	startTime: null,
	initialize: function() {
		this.setCurrent();
		return this;
	},
	setCurrent: function() {
	    startTime = new Date();
	},
	getCurrent: function() {
	    var z = new Date();
	    var milli = z.getTime() - startTime.getTime();
	    return this._hr(milli) + ":" + this._min(milli) + ":" + this._sec(milli);
	},
	_sec: function(milli) {
	    return this._getPlaceValue(Math.floor(milli / 1000) % 60);
	},

	_min: function(milli) {
	    return this._getPlaceValue(Math.floor(milli / 60000) % 60);
	},
	_hr: function(milli) {
	    return this._getPlaceValue(Math.floor(milli / (3.6 * 1000000)) % 24);
	},
	_getPlaceValue: function(i) {
	    if (i < 10) {
	        i = "0" + i;
	    }
	    return i;
	}
}
var EXPORTED_SYMBOLS = ["JourneyTimer"];