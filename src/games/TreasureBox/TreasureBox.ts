if (window.Promise === undefined) {
    throw new Error('Promise pollyfill not found.');
}

import { Loading, htmlFactory, tools } from '@byhealth/walle';
import { Prize, CoreConfigType } from '~/types/core';

import Core from '../Core';
import s from './index.scss';
import { renderGame } from './template';
// import Swiper JS
import Swiper from 'swiper';
// import Swiper styles
import 'swiper/swiper-bundle.css';

const { dormancyFor } = tools;
const { createDom } = htmlFactory;

const stamp = new Date().getTime();
let gameTimer = null;

interface TreasureBoxConfigType extends CoreConfigType {}

class TreasureBox {
    targetId: string;
    emBase: number;
    prizes: Prize[];
    GameTheme: { [keys: string]: any };
    parentId: string;
    core: Core;
    Loading: Loading;
    target: HTMLElement;
    gamePrizes: Prize[];
    constructor(config: TreasureBoxConfigType) {
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
        this.gamePrizes = [];
        this.renderGame();
    }

    /**
     *
     * 初始化翻牌模板
     * @memberof TreasureBox
     */
    renderGame = async () => {
        this.gamePrizes = this.prizes;
        await createDom(
            renderGame({
                prizes: this.gamePrizes
            }),
            this.targetId,
            this.parentId,
            this.emBase
        );
        console.log('0000');
        if (this.gamePrizes.length > 4) {
            console.log(1111111)
            const swiper = new Swiper(`.${s.prizebox}`, {
                slidesPerView: 4,
                loop: true,
            });
        }
        
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

    /**
     * 销毁
     * @memberof TreasureBox
     */
    distory = () => {
        window.clearTimeout(gameTimer);
        this.core.distory();
    };

    /**
     *
     * 开始抽奖
     * @param {Object} prize 所获奖品
     * @memberof TreasureBox
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

export default TreasureBox;
