//GA
!function (global) {
	'use strict';

	function vimeoAction (action, src) {
		if (typeof _gaq !== 'undefined' && typeof _gaq.push === 'function') {
			_gaq.push(['_trackEvent', 'Vimeo', action, src, undefined, true]);
		}
	}

	global.vimeoAction = vimeoAction;
}(window);
