import Core from '../Core';
import { Loading, AddressModal, NoticeModal, validate, Message, Modal } from '@byhealth/walle';
declare const inlineStyle: (style: import("csstype").Properties<0 | (string & {}), string & {}>) => string;
import { CoreConfigType, Prize } from '~/types/core';
declare class Game {
    targetId: any;
    emBase: any;
    prizes: any;
    GameTheme: any;
    parentId: any;
    core: Core;
    Loading: any;
    destroy: any;
    oldDge: number;
    activeElements: any;
    lotteryDrawing: boolean;
    roundTimer: any;
    constructor(config: CoreConfigType);
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
