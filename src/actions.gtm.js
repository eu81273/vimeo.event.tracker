//GTM
!function (global) {
	'use strict';

	function vimeoAction (action, src) {
		if (typeof dataLayer !== 'undefined' && typeof dataLayer.push === 'function') {
			dataLayer.push({'event': 'Vimeo', 'eventCategory': 'Vimeo', 'eventAction': action, 'eventLabel': src, 'eventValue': undefined, 'eventNonInteraction': true });
		}
	}

	global.vimeoAction = vimeoAction;
}(window);
