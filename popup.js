var bgpage = chrome.extension.getBackgroundPage();

function refresh()
{
	document.getElementById("demo").innerHTML = bgpage.current();
	refreshDisplayTimeout = setTimeout(refresh, 100);
}

window.addEventListener('load',function(){
	
	chrome.tabs.query({
    active: true,
    currentWindow: true
    }, function(tabs) {
        var tabURL = tabs[0].url;
        var myElement = document.getElementById("checkPage");
        myElement.innerHTML = " " + tabURL;
        console.log(tabURL);
        refresh();

    });

});
