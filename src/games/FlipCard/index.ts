if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Core from '../Core';
import { Loading, AddressModal, NoticeModal, validate, Message, Modal, htmlFactory, tools } from '@byhealth/walle';
import s from './index.scss';

const { dormancyFor } = tools;
const { createDom, inlineStyle } = htmlFactory;

import { renderGame } from './template';
import { CoreConfigType, Prize } from '~/types/core';

// 设定必要初始值
const stepX = 16.66666;
const stepY = 25;

const Arr: {
	[keys: number]: number[][]
} = {
	1: [[1,2]],
	2: [[1,1],[1,3]],
	3: [[1,1],[1,3],[2,2]],
	4: [[1,1],[1,3],[2,1],[2,3]],
	5: [[1,0],[1,2],[1,4],[2,1],[2,3]],
	6: [[1,0],[1,2],[1,4],[2,0],[2,2],[2,4]]
};

let oldStyle = null;

const stamp = (new Date()).getTime();
/**
 *
 * 洗牌工具
 * @param { Array } arr
 * @returns
 */
function KdShuffle(arr){
	let len = arr.length,
		i,temp;
	while (len){
		i = Math.floor(Math.random() * len--);
		temp = arr[i];
		arr[i] = arr[len];
		arr[len] = temp;
	}
	return arr;
}

class Game {
	targetId: string;
	timer: { timerDelay: any; timer: any; timerB: any; };
	prizes: Prize[];
	GameTheme: any;
	parentId: any;
	emBase: any;
	core: Core;
	Loading: any;
	destroy: any;
	activeElements: any;
	lotteryDrawing: boolean;
	constructor(config: CoreConfigType){
		const { style, prizes, targetId, parentId, onCancel, onEnsure, saveAddress, emBase } = config;
		this.targetId = targetId || `game-target-${stamp}${window.Math.floor(window.Math.random() * 100)}`;
		this.timer = {
			timerDelay: null,
			timer: null,
			timerB: null
		};
		this.prizes = prizes;
		this.GameTheme = style.GameTheme;
		this.parentId         = parentId;
		this.emBase = emBase;
		this.core = new Core({...config,
			onCancel: this.onCancel(onCancel),
			onEnsure: this.onEnsure(onEnsure),
			lottery: this.lottery,
			saveAddress: this.onSaveAddress(saveAddress),
			targetId: this.targetId});
		this.Loading = this.core.Loading;
		this.destroy = this.core.destroy;
		this.renderGame()
			.then(() => new Promise<void>(resolve => {
				this.core.lotteryDrawing = true;
				this.distributePrize(undefined, undefined);
				this.flipAll(180);
				window.clearTimeout(this.timer.timerDelay);
				this.timer.timerDelay = setTimeout(() => {
					this.flipAll(0);
					resolve();
				}, 3000);
			}))
			.then(() => {
				this.reset();
				this.core.lotteryDrawing = false;
			});
		this.activeElements = null;
	}

	/**
	 *
	 * 初始化翻牌模板
	 * @memberof Game
	 */
	renderGame = () => {
		const prizesLength = this.prizes.length > 6 ? 6 : this.prizes.length;
		const itemPosition = Arr[prizesLength];
		return createDom(
			renderGame(
				this.GameTheme,
				(this.prizes.length > 6 ? this.prizes.slice(0, 6) : this.prizes)
			),
			this.targetId,
			this.parentId,
			this.emBase
		)
			.then(() => {
				const target = document.getElementById(this.targetId);
				target.classList.add(s.target);
				return dormancyFor(200);
			})
			.then(() => {
				const target = document.getElementById(this.targetId);
				const items = target.querySelector(`.${s.wrap}`).children;
				for (let index = 0; index < items.length; index++) {
					const element: any = items[index];
					if (element) {
						element.style.left = `${itemPosition[index][1]*stepX}%`;
						element.style.top = `${itemPosition[index][0] === 1 ? 0 : stepY*2}%`;
						element.children[0].onclick = () => {
							this.activeElements = index;
							return this.core.lottery();
						};
					}
				}
			});
	}


	/**
	 *
	 * @param { function } cancel
	 * @memberof Game
	 */
	onCancel = (cancel) => () => {
		cancel && cancel();
		this.reset();
	}

	/**
	 *
	 * @param { function } cancel
	 * @memberof Game
	 */
	onEnsure = (ensure) => (prize) => {
		ensure && ensure(prize);
		if (prize.receiveType !== 2) {
			this.reset();
		}
	}

	/**
	 * 保存地址成功后重置游戏
	 * @param { Function } saveAddress 承接保存地址方法
	 * @memberof Game
	 */
	onSaveAddress = (saveAddress) => (data: any) => {
		if (saveAddress && typeof saveAddress === 'function') {
			return saveAddress(data)
				.then(() => this.reset());
		}
		return () => {
			throw '无保存地址方法, 确保方法new Promise & resolve';
		};
	}

