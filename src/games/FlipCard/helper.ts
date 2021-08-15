import s from './index.scss';
import { htmlFactory } from '@byhealth/walle';
const { inlineStyle } = htmlFactory;


/**
 *
 * 创建修饰层
 * @param {Array} modify
 * @returns
 */
function renderModify(modify){

	if (!modify || !Array.isArray(modify)) {
		return '';
	}

	let modifyDom = '';
	for (let index = 0; index < modify.length; index++) {
		const element = modify[index];
		modifyDom += `<div class="${s.modify}" style="${inlineStyle(element)}">&nbsp;</div>`;
	}

	return modifyDom;
}

/**
 *
 * 创建游戏主体
 * @export
 * @param { Object } style 卡牌皮肤
 * @param { Array } prizes 奖项
 * @returns
 */
export function renderGame(style, prizes) {
	const { wrap, cardCover, cardInside, cardWrap, modify } = style;
	const prizeLength = prizes.length;
	let dom = '';
	for (let index = 0; index < prizeLength; index++) {
		const element = prizes[index];
		dom += `<div class="${s.item}" style="${cardWrap && inlineStyle(cardWrap)}">
            <div class="${s.flipper}" data-index="${index}">
                <div class="${s.front}" style="background-image: url(${element.gameImg}); ${cardInside && inlineStyle(cardInside)}">&nbsp;</div>
                <div class="${s.back}" style="${cardCover && inlineStyle(cardCover)}">&nbsp;</div>
            </div>
      </div>`;
	}
	return `${modify.length > 0 ? `<div class="${s.modifywrap}">${renderModify(modify)}</div>` : ''} <div class="${s.wrap}" style="${wrap && inlineStyle(wrap)}">${dom}</div>`;
}

/**
 * 坐标数组
 */
export const Arr: {
    [keys: number]: number[][];
} = {
	1: [[1, 2]],
	2: [
		[1, 1],
		[1, 3]
	],
	3: [
		[1, 1],
		[1, 3],
		[2, 2]
	],
	4: [
		[1, 1],
		[1, 3],
		[2, 1],
		[2, 3]
	],
	5: [
		[1, 0],
		[1, 2],
		[1, 4],
		[2, 1],
		[2, 3]
	],
	6: [
		[1, 0],
		[1, 2],
		[1, 4],
		[2, 0],
		[2, 2],
		[2, 4]
	]
};

/**
 *
 * 洗牌工具
 * @param { Array } arr
 * @returns
 */
export function KdShuffle(arr: any[]) {
	let len = arr.length,
		i: number,
		temp: any;
	while (len) {
		i = Math.floor(Math.random() * len--);
		temp = arr[i];
		arr[i] = arr[len];
		arr[len] = temp;
	}
	return arr;
}