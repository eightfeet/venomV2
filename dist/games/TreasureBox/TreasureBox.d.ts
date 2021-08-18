import { Loading } from '@byhealth/walle';
import Core from '../Core';
import { Properties } from 'csstype';
import 'swiper/swiper-bundle.css';
import { CoreConfigType, GameTheme, Prize } from './../../types/core';
export declare type GameThemeType = GameTheme<TreasureBoxThemeType>;
export declare type GameConfigType = CoreConfigType<TreasureBoxThemeType>;
export declare type PrizeType = Prize;
interface TreasureBoxThemeType {
    wrap?: Properties;
    prizeImage?: Properties;
    prizeTitle?: Properties;
}
declare class TreasureBox {
    targetId: string;
    emBase: number;
    prizes: Prize[];
    GameTheme: GameThemeType;
    parentId: string;
    core: Core;
    Loading: Loading;
    target: HTMLElement;
    gamePrizes: Prize[];
    constructor(config: GameConfigType);
    /**
     *
     * 初始化项目模板
     * @memberof TreasureBox
     */
    renderGame: () => Promise<void>;
    /**
     * 销毁
     * @memberof TreasureBox
     */
    destroy: () => void;
    /**
     *
     * 开始抽奖
     * @param {Object} prize 所获奖品
     * @memberof TreasureBox
     */
    lottery: (prize: Prize) => Promise<any>;
}
export default TreasureBox;
