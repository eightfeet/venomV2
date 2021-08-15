if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Core from '../Core';
import { Loading, AddressModal, NoticeModal, validate, Message, Modal, htmlFactory, tools, webAnimation } from '@byhealth/walle';
import s from './index.scss';
const { dormancyFor } = tools;
const { createDom, inlineStyle } = htmlFactory;
const { onceTransitionEnd } = webAnimation;

import { renderGame } from './template';
import { handleGamePrizes } from './helper';
import { CoreConfigType } from '~/types/core';

const stamp = (new Date()).getTime();

let gameTimer = null;

class Game {
	targetId: any;
	emBase: any;
	prizes: any;
	GameTheme: any;
	parentId: any;
	core: Core;
	Loading: any;
	target: any;
	itemHeight: any;
	wrapHeight: any;
	prizesRepeats: number;
	repeats: number;
	gamePrizes: any[];
	slotwrap: any;
	constructor(config: CoreConfigType) {
		const { style, prizes, targetId, parentId, emBase } = config;
		this.targetId = targetId || `game-target-${stamp}${window.Math.floor(window.Math.random() * 100)}`;
		this.emBase = emBase;
		this.prizes = prizes;
		this.GameTheme = style.GameTheme;
		this.parentId = parentId;
		this.core = new Core({
			...config,
			lottery: this.lottery,
			targetId: this.targetId
		});
		this.Loading = this.core.Loading;

		this.target = null;
		this.itemHeight = null;
		this.wrapHeight = null;
		this.prizesRepeats = 6; // 每组奖品重复的次数
		this.repeats = 1;
		this.gamePrizes = [];

		this.renderGame();
	}

	/**
	 *
	 * 初始化翻牌模板
	 * @memberof Game
	 */
	renderGame = async () => {
		const { prizesResult, repeats} = handleGamePrizes(this.prizes, this.prizesRepeats);
		this.repeats = repeats;
		this.gamePrizes = prizesResult;

		await createDom(
			renderGame(
				this.GameTheme,
				this.gamePrizes,
				this.prizes,
				this.targetId
			),
			this.targetId,
			this.parentId,
			this.emBase
		);
		this.target = document.getElementById(this.targetId);
		this.slotwrap = this.target.querySelector(`.${s.slotwrap}`);
		this.target.classList.add(s.target);
		this.itemHeight = this.target.querySelector(`.${s.game}`).offsetHeight;
		this.wrapHeight = this.itemHeight * this.gamePrizes.length;
		this.slotwrap.style.height = `${this.wrapHeight}px`;
		await dormancyFor(50);
		this.slotwrap.style.visibility = 'visible';
		const startbtn = this.target.querySelector(`.${s.startbtn}`);
		const showprizebtn = this.target.querySelector(`.${s.toggleprize}`);
		const prizeslayout = this.target.querySelector(`.${s.prizeslayout}`);
		startbtn.onclick = (e: { preventDefault: () => void; }) => {
			e.preventDefault();
			return this.core.lottery();
		};
		let showPrize = false;
		const toggle = () => {
			if (showPrize) {
				prizeslayout.classList.remove(s.showprizes);
				showprizebtn.style.display = 'block';
				showPrize = false;
			} else {
				prizeslayout.classList.add(s.showprizes);
				showprizebtn.style.display = 'none';
				showPrize = true;
			}
		};
		showprizebtn.onclick = () => {
			toggle();
		};
		prizeslayout.onclick = () => {
			toggle();
		};
	}

	destroy = () => {
		window.clearTimeout(gameTimer);
		this.core.destroy();
	}

	/**
	 *
	 * 开始抽奖
	 * @param {Object} prize 所获奖品
	 * @param {Number} time 旋转时间默认5秒
	 * @param {Number} round 旋转圈数默认6圈
	 * @returns
	 * @memberof Game
	 */
	lottery = (prize) => new Promise((resolve) => {
		let prizeIndex = null;
		// 确认中奖位置
		for (let index = 0; index < this.prizes.length; index++) {
			const element = this.prizes[index];
			if (element.prizeId === prize.prizeId) {
				prizeIndex = index + 1;
				break;
			}
		}

		if (prize && !prizeIndex) {
			resolve(prize);
			console.log('所中奖品非展示奖池内奖品', prize);
			console.error('所中奖品非展示奖池内奖品');
			return;
		}

		if (prizeIndex !== null) {
			Promise.resolve()
				.then(async () => {
					let beginningIndex = null;
					let endingIndex = null;
					for (let index = this.gamePrizes.length - 1; index > 0; index--) {
						const element = this.gamePrizes[index];
						if (element['prizeId'] === prize.prizeId) {
							endingIndex = index;
							break;
						}
					}

					for (let index = 0; index < this.gamePrizes.length; index++) {
						const element = this.gamePrizes[index];
						if (element['prizeId'] === prize.prizeId) {
							beginningIndex = index;
							break;
						}
					}

					const endingPositionY = endingIndex * this.itemHeight;
					const beginningPositionY = beginningIndex * this.itemHeight;
					this.slotwrap.style.webkitTransition = `top ${this.gamePrizes.length*115}ms cubic-bezier(0.77, 0, 0.21, 1) 0s`;
					this.slotwrap.style.top = `-${endingPositionY + this.itemHeight/4}px`;
					await Promise.resolve();
					await onceTransitionEnd(this.slotwrap);
					this.slotwrap.style.webkitTransition = 'top 800ms cubic-bezier(0, 0, 0.42, 1) 0s';
					this.slotwrap.style.top = `-${endingPositionY}px`;
					await onceTransitionEnd(this.slotwrap);
					this.slotwrap.style.webkitTransition = null;
					this.slotwrap.style.top = `-${beginningPositionY}px`;
				})
				.then(() => resolve(prize));
		}
	});

}

export { Game, NoticeModal, Loading, validate, Message, Modal, AddressModal, inlineStyle };