import Core from '../Core';
import { Loading } from '@byhealth/walle';
import { CoreConfigType, GameTheme, Prize } from './../../types/core';
export declare type GameThemeType = GameTheme<CaseTheme>;
export declare type GameConfigType = CoreConfigType<CaseTheme>;
export declare type PrizeType = Prize;
interface CaseTheme {
}
declare class Case {
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
     * 初始化翻牌模板
     * @memberof Game
     */
    renderGame: () => Promise<void>;
    destroy: () => void;
    /**
     *
     * 开始抽奖
     * @param {Object} prize 所获奖品
     * @memberof Game
     */
    lottery: (prize: Prize) => Promise<any>;
}
export default Case;
