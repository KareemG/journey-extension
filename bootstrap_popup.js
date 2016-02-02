JourneyJq = jQuery.noConflict(true);
var JourneyBgContainer = chrome.extension.getBackgroundPage();

JourneyJq(document).ready(function() {
    JourneyPopup.initialize(JourneyBgContainer.JourneyAPI);
});