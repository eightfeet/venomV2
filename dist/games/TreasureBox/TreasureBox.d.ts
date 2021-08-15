import { Loading } from '@byhealth/walle';
import { Prize, CoreConfigType, GameTheme } from '~/types/core';
import Core from '../Core';
import 'swiper/swiper-bundle.css';
interface TreasureBoxConfigType extends CoreConfigType {
}
declare class TreasureBox {
    targetId: string;
    emBase: number;
    prizes: Prize[];
    GameTheme: GameTheme;
    parentId: string;
    core: Core;
    Loading: Loading;
    target: HTMLElement;
    gamePrizes: Prize[];
    constructor(config: TreasureBoxConfigType);
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
