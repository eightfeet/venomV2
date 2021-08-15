if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Core from '../Core';
import { Loading, AddressModal, NoticeModal, validate, Message, Modal, htmlFactory, tools } from '@byhealth/walle';

const { dormancyFor } = tools;
const { createDom, inlineStyle } = htmlFactory;

import { renderGame } from './template';
import s from './index.scss';
import { getGameDataLength, supplementingData } from './helper';
import { Prize } from '~/types/core';

const stamp = (new Date()).getTime();

class Game {
	targetId: any;
	emBase: any;
	prizesLength: any;
	prizes: any;
	GameTheme: any;
	parentId: any;
	core: Core;
	Loading: any;
	destroy: any;
	historyPrizeInd: number;
	buffer: number;
	lotteryDrawing: boolean;
	constructor(config){
		const { style, prizes, targetId, parentId, emBase } = config;
		this.targetId = targetId || `game-target-${stamp}${window.Math.floor(window.Math.random() * 100)}`;
		this.emBase = emBase;
		this.prizesLength = getGameDataLength(prizes.length);
		this.prizes = supplementingData(prizes, this.prizesLength);
		this.GameTheme = style.GameTheme;
		this.parentId         = parentId;
		this.core = new Core({...config,
			targetId: this.targetId,
			lottery: this.lottery
		});
		this.Loading = this.core.Loading;
		this.destroy = this.core.destroy;
		this.renderGame();
		// 历史位置
		this.historyPrizeInd = 0;
		// 缓冲阈值
		this.buffer = 5;
	}

	renderGame = () => {
		return createDom(
			renderGame(
				this.GameTheme,
				this.prizes,
				`${this.targetId}_items`
			),
			this.targetId,
			this.parentId,
			this.emBase
		)
			.then(() => {
				const target = document.getElementById(this.targetId);
				target.classList.add(s.target);
				return dormancyFor(50);
			})
			.then(() => {
				const target = document.getElementById(this.targetId);
				const lotterybtn: any = target.querySelector(`.${s.lotterybutton}`);
				lotterybtn.onclick = () => {
					return this.core.lottery();
				};
			});
	}

	/**
	 *
	 * 开始抽奖
	 * @param {Number} time 旋转时间默认5秒
	 * @returns
	 * @memberof Game
	 */
	// 渲染遗留数据
	lotteryHistory = (time?: number) => {
		let itemsDomList = document.getElementById(`${this.targetId}_items`).children;
		let surplus = this.historyPrizeInd;
		let settime = time || 100;
		return new Promise<void>(resolve => {
			if (surplus <= 0) {
				return resolve();
			}
			let timer = null;
			const that = this;
			(function run() {
				for (let index = 0; index < that.prizesLength; index++) {
					const element = itemsDomList[index];
					element.classList.remove(s.active);
				}
				itemsDomList[surplus].classList.add(s.active);
				surplus++;
				window.clearTimeout(timer);
				timer = setTimeout(() => {
					if (surplus < that.prizesLength) {
						run();
					} else {
						resolve();
					}
				}, settime + that.buffer * 50);
			})();
		});
	}
	/**
	 *
	 * 开始抽奖
	 * @param {Object} prize 所获奖品
	 * @param {Number} time 每个奖项停留时间
	 * @param {Number} round 旋转圈数默认6圈
	 * @returns
	 * @memberof Game
	 */
	startLottery = (prize: Prize, time?: number, round?: number) => {
		const { prizeId } = prize || {};
		return new Promise((resolve, reject) => {
			if (!prizeId) {
				this.lotteryDrawing = false;
				return reject('抽奖失败！');
			}
			let getPrizeInd = 0;
			for (let index = 0; index < this.prizes.length; index++) {
				const element = this.prizes[index];
				if (element.prizeId === prize.prizeId) {
					getPrizeInd = index;
					break;
				}
			}

			let itemsDomList = document.getElementById(`${this.targetId}_items`).children;

			let settime = time || 100;

			let timer = null;
			// 指针位置
			let pointerLocation = 0;
			// 默认几圈
			let defaultCircle = round || 3;
			// 算出路程
			let pathLength = defaultCircle * this.prizesLength + getPrizeInd;
			const that = this;
			(function fun() {
				for (let index = 0; index < itemsDomList.length; index++) {
					const element = itemsDomList[index];
					element.classList.remove(s.active);
				}
				itemsDomList[pointerLocation % that.prizesLength].classList.add(s.active);
				window.clearTimeout(timer);
				timer = setTimeout(() => {
					pointerLocation++;
					if (pointerLocation < 10 && that.buffer !== 0) {
						that.buffer--;
					}
					if (pointerLocation > pathLength - 10) {
						that.buffer++;
					}
					if (pointerLocation <= pathLength) {
						fun();
					} else {
						pointerLocation = 0;
						that.buffer = 0;
						resolve(prize);
						that.historyPrizeInd = getPrizeInd;
						// console.log(`中奖${prize}`, `位置${getPrizeInd}`);
						that.lotteryDrawing = false;
					}
				}, settime + that.buffer * 50);
			})();
		});
	}

	lottery = prize => {
		return Promise.resolve()
			.then(() => this.lotteryHistory())
			.then(() => this.startLottery(prize));
	}
}

export {Game, NoticeModal, Loading, validate, Message, Modal, AddressModal, inlineStyle};