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
export function renderGame(style, prizes, id) {
	const { wrap, modify, gameImg, prizeAlias, needle, lotteryButton, wheel, divide } = style;
	const prizeLength = prizes.length;
	const eachDeg = 360 / prizeLength;
	let dom = '';

	const gameImgStyle = inlineStyle(gameImg);
	const prizeAliasStyle = inlineStyle(prizeAlias);
	const needleStyle = inlineStyle(needle);
	const lotteryButtonStyle = inlineStyle(lotteryButton);
	const wrapStyle = inlineStyle(wrap);
	const wheelStyle = inlineStyle(wheel);
	const divideStyle = inlineStyle(divide);
	
	for (let index = 0; index < prizeLength; index++) {
		const element = prizes[index];
		const deg = index * eachDeg;
		dom += `<div class="${s.award}" 
		style="transform:rotate(${deg + eachDeg/2}deg); -webkit-transform:rotate(${deg + eachDeg/2}deg)">
			<div class="${s.prizealias} ${id}_prizealias" ${prizeAliasStyle && `style="${prizeAliasStyle}"`}>${element.prizeAlias}</div>
			<img class="${s.gameimg} ${id}_gameImg" ${gameImgStyle && `style="${gameImgStyle}"`} src="${element.gameImg}" />
		</div><div class="${s.divide} ${id}_divide"  style="transform:rotate(${deg}deg); -webkit-transform:rotate(${deg}deg); ${divideStyle ? divideStyle : ''}"></div>`;
	}
	
	return `${modify.length > 0 ? `<div class="${s.modifywrap}">${renderModify(modify)}</div>` : ''} 
	<div class="${s.wrap}  ${id}_wrap" ${wrapStyle ? `style="${wrapStyle}"` : ''}>
		<div class="${s.lottery}">
			<div class="${s.wheel} ${id}_wheel"  ${wheelStyle ? `style="${wheelStyle}"` : ''}>
				${dom}
			</div>
		</div> 
		<div class="${s.needle} ${id}_needle" ${needleStyle ? `style="${needleStyle}"` : ''}>&nbsp;</div>
		<div class="${s.lotterybutton} ${id}_lotterybutton" ${lotteryButtonStyle ? `style="${lotteryButtonStyle}"` : ''}>&nbsp;</div>
	</div>`;
}
