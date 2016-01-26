var d;
//var myVar = setInterval(myTimer, 500);
var track = false;
var string = "n/a";

function setCurrent(){
	d = new Date();
}
function kareem() {
	return string;
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

function loadDoc()
{
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET","http://192.168.56.101:3000/mydata", true);
   xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
          string=xmlhttp.responseText;
		}
   }
   xmlhttp.send();
}

function sendDoc(array)
{
   xmlhttp = new XMLHttpRequest();
   xmlhttp.open("GET","http://192.168.56.101:3000/mydata?array="+array, true);
   xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4 && xmlhttp.status==200){
		  console.log("hi");
        }
   }
   xmlhttp.send();
   
}
setCurrent();