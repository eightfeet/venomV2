if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Core from '../Core';
import { Loading, htmlFactory, tools } from '@byhealth/walle';
import { CoreConfigType, GameTheme, Prize, Theme } from './../../types/core';
export type ThemeType = Theme<CaseTheme>;
export type GameThemeType = GameTheme<CaseTheme>;
export type GameConfigType = CoreConfigType<CaseTheme>;
export type PrizeType = Prize;

const { dormancyFor } = tools;
const { createDom } = htmlFactory;

const stamp = new Date().getTime();

let gameTimer = null;

interface CaseTheme {
	[keys: string]: any;
}

class Case {
	targetId: string;
	emBase: number;
	prizes: Prize[];
	GameTheme: GameThemeType;
	parentId: string;
	core: Core;
	Loading: Loading;
	target: HTMLElement;
	gamePrizes: Prize[];
	constructor(config: GameConfigType) {
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
			`<button class="${this.targetId}_button game_lottery_button">抽奖</button>`,
			this.targetId,
			this.parentId,
			this.emBase
		);
		this.target = document.getElementById(this.targetId);
		await dormancyFor(50);
		const startbtn: HTMLButtonElement = this.target.querySelector(
			`.${this.targetId}_button`
		);
		startbtn.onclick = (e) => {
			e.preventDefault();
			return this.core.lottery();
		};
	};

	destroy = () => {
		window.clearTimeout(gameTimer);
		this.core.destroy();
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


