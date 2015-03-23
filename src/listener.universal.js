'use strict';

!function (global) {

/*
	Universal Embed
*/
	var iframes = document.getElementsByTagName('iframe');
	var iframeLength = iframes.length;

	global.addEventListener && global.addEventListener('message', onMessageReceived, false);
	global.attachEvent && global.attachEvent('onmessage', onMessageReceived, false);

	function onMessageReceived (event) {
		var param = JSON.parse(event.data);
		var vimeo = undefined;

		//identify event source iframe
		for (var i=0; i<iframeLength; i++) {
			if(iframes.item(i).contentWindow === event.source){
				vimeo = iframes.item(i);
			}
		}

		switch (param.event) {
			case 'ready':
				vimeoReady(vimeo);
				break;
			   
			case 'play':
				vimeoAction('play', vimeo.src);
				break;
				
			case 'pause':
				vimeoAction('pause', vimeo.src);
				break;
			   
			case 'finish':
				vimeoAction('finish', vimeo.src);
				break;

			case 'playProgress':
				progressAction.from(vimeo.src).amount(param.data);
				break;
		}
	}

	function vimeoReady (vimeo) {
		var url = vimeo.src.split('?')[0];

		//add event listener to universal embed
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'pause'}), url);
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'finish'}), url);
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'play'}), url);
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'playProgress'}), url);
	}

}(window);