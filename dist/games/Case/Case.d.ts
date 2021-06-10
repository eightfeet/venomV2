import Core from '../Core';
import { Loading } from '@byhealth/walle';
import { Prize, CoreConfigType } from '~/types/core';
interface CaseConfigType extends CoreConfigType {
}
declare class Case {
    targetId: string;
    emBase: number;
    prizes: Prize[];
    GameTheme: {
        [keys: string]: any;
    };
    parentId: string;
    core: Core;
    Loading: Loading;
    target: HTMLElement;
    gamePrizes: Prize[];
    constructor(config: CaseConfigType);
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
