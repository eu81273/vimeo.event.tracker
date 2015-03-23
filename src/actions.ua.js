'use strict';

!function (global) {
	function vimeoAction (action, src) {
		if (typeof ga === "function") {
			ga('send', 'event', 'Vimeo', action, src, undefined, {'nonInteraction': true});
		}
	}

/*
	Regist global object
*/
	global.vimeoAction = vimeoAction;

}(window);