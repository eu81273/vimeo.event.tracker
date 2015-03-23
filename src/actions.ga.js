'use strict';

!function (global) {
	function vimeoAction (action, src) {
		if (typeof _gaq !== "undefined" && typeof _gaq.push === "function") {
			 _gaq.push(['_trackEvent', 'Vimeo', action, src, undefined, true]);
		}
	}

/*
	Regist global object
*/
	global.vimeoAction = vimeoAction;

}(window);