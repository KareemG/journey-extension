var bgpage = chrome.extension.getBackgroundPage();

function refresh()
{
	if (bgpage.track == true)
		displayTime();
	console.log(bgpage.track);
	//document.getElementById("demo").innerHTML = k;
	refreshDisplayTimeout = setTimeout(refresh, 100);
}

window.addEventListener('load',function(){
	bgpage.loadDoc();
	sessionStorage['array'] = '';
	document.getElementById("export").addEventListener('click', function() {
		var k = bgpage.kareem();
		//console.log(sessionStorage['array']);
		//console.log(sessionStorage['array'].toString());
		bgpage.sendDoc(sessionStorage['array'].substring(1));
		document.getElementById("ey").innerHTML = k;
	});
	document.getElementById("start").addEventListener('click', function() {
		startJourney();
	});
	document.getElementById("stop").addEventListener('click', function() {
		stopJourney();
	});
    
});

function startJourney() {
	beginTimer();
	bgpage.track = true;
	chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
        var tabURL = tabs[0].url;
        var pageDisplay = document.getElementById("webpage");
		
        pageDisplay.textContent = " " + tabURL;
		
        console.log(tabURL);
        refresh();
    });
}

function stopJourney() {
	bgpage.track = false;
	chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
        var tabURL = tabs[0].url;
		var timeDisplay = document.getElementById("time");
		var pageDisplay = document.getElementById("webpage");
		timeDisplay.innerHTML = "N/A";
		pageDisplay.innerHTML = "N/A";
		sessionStorage['array'] = sessionStorage['array'] + "," + tabURL;
        sessionStorage['array'] = sessionStorage['array'] + "," + getTime();
		console.log("end");
    });
}
function displayTime() {
	var timeDisplay = document.getElementById("time");
	timeDisplay.textContent = " " + getTime();
}
function beginTimer() {
	bgpage.setCurrent();
}

function getTime() {
	return bgpage.current();
}

function loadDoc() {
    bgpage.loadDoc();
	console.log("hi");
}
function loadText() {
	
}
/*
$(document).ready(function() {
    var player = document.getElementById('ey');
    console.log(player);
    console.log(document);
});
*/
//chrome.extension.getElementById("ey").addEventListener("click", refresh());