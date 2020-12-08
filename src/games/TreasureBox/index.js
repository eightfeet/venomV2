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
    tools,
} from '@byhealth/walle';
import s from './index.scss';
const { dormancyFor } = tools;
const { createDom, inlineStyle } = htmlFactory;

const stamp = new Date().getTime();

let gameTimer = null;

class Game {
    constructor(config) {
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
            targetId: this.targetId,
        });
        this.Loading = this.core.Loading;

        this.target = null;
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
    renderGame = () => {
        this.gamePrizes = this.prizes;
        return createDom(`<div class="${s.startbtn}">抽奖</div>`, this.targetId, this.parentId, this.emBase )
            .then(() => {
                this.target = document.getElementById(this.targetId);
                return dormancyFor(50);
            })
            .then(() => {
                const startbtn = this.target.querySelector(`.${s.startbtn}`);
                startbtn.onclick = (e) => {
                    e.preventDefault();
                    return this.core.lottery();
                };
            });
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
    lottery = (prize) =>
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
                Promise.resolve()
                    .then(() => resolve(prize));
            }
        });
}

export {
    Game,
    NoticeModal,
    Loading,
    validate,
    Message,
    Modal,
    AddressModal,
    inlineStyle,
};
