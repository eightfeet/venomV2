import s from './index.scss';
import { htmlFactory } from '@byhealth/walle';
const { inlineStyle } = htmlFactory;


/**
 *
 * 创建修饰层
 * @param {Array} modify
 * @returns
 */
function renderModify(modify) {
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
 * 创建奖品信息层
 * @param {Array} modify
 * @returns
 */
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

	return `<div class="${s.toggleprize}" ${showGameInfoButtonStyle ? `style="${showGameInfoButtonStyle}"` : ''}>
		奖品
	</div>
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
 * @returns
 */
export function renderGame(style, prizes, id) {
	const { wrap, backCover, cover, modify, startButton, coverTexts, coverTitle, coverSubTitle, gameResultBackCover, gameResult, gameResultPrizename, gameResultAwardMsg, gameResultMemo, ensureBtn } = style;
	const wrapStyle = inlineStyle(wrap);
	const startButtonStyle = inlineStyle(startButton);
	const coverTextsStyle = inlineStyle(coverTexts);
	const coverTitleStyle = inlineStyle(coverTitle);
	const coverSubTitleStyle = inlineStyle(coverSubTitle);
	const gameResultStyle = inlineStyle(gameResult);
	const gameResultBackCoverStyle = inlineStyle(gameResultBackCover);
	const gameResultPrizenameStyle = inlineStyle(gameResultPrizename);
	const gameResultAwardMsgStyle = inlineStyle(gameResultAwardMsg);
	const gameResultMemoStyle = inlineStyle(gameResultMemo);
	const ensureBtnStyle = inlineStyle(ensureBtn);
	delete cover.height; // 考虑动画原因cave的height的定义将无效
	const coverStyle = inlineStyle(cover);
	const backCoverStyle = inlineStyle(backCover);

	return `${modify.length > 0 ? `<div class="${s.modifywrap}">${renderModify(modify)}</div>` : ''} 
	<div class="${s.wrap}" ${wrapStyle ? `style="${wrapStyle}"` : ''}>
		${renderGameInfo(style, prizes, id)}
		<div class="${s.redpack}" ${backCoverStyle ? `style="${backCoverStyle}"` : ''}>
			<div class="${s.redpackopen}" ${gameResultBackCoverStyle ? `style="${gameResultBackCoverStyle}"` : ''}></div>
			<div class="${s.topcontent}" ${coverStyle ? `style="${coverStyle}"` : ''}>
				<div class="${s.info}" ${coverTextsStyle ? `style="${coverTextsStyle}"` : ''}>
					<div class="${s.subtitle}" ${coverSubTitleStyle ? `style="${coverSubTitleStyle}"` : ''}>开启您的红包</div>
					<div class="${s.title}" ${coverTitleStyle ? `style="${coverTitleStyle}"` : ''}>恭喜发财，大吉大利</div>
				</div>
				<div class="${s.result} ${s.hide}" ${gameResultStyle ? `style="${gameResultStyle}"` : ''}>
					<div class="${s.gameprizename}" ${gameResultPrizenameStyle ? `style="${gameResultPrizenameStyle}"` : ''}>
					</div>
					<div class="${s.gameawardmsg}" ${gameResultAwardMsgStyle ? `style="${gameResultAwardMsgStyle}"` : ''}>
					</div>
				</div>
                <div class="${s.actionbox}">
                    <div class="${s.startbutton}" ${startButtonStyle ? `style="${startButtonStyle}"` : ''}>开始</div>
				</div>
			</div>
			<div class="${s.resultcontent}">
				<div class="${s.gameprize} ${s.hide}">
				</div>
				<div class="${s.memo} ${s.hide}" ${gameResultMemoStyle ? `style="${gameResultMemoStyle}"` : ''}>
				</div>
				<div class="${s.ensure} ${s.hide}" id="${id}-ensure" ${ensureBtnStyle ? `style="${ensureBtnStyle}"` : ''}>
				</div>
				<div class="${s.reset} ${s.hide}" id="${id}-reset">
				</div>
			</div>
        </div>   
	</div>`;
}