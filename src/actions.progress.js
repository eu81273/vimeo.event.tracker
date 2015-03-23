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