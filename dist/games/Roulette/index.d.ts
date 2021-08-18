import Core from '../Core';
import { Loading, AddressModal, NoticeModal, validate, Message, Modal } from '@byhealth/walle';
import { Properties } from 'csstype';
declare const inlineStyle: (style: Properties<0 | (string & {}), string & {}>) => string;
import { CoreConfigType, GameTheme, Prize } from './../../types/core';
export declare type GameThemeType = GameTheme<RouletteThemeType>;
export declare type GameConfigType = CoreConfigType<RouletteThemeType>;
export declare type PrizeType = Prize;
interface RouletteThemeType {
    wrap?: Properties;
    gameImg?: Properties;
    prizeAlias?: Properties;
    needle?: Properties;
    lotteryButton?: Properties;
    wheel?: Properties;
    divide?: Properties;
}
declare class Game {
    targetId: any;
    emBase: any;
    prizes: any;
    GameTheme: GameThemeType;
    parentId: any;
    core: Core;
    Loading: any;
    destroy: any;
    oldDge: number;
    activeElements: any;
    lotteryDrawing: boolean;
    roundTimer: any;
    constructor(config: GameConfigType);
    /**
     *
     * 初始化转盘模板
     * @memberof Game
     */
    renderGame: () => Promise<void>;
    /**
     *
     * 开始抽奖
     * @param {Object} prize 所获奖品
     * @param {Number} time 旋转时间默认5秒
     * @param {Number} round 旋转圈数默认6圈
     * @returns
     * @memberof Game
     */
    lottery: (prize: Prize, time?: string, round?: number) => Promise<unknown>;
}
export { Game, NoticeModal, Loading, validate, Message, Modal, AddressModal, inlineStyle };
