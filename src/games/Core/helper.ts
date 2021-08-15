/*
 * BY-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
let scrollTop = 0;
let scrollLeft = 0;

function handleFocusin() : void {
	scrollLeft = document.body.scrollLeft;
	scrollTop = document.body.scrollTop;
}

function handleFocusout() : void {
	setTimeout(() => {
		window.scrollTo(scrollLeft, scrollTop);
	}, 0);
}

export function fixIosScroll() : void {
	const { userAgent } = window.navigator;
	if (/\(i[^;]+;( U;)? CPU.+Mac OS X/.test(userAgent)) {
		window.onload = function () {
			document.body.addEventListener('focusin', handleFocusin);
			document.body.addEventListener('focusout', handleFocusout);
		};
	}
}
