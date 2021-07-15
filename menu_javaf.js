function Menu_Open()
{
	document.getElementById("blind_menu").style.visibility = "visible";
	document.getElementById("side_menu").style.left = "0px";
}

function Menu_Close()
{
	document.getElementById("blind_menu").style.visibility = "hidden";
	document.getElementById("side_menu").style.left = "-120px";
}