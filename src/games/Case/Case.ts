if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Core from '../Core';
import { Loading, htmlFactory, tools } from '@byhealth/walle';
import s from './index.scss';
import { Prize, CoreConfigType } from '~/types/core';
const { dormancyFor } = tools;
const { createDom } = htmlFactory;

const stamp = new Date().getTime();

let gameTimer = null;

interface CaseConfigType extends CoreConfigType {

}

class Case {
	targetId: string;
	emBase: number;
	prizes: Prize[];
	GameTheme: { [keys: string]: any };
	parentId: string;
	core: Core;
	Loading: Loading;
	target: HTMLElement;
	gamePrizes: Prize[];
	constructor(config: CaseConfigType) {
		const { style, prizes, targetId, parentId, emBase } = config;
		this.targetId =
			targetId ||
			`game-target-${stamp}${window.Math.floor(
				window.Math.random() * 100
			)}`;
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
		this.gamePrizes = [];
		this.renderGame();
	}

	/**
	 *
	 * 初始化翻牌模板
	 * @memberof Game
	 */
	renderGame = async () => {
		this.gamePrizes = this.prizes;
		await createDom(
			`<button class="${s.startbtn} ${this.targetId}_button">抽奖</button>`,
			this.targetId,
			this.parentId,
			this.emBase
		);
		this.target = document.getElementById(this.targetId);
		await dormancyFor(50);
		const startbtn: HTMLButtonElement = this.target.querySelector(
			`.${s.startbtn}`
		);
		startbtn.onclick = (e) => {
			e.preventDefault();
			return this.core.lottery();
		};
	};

	distory = () => {
		window.clearTimeout(gameTimer);
		this.core.distory();
	};

	/**
	 *
	 * 开始抽奖
	 * @param {Object} prize 所获奖品
	 * @memberof Game
	 */
	lottery: (prize: Prize) => Promise<any> = (prize: Prize) =>
		new Promise((resolve) => {
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
				Promise.resolve().then(() => resolve(prize));
			}
		});
}

export default Case;


