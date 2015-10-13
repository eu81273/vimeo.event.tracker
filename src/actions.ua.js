//UA
!function (global) {
	'use strict';

	function vimeoAction (action, src) {
		if (typeof ga === 'function') {
			ga('send', 'event', 'Vimeo', action, src, undefined, {'nonInteraction': true});
		}
	}

	global.vimeoAction = vimeoAction;
}(window);
