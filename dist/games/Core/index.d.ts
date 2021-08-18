import { ResultModal, AddressModal, Loading } from '@byhealth/walle';
import { CoreConfigType, Prize } from '~/types/core';
/**
 * 游戏核心流程
 * @class Core
 */
declare class Core {
    targetId: string;
    parentId: any;
    prizes: Prize[];
    lotteryDrawing: boolean;
    emBase: any;
    loadingSet: any;
    SuccessModal: ResultModal;
    FailedModal: ResultModal;
    AddressModal: AddressModal;
    Loading: Loading;
    start: any;
    saveAddress: any;
    lotteryAction: any;
    onShowSuccess: (prize: Prize) => void;
    onShowFailed: (prize: Prize) => void;
    onShowAddress: () => void;
    constructor(config: CoreConfigType<{}>);
    /**
     * 放弃中奖结果时重置游戏
     * @param { Function } cancel 承接放弃中奖结果方法
     * @memberof Core
     */
    onCancel: (cancel: () => void) => () => void;
    /**
     * 中奖承接
     * @param {(prize: Prize) => void} ensure
     * @memberof Core
     */
    onEnsure: (ensure: (prize: Prize) => void) => (prize: Prize) => void;
    /**
     * 修改和保存地址
     * @param {Function} callback 保存地址回调
     * @param {Function} didSaveCallback 完成保存地址后的回调
     * @memberof Core
     */
    handleSaveAddress: (onEnsure: any, onCancel: any) => void;
    /**
     * 销毁Game
     * @memberof Core
     */
    destroy: () => void;
    /**
     * 抽奖
     * @returns
     * @memberof Core
     */
    lottery: () => Promise<never>;
    /**
     * 开始抽奖
     * @param {Object} prize 所获奖品
     * @returns
     * @memberof Core
     */
    startLottery: (prize: Prize) => any;
    /**
     * 显示中奖信息
     * 实物奖品时填写收货地址
     * @param {Object} prize
     * @returns
     * @memberof Core
     */
    showSuccessModal: (prize: Prize) => Promise<void>;
    /**
     * 显示失败提示
     * @param {Object} prize
     * @returns
     * @memberof Core
     */
    showFailedModal: (prize: Prize) => Promise<void>;
    /**
    * 显示填写地址
    * @returns
    * @memberof Core
    */
    showAddressModal: () => Promise<void>;
}
export default Core;
