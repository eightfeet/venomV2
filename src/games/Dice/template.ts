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

function renderGameInfo(style, prizes, id) {
	const { gameInfoPrizeImg, gameInfoPrizeName, showGameInfoButton, gameInfoWrap, gameInfoContent, gameInfoLayout, gameInfoPrizeItem, gameInfoPrizeTag } = style;

	const showGameInfoButtonStyle = inlineStyle(showGameInfoButton);
	const gameInfoWrapStyle = inlineStyle(gameInfoWrap);
	const gameInfoLayoutStyle = inlineStyle(gameInfoLayout);
	const gameInfoPrizeImgStyle = inlineStyle(gameInfoPrizeImg);
	const gameInfoPrizeNameStyle = inlineStyle(gameInfoPrizeName);
	const gameInfoPrizeItemStyle = inlineStyle(gameInfoPrizeItem);
	const gameInfoContentStyle = inlineStyle(gameInfoContent);
	const gameInfoPrizeTagStyle = inlineStyle(gameInfoPrizeTag);

	let dom = '';

	const infoPrizes = prizes.slice(0, 6);

	for (let index = 0; index < infoPrizes.length; index++) {
		const element = infoPrizes[index];
		dom += `<div class="${s.infoItem} ${id}-item" >
			<div class="${s.gimeinfoItem}"  ${gameInfoPrizeItemStyle ? `style="${gameInfoPrizeItemStyle}"` : ''}>
				<div class="${s.prizeTag} ${s.diceicon} ${s[`icon-dice-${index + 1}`]}" ${gameInfoPrizeTagStyle ? `style="${gameInfoPrizeTagStyle}"` : ''}></div>
				<img ${gameInfoPrizeImgStyle ? `style="${gameInfoPrizeImgStyle}"` : ''} src="${element.gameImg || element.prizeImg}" />
				<div ${gameInfoPrizeNameStyle ? `style="${gameInfoPrizeNameStyle}"` : ''}>${element.prizeAlias || element.prizeName}</div>
			</div>
		</div>`;
	}

	return `<div class="${s.toggleprize}" ${showGameInfoButtonStyle ? `style="${showGameInfoButtonStyle}"` : ''}></div>
	<div id="${id}-info" class="${s.prizeslayout}" ${gameInfoLayoutStyle ? `style="${gameInfoLayoutStyle}"` : ''}>
		<div class="${s.prizeswrap}" ${gameInfoWrapStyle ? `style="${gameInfoWrapStyle}"` : ''}>
			<div class="${s.gameinfo}" ${gameInfoContentStyle ? `style="${gameInfoContentStyle}"` : ''}>${dom}</div>
		</div>
	</div>`;
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
	const { wrap, modify, dice, side, dot } = style;

	const wrapStyle = inlineStyle(wrap);
	const diceStyle = inlineStyle(dice);
	const sideStyle = inlineStyle(side);
	const dotStyle = inlineStyle(dot);

	let dom = `
	<div class="${s.ui_dado}">
		<div class="${s.platform}">
			<div class="${s.dice}  ${id}_dice" style="${diceStyle || ''}">
				<div style="${sideStyle}" class="${s.side} ${s.front} ${id}_side">
					<div style="${dotStyle}" class="${s.dot} ${s.center} ${id}_dot"></div>
				</div>
				<div style="${sideStyle}" class="${s.side} ${s.front} ${s.inner} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.top} ${id}_side">
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dright} ${id}_dot"></div>
				</div>
				<div style="${sideStyle}" class="${s.side} ${s.top} ${s.inner} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.right} ${id}_side">
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.center} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dright} ${id}_dot"></div>
				</div>
				<div style="${sideStyle}" class="${s.side} ${s.right} ${s.inner} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.left} ${id}_side">
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dright} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dright} ${id}_dot"></div>
				</div>
				<div style="${sideStyle}" class="${s.side} ${s.left} ${s.inner} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.bottom} ${id}_side">
					<div style="${dotStyle}" class="${s.dot} ${s.center} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dright} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dright} ${id}_dot"></div>
				</div>
				<div style="${sideStyle}" class="${s.side} ${s.bottom} ${s.inner} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.back} ${id}_side">
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dtop} ${s.dright} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.dbottom} ${s.dright} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.center} ${s.dleft} ${id}_dot"></div>
					<div style="${dotStyle}" class="${s.dot} ${s.center} ${s.dright} ${id}_dot"></div>
				</div>
				<div style="${sideStyle}" class="${s.side} ${s.back} ${s.inner} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.cover} ${s.x} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.cover} ${s.y} ${id}_side"></div>
				<div style="${sideStyle}" class="${s.side} ${s.cover} ${s.z} ${id}_side"></div>
			</div>
		</div>
	</div>
	`;

	return `${modify?.length > 0 ? `<div class="${s.modifywrap}">${renderModify(modify)}</div>` : ''} 
	<div class="${s.wrap} ${id}_wrap" ${wrapStyle ? `style="${wrapStyle}"` : ''}>
	${renderGameInfo(style, prizes, id)}
	<div class="${s.lottery}">
		${dom}
	</div> 
	</div>`;
}
