'use strict';

!function (global) {
	function vimeoAction (action, src) {
		if (typeof dataLayer !== "undefined" && typeof dataLayer.push === "function") {
			dataLayer.push({'event': 'Vimeo', 'eventCategory': 'Vimeo', 'eventAction': action, 'eventLabel': src, 'eventValue': undefined, 'eventNonInteraction': true });
		}
	}

/*
	Regist global object
*/
	global.vimeoAction = vimeoAction;

}(window);