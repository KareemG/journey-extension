var d;
var myVar = setInterval(myTimer, 500);

function setCurrent(){
	d = new Date();
}

function current() {
	var z = new Date();
	var milli = z.getTime() - d.getTime();
    return hr(milli)+":"+min(milli)+":"+sec(milli);
}

function sec(milli){
	return checkTime(Math.floor(milli/1000)%60);
}

function min(milli){
	return checkTime(Math.floor(milli/60000)%60);
}

function hr(milli){
	return checkTime(Math.floor(milli/(3.6*1000000))%24);
}

function checkTime(i) {
    if (i < 10)
	{
	i = "0" + i;
	}
    return i;
}