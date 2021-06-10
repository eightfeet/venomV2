if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Core from '../Core';
import { Loading, AddressModal, NoticeModal, validate, Message, Modal, htmlFactory, tools } from '@byhealth/walle';
import s from './index.scss';

const { dormancyFor } = tools;
const { createDom, inlineStyle } = htmlFactory;

import { renderGame } from './template';

const stamp = (new Date()).getTime();

let timer = null;

class Game {
	constructor(config){
		const { style, prizes, targetId, parentId, emBase } = config;
		this.targetId = targetId || `game-target-${stamp}${window.Math.floor(window.Math.random() * 100)}`;
		this.emBase = emBase;
		this.prizes = prizes;
		this.GameTheme = style.GameTheme;
		this.parentId         = parentId;
		this.core = new Core({...config,
			lottery: this.lottery,
			targetId: this.targetId});
		this.Loading = this.core.Loading;
		this.destroy = this.core.destroy;
		this.oldDge           = 0;
		this.renderGame();
		this.activeElements = null;
	}

	/**
	 *
	 * 初始化模板
	 * @memberof Game
	 */
	renderGame = () => {
		return createDom(
			renderGame(
				this.GameTheme,
				this.prizes,
				this.targetId
			),
			this.targetId,
			this.parentId,
			this.emBase
		)
			.then(() => {
				const target = document.getElementById(this.targetId);
				target.classList.add(s.target);
				const diceWidth = target.querySelector(`.${s.dice}`).offsetWidth;
				const innerDom = target.getElementsByClassName(s.side);

				for (let index = 0; index < innerDom.length; index++) {
					const element = innerDom[index];
					const className = element.getAttribute('class');
					if (className.indexOf(s.front) !== -1) {
						if (className.indexOf(s.inner) === -1) {
							element.style.webkitTransform = `translateZ(${diceWidth/2}px)`;
						} else {
							element.style.webkitTransform = `translateZ(${diceWidth/2-1}px)`;
						}
					}
					if (className.indexOf(s.back) !== -1) {
						if (className.indexOf(s.inner) === -1) {
							element.style.webkitTransform = `rotateX(-180deg) translateZ(${diceWidth/2}px)`;
						} else {
							element.style.webkitTransform = `rotateX(-180deg) translateZ(${diceWidth/2-1}px)`;
						}
					}
					if (className.indexOf(s.right) !== -1) {
						if (className.indexOf(s.inner) === -1) {
							element.style.webkitTransform = `rotateY(90deg) translateZ(${diceWidth/2}px)`;
						} else {
							element.style.webkitTransform = `rotateY(90deg) translateZ(${diceWidth/2-1}px)`;
						}
					}
					if (className.indexOf(s.left) !== -1) {
						if (className.indexOf(s.inner) === -1) {
							element.style.webkitTransform = `rotateY(-90deg) translateZ(${diceWidth/2}px)`;
						} else {
							element.style.webkitTransform = `rotateY(-90deg) translateZ(${diceWidth/2-1}px)`;
						}
					}
					if (className.indexOf(s.top) !== -1) {
						if (className.indexOf(s.inner) === -1) {
							element.style.webkitTransform = `rotateX(90deg) translateZ(${diceWidth/2}px)`;
						} else {
							element.style.webkitTransform = `rotateX(90deg) translateZ(${diceWidth/2-1}px)`;
						}
					}
					if (className.indexOf(s.bottom) !== -1) {
						if (className.indexOf(s.inner) === -1) {
							element.style.webkitTransform = `rotateX(-90deg) translateZ(${diceWidth/2}px)`;
						} else {
							element.style.webkitTransform = `rotateX(-90deg) translateZ(${diceWidth/2-1}px)`;
						}
					}
					
				}
				return dormancyFor(50);
			})
			.then(() => {
				const target = document.getElementById(this.targetId);
				const lotterybtn = target.querySelector(`.${s.dice}`);
				const showprizebtn = target.querySelector(`.${s.toggleprize}`);
				const prizeslayout = target.querySelector(`.${s.prizeslayout}`);
				lotterybtn.onclick = (e) => {
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
			});
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
		const gamePrize = this.prizes.slice(0, 6);
		// 确认中奖位置
		for (let index = 0; index < gamePrize.length; index++) {
			const element = gamePrize[index];
			if (element.prizeId === prize.prizeId) {
				prizeIndex = index + 1;
			}
		}

		if (prize && !prizeIndex) {
			resolve(prize);
			console.error('所中奖品非展示奖池内奖品');
			return;
		}

		const target = document.getElementById(this.targetId);
		const platformEle = target.querySelector(`.${s.platform}`);
		platformEle.classList.remove(s.stop);
		platformEle.classList.add(s.playing);

		window.clearTimeout(timer);
		timer = setTimeout(() => {
			platformEle.classList.remove(s.playing);
			platformEle.classList.add(s.stop);
			let x = 0, y = 20, z = -20;
			switch (prizeIndex){
				case 1:
					x = 0; y = 20; z = -20;
					break;
				case 2:
					x = -100; y = -150; z = 10;
					break;
				case 3:
					x = 0; y = -100; z = -10;
					break;
				case 4:
					x = 0; y = 100; z = -10;
					break;
				case 5:
					x = 80; y = 120; z = -10;
					break;
				case 6:
					x = 0; y = 200; x = 10;
					break;
			}
					
			target.querySelector(`.${s.dice}`).style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
			target.querySelector(`.${s.dice}`).style.webkitTransform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + z + 'deg)';
					
			platformEle.style.transform = 'translate3d(0,0, 0px)';
			platformEle.style.webkitTransform = 'translate3d(0,0, 0px)';
					
			console.log('结果', prize);
			resolve(prize);
		}, 1120);
	});

}

export {Game, NoticeModal, Loading, validate, Message, Modal, AddressModal, inlineStyle};