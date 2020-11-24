let fontSize = '';
(function(doc, win) {
	const UI = {
		width: 750,
		baseonFontsize: 31
	};
	
	let docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function() {
			let clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= UI.width) {
				fontSize = docEl.style.fontSize = UI.baseonFontsize + "px";
			} else {
				fontSize = docEl.style.fontSize = UI.baseonFontsize * (clientWidth / UI.width) + "px";
			}
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener("DOMContentLoaded", recalc, false);
})(document, window);

export default fontSize;