	/**
	 * 分发奖品到对应卡牌
	 * @param { HtmlNode } target 触发的目标卡牌
	 * @param { Object } prize 当前中奖对象
	 * @memberof Game
	 */
	distributePrize = (target: Element, prize: Prize) => {
		const { prizeImage, prizeTitle, cardSelected } = this.GameTheme;
		const flipIndex = target ? parseInt(target.getAttribute('data-index'), 10) : -1;
		
		let newPrizeArr = this.prizes;
		if (prize) {
			// 1、奖品组中过滤掉已中奖品
			newPrizeArr = this.prizes.filter((item) => item.prizeId !== prize.prizeId);
			// 2、洗牌取出的奖品
			newPrizeArr = KdShuffle(newPrizeArr);
			// 3、在索引位置（对应target所在Dom中的索引位）插入所中奖品，
			newPrizeArr.splice(flipIndex, 0, prize);
			// 4、将新排位的奖品结果写入Dom
		}

		const game = document.getElementById(this.targetId);
		const length = newPrizeArr.length > 6 ? 6 : newPrizeArr.length;
		for (let index = 0; index < length; index++) {
			const element = newPrizeArr[index];
			game.querySelector(`.${s.wrap}`).children[index].querySelector(`.${s.back}`).innerHTML =
			`<div style="${prizeImage && inlineStyle(prizeImage)}">
				<img src="${element.prizeImg}" />
			</div>
			<div style="${prizeTitle && inlineStyle(prizeTitle)}">
				${element.prizeAlias}
			</div>`;
		}

		if (target) {
			const prizeDom = target.querySelector(`.${s.back}`);
			oldStyle = prizeDom.getAttribute('style');
			prizeDom.setAttribute('style', `${oldStyle}; ${cardSelected && inlineStyle(cardSelected)}`);
		}
	}

	/**
	 *
	 * 翻转卡牌180度
	 * @returns Promise
	 * @param { HtmlNode } element
	 * @memberof Game
	 */
	flip = (element) => new Promise<void>(resolve => {
		element.style.transform = 'rotateY(180deg)';
		element.style.webkitTransform = 'rotateY(180deg)';
		setTimeout(() => {
			resolve();
		}, 200);
	})

	/**
	 *
	 * 翻转全部卡牌
	 * @returns Promise
	 * @param {Number} deg 翻转角度，180或0
	 * @memberof Game
	 */
	flipAll = (deg: number) => new Promise<void>(resolve => {
		const target = document.getElementById(this.targetId);
		const items = target.querySelector(`.${s.wrap}`).children;
		for (let index = 0; index < items.length; index++) {
			const element: any = items[index];
			element.children[0].style.transform = `rotateY(${deg}deg)`;
			element.children[0].style.webkitTransform = `rotateY(${deg}deg)`;
		}
		setTimeout(() => {
			resolve();
		}, 200);
	})

	/**
	 *
	 * 重置抽奖
	 * @memberof Game
	 */
	reset = () => {
		const prizesLength = this.prizes.length > 6 ? 6 : this.prizes.length;
		const itemPosition = Arr[prizesLength];
		const target = document.getElementById(this.targetId);
		const items = target.querySelector(`.${s.wrap}`).children;
		this.flipAll(0);
		window.clearTimeout(this.timer.timer);
		this.timer.timer = setTimeout(() => {
			for (let index = 0; index < items.length; index++) {
				const element: any = items[index];
				element.style.left = null;
				element.style.top = null;
			}
		}, 200);
		
		window.clearTimeout(this.timer.timerB);
		this.timer.timerB = setTimeout(() => {
			this.lotteryDrawing = false;
			for (let index = 0; index < items.length; index++) {
				const element: any = items[index];
				element.style.left = `${itemPosition[index][1]*stepX}%`;
				element.style.top = `${itemPosition[index][0] === 1 ? 0 : stepY*2}%`;
				oldStyle && element.querySelector(`.${s.back}`).setAttribute('style', `${oldStyle}`);
			}
		}, 800);
	}


	lottery = async (prize: Prize) => {
		const target = document.getElementById(this.targetId);
		const items = target.querySelector(`.${s.wrap}`).children;
		// 多触发点抽奖，启用自动抽奖时随机触发一个元素
		let activeElements = window.Math.floor(window.Math.random() * this.prizes.length);
		if (this.activeElements !== null) {
			activeElements = this.activeElements;
		}

		const element = items[activeElements].children[0];
		
		await Promise.resolve();
		this.distributePrize(element, prize);
		await this.flip(element);
		await dormancyFor(600);
		await this.flipAll(180);
		await dormancyFor(600);
		return await new Promise(resolve => resolve(prize));
	};

}

export {Game, NoticeModal, Loading, validate, Message, Modal, AddressModal, inlineStyle};