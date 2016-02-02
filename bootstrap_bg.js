var jStorage = JourneyLocalStorage.initialize();
JourneyAPI.initialize(JourneyClientConfig.initialize(jStorage), jStorage, JourneyTimer.initialize(), JourneyUtil.initialize());
jQuery.noConflict();