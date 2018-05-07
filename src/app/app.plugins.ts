// // Avoid `console` errors in browsers that lack a console.
// (function () {
// 	var method;
// 	var noop = function () { };
// 	var methods = [
// 		'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
// 		'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
// 		'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
// 		'timeStamp', 'trace', 'warn'
// 	];
// 	var length = methods.length;
// 	var console = (window.console = window.console || {});

// 	while (length--) {
// 		method = methods[length];

// 		// Only stub undefined methods.
// 		if (!console[method]) {
// 			console[method] = noop;
// 		}
// 	}
// }());

// if (!Date.now) {
// 	Date.now = function now() {
// 		return new Date().getTime();
// 	};
// }

const queryStringToObject = function () {
  const pairs = location.search.slice(1).split('&');

  const result = {};
  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    result[pair[0]] = decodeURIComponent(pair[1] || '');
  }

  return JSON.parse(JSON.stringify(result));
};
