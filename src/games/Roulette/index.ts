if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Core from '../Core';
import {
	Loading,
	AddressModal,
	NoticeModal,
	validate,
	Message,
	Modal,
	htmlFactory,
	tools
} from '@byhealth/walle';
import s from './index.scss';

const { dormancyFor } = tools;
const { createDom, inlineStyle } = htmlFactory;

import { renderGame } from './template';
import { CoreConfigType, Prize } from '~/types/core';

const stamp = new Date().getTime();

class Game {
	targetId: any;
	emBase: any;
	prizes: any;
	GameTheme: any;
	parentId: any;
	core: Core;
	Loading: any;
	distory: any;
	oldDge: number;
	activeElements: any;
	lotteryDrawing: boolean;
	roundTimer: any;
	constructor(config: CoreConfigType) {
		const { style, prizes, targetId, parentId, emBase } = config;
		this.targetId =
			targetId ||
			`game-target-${stamp}${window.Math.floor(window.Math.random() * 100)}`;
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
		this.distory = this.core.distory;
		this.oldDge = 0;
		this.renderGame();
		this.activeElements = null;
	}

	/**
	 *
	 * 初始化转盘模板
	 * @memberof Game
	 */
	renderGame = async () => {
		await createDom(
			renderGame(this.GameTheme, this.prizes, this.targetId),
			this.targetId,
			this.parentId,
			this.emBase
		);
		const target = document.getElementById(this.targetId);
		target.classList.add(s.target);
		await dormancyFor(50);
		const target_1 = document.getElementById(this.targetId);
		const lotterybtn: HTMLElement = target_1.querySelector(`.${s.lotterybutton}`);
		lotterybtn.onclick = (e) => {
			e.preventDefault();
			return this.core.lottery();
		};
	};

	/**
	 *
	 * 开始抽奖
	 * @param {Object} prize 所获奖品
	 * @param {Number} time 旋转时间默认5秒
	 * @param {Number} round 旋转圈数默认6圈
	 * @returns
	 * @memberof Game
	 */
	lottery = (prize: Prize, time?: string, round?: number) => {
		console.log(1);
		const { prizeId } = prize || {};
		const target = document.getElementById(this.targetId);
		const wheel = target.querySelector(`.${s.lottery}`);
		const length = this.prizes.length;
		const eachDeg = 360 / length;

		return new Promise((resolve, reject) => {
			if (!prizeId) {
				console.log(0);
				this.lotteryDrawing = false;
				return reject('抽奖失败！');
			}
			console.log(2);
			const newtime = parseInt(time, 0) || 5;

			const defaultRound = round || 6;
			let position = 0;
			const halfDeg = eachDeg / 2;
			this.prizes.forEach((el: { prizeId: string; }, index: number) => {
				if (el.prizeId === prizeId) {
					position = length - (index + 1);
				}
			});
			console.log(3);
			let newdeg = eachDeg * position;
			newdeg += 360 * defaultRound; // 默认旋转几周
			newdeg = newdeg + halfDeg;
			newdeg = newdeg + this.oldDge;
			this.oldDge = (newdeg - (newdeg % 360)) % 360;
			wheel.setAttribute('style', '');
			console.log('旋转4', 5);
			const comput1 = window.getComputedStyle(wheel);
			console.log(comput1['-webkit-transition-duration']);
			console.log(comput1['transition-duration']);
			console.log(comput1['-webkit-transform']);
			console.log(comput1['transform']);
			const css = `-webkit-transition-duration: ${newtime}s;
						transition-duration: ${newtime}s;
						-webkit-transform: rotate(${newdeg}deg);
						transform: rotate(${newdeg}deg)`;
			wheel.setAttribute('style', css);
			console.log('====================================');
			const comput2 = window.getComputedStyle(wheel);
			console.log(comput2['-webkit-transition-duration']);
			console.log(comput2['transition-duration']);
			console.log(comput2['-webkit-transform']);
			console.log(comput2['transform']);
			console.log(5);

			window.clearTimeout(this.roundTimer);
			this.roundTimer = setTimeout(() => {
				const css = `
						-webkit-transform: rotate(${newdeg % 360}deg);
						transform: rotate(${newdeg % 360}deg)`;
				wheel.setAttribute('style', css);
				resolve(prize);
				this.lotteryDrawing = false;
			}, newtime * 1000);
		});
	};
}

export {
	Game,
	NoticeModal,
	Loading,
	validate,
	Message,
	Modal,
	AddressModal,
	inlineStyle
};
