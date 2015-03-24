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
'use strict';

!function (global) {
/*
	Actions
*/

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
	}

	function progressEventDivider (percent, src) {
		switch (~~(percent*100)) {
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

/*
	Regist global object
*/

	global.progressAction = progressAction;

}(window);
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