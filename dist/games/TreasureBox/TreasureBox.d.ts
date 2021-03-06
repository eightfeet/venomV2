import { Loading } from '@byhealth/walle';
import { Prize, CoreConfigType } from '~/types/core';
import Core from '../Core';
import 'swiper/swiper-bundle.css';
interface TreasureBoxConfigType extends CoreConfigType {
}
declare class TreasureBox {
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
    constructor(config: TreasureBoxConfigType);
    /**
     *
     * 初始化翻牌模板
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
