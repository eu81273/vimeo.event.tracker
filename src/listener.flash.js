'use strict';

!function (global) {

/*
	Flash Embed
*/
	var objects = document.getElementsByTagName('object');
	var objectLength = objects.length;

	//add parameter for api
	for (var i=0; i<objectLength; i++) {
		objects.item(i).innerHTML += "<param name='flashvars' value='api=1&api_ready=vimeoFlashReady&js_swf_id=" + i + "'/>";
	}

	//when ready, flash type vimeo callbacks this function
	function vimeoFlashReady (i) {
		var vimeo = objects.item(i);
		var params = vimeo.children;
		var paramLength = params.length;
		var src = undefined;

		for (var i=0; i<paramLength; i++) {
			if (params.item(i).name == "movie") {
				src = params.item(i).value;
				break;
			}
		}

		//add event listener to flash embed
		vimeo.api_addEventListener("play", "vimeoAction('play', '" + src + "')");
		vimeo.api_addEventListener("pause", "vimeoAction('pause', '" + src + "')");
		vimeo.api_addEventListener("finish", "vimeoAction('finish', '" + src + "')");
		vimeo.api_addEventListener("playProgress", "progressAction.from('" + src + "').amount");

		return false; 
	}


/*
	Regist global object
*/

	global.vimeoFlashReady = vimeoFlashReady;

}(window);