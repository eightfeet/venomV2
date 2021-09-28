import s from './index.scss';
import { htmlFactory } from '@byhealth/walle';
import { Prize } from '~/types/core';
import { Properties } from 'csstype';
const { inlineStyle } = htmlFactory;

/**
 *
 * 创建修饰层
 * @param {Array} modify
 * @returns
 */
function renderModify(modify: Properties[]) {
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
	const { gameInfoPrizeImg, gameInfoPrizeName, showGameInfoButton, gameInfoWrap, gameInfoContent, gameInfoLayout, gameInfoPrizeItem } = style;

	const showGameInfoButtonStyle = inlineStyle(showGameInfoButton);
	const gameInfoWrapStyle = inlineStyle(gameInfoWrap);
	const gameInfoLayoutStyle = inlineStyle(gameInfoLayout);
	const gameInfoPrizeImgStyle = inlineStyle(gameInfoPrizeImg);
	const gameInfoPrizeNameStyle = inlineStyle(gameInfoPrizeName);
	const gameInfoPrizeItemStyle = inlineStyle(gameInfoPrizeItem);
	const gameInfoContentStyle = inlineStyle(gameInfoContent);

	let dom = '';

	for (let index = 0; index < prizes.length; index++) {
		const element = prizes[index];
		dom += `<div class="${s.infoItem} ${id}-item" >
			<div class="${s.gimeinfoItem}"  ${gameInfoPrizeItemStyle ? `style="${gameInfoPrizeItemStyle}"` : ''}>
				<img ${gameInfoPrizeImgStyle ? `style="${gameInfoPrizeImgStyle}"` : ''} src="${element.gameImg || element.prizeImg}" />
				<div ${gameInfoPrizeNameStyle ? `style="${gameInfoPrizeNameStyle}"` : ''}>${element.prizeAlias || element.prizeName}</div>
			</div>
		</div>`;
	}

	return `<div class="${s.toggleprize}" ${showGameInfoButtonStyle ? `style="${showGameInfoButtonStyle}"` : ''}></div>
	<div id="${id}-info" class="${s.prizeslayout}"" ${gameInfoLayoutStyle ? `style="${gameInfoLayoutStyle}"` : ''}>
		<div class="${s.prizeswrap}" ${gameInfoWrapStyle ? `style="${gameInfoWrapStyle}"` : ''}>
			<div class="${s.gameinfo}" ${gameInfoContentStyle ? `style="${gameInfoContentStyle}"` : ''}>${dom}</div>
		</div>
	</div>`;
}

function renderGamePrize(style, prizes: Prize[], id: string) {
	let dom = '';
	const { gamePrizeName, gamePrizeImg, gameItem, game} = style;
	const gamePrizeNameStyle = inlineStyle(gamePrizeName);
	const gamePrizeImgStyle = inlineStyle(gamePrizeImg);
	const gameItemStyle = inlineStyle(gameItem);
	const gameStyle = inlineStyle(game);

	for (let index = 0; index < prizes.length; index++) {
		const element = prizes[index];
		dom += `<div class="${s.gameitem} ${id}_gameitem_wrap" style="height:${(1 / prizes.length) * 100}%;">
			<div ${gameItemStyle ? `style="${gameItemStyle}"` : ''} class="${id}_gameitem">
				<img ${gamePrizeImgStyle ? `style="${gamePrizeImgStyle}"` : ''} src="${element.gameImg || element.prizeImg}" class="${id}_gameimg" />
				<p ${gamePrizeNameStyle ? `style="${gamePrizeNameStyle}"` : ''} style="position: absolute; top:0" class="${id}_prizealias">${element.prizeAlias || element.prizeName}</p>
			</div>
		</div>`;
	}

	return `<div class="${s.game} ${id}_game" ${gameStyle ? `style="${gameStyle}"` : ''}>
		<div class="${s.slotwrap} ${id}_gamewrap">
			${dom}
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
export function renderGame(style, gamePrizes: Prize[], prizes: Prize[], id: string) {
	const { wrap, modify, startButton } = style;
	const wrapStyle = inlineStyle(wrap);
	const startButtonStyle = inlineStyle(startButton);

	return `${modify?.length > 0 ? `<div class="${s.modifywrap}">${renderModify(modify)}</div>` : ''} 
	<div class="${s.wrap} ${id}_wrap" ${wrapStyle ? `style="${wrapStyle}"` : ''}>
		${renderGameInfo(style, prizes, id)}
		${renderGamePrize(style, gamePrizes, id)}
	</div>
	<div class="${s.startbtn} ${id}_startbtn" ${startButtonStyle ? `style="${startButtonStyle}"` : ''}>开始游戏</div>`;
}
