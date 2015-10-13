//Flash Embed
!function (global) {
	'use strict';

	var objects = document.getElementsByTagName('object');
	var objectLength = objects.length || 0;

	//add parameter for api
	for (var i=0; i<objectLength; i++) {
		objects.item(i).innerHTML += "<param name='flashvars' value='api=1&api_ready=vimeoFlashReady&js_swf_id=" + i + "'/>";
	}

	//when ready, flash type vimeo callbacks this function
	function vimeoFlashReady (i) {
		var vimeo = objects.item(i);
		var params = vimeo.children;
		var paramLength = params.length || 0;
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

	global.vimeoFlashReady = vimeoFlashReady;
}(window);

//Universal Embed
!function (global) {
	'use strict';

	var iframes = document.getElementsByTagName('iframe');
	var iframeLength = iframes.length || 0;

	global.addEventListener && global.addEventListener('message', onMessageReceived, false);
	global.attachEvent && global.attachEvent('onmessage', onMessageReceived, false);

	function onMessageReceived (event) {
		var vimeo = {};
		var param = {};

		try {
			param = JSON.parse(event.data);
		}
		catch (e) {
			param.event = 'error';
		}

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
		var url = vimeo && vimeo.src && vimeo.src.split('?')[0] || "vimeo-url-not-found";

		//add event listener to universal embed
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'pause'}), url);
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'finish'}), url);
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'play'}), url);
		vimeo.contentWindow.postMessage(JSON.stringify({method: 'addEventListener', value: 'playProgress'}), url);
	}
}(window);

//Actions Notifier
!function (global) {
	'use strict';

	var vimeos = {};
	var progressAction = {
		src: undefined,
		from: function (src) {
			this.src = src;
			return this;
		},
		amount: function (progress) {
			progressEventDivider(progress.percent, this.src);
		}
	};

	function progressEventDivider (percent, src) {
		switch (percent*100>>0) {
			case 25:
				if (vimeos[src] !== 25) {
					vimeos[src] = 25;
					vimeoAction('25%', src);
				}
			break;

			case 50:
				if (vimeos[src] !== 50) {
					vimeos[src] = 50;
					vimeoAction('50%', src);
				}
			break;

			case 75:
				if (vimeos[src] !== 75) {
					vimeos[src] = 75;
					vimeoAction('75%', src);
				}
			break;
		}
	}

	global.progressAction = progressAction;
}(window);

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
