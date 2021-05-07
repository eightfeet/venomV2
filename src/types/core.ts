import { ModalAnimation } from '@eightfeet/modal';
export interface CoreConfigType {
  /**
   * GameId 默认game-target-时间戳+100以内随机数
   */
  targetId: string;
  /**
   * Game挂载Id
   */
  parentId: string;
  /**
   * 成功弹窗动画
   */
  SuccessModalAnimation?: ModalAnimation;
  /**
   * 皮肤配置
   */
  style: {
    /**
     * 游戏皮肤
     */
    GameTheme?: any;
    /**
     * 成功弹窗皮肤
     */
    SuccessModalTheme?: any;
    /**
     * 地址填写弹窗皮肤
     */
    AddressModalTheme?: any;
    /**
     * loading皮肤
     */
    LoadingTheme?: any;
    /**
     * 失败弹窗
     */
    FailedModalTheme?: any;
    /** 
     * 弱提示 
     */
    MessageTheme?: any;
  };
  
  outerFrameId: string;
  /**
   * 启动抽奖方法 必填
   */
  start: () => Promise<any>;
  /**
   * 保存地址
   */
  saveAddress: () => Promise<any>;
  /**
   * 奖品参数
   */
  prizes: Prize[];
  /**
   * 参与人电话
   */
  playerPhone: string;
  /**
   * 默认收货人信息
   */
  receiverInfo: any;
  /**
   * 要求验证身份证
   */
  cardIdRequest: any;
  /**
   * 验证参与人电话
   */
  checkVerificationCode: () => Promise<any>;
  /**
   * 取消时的回调（取消中奖结果或取消填写地址）
   */
  onCancel: () => void;
  /**
   * 确定时的回调（确定或完成填写地址后）
   */
  onEnsure: () => void;
  /**
   * 未中奖弹窗标题
   */
  failedModalTitle: string;
  /**
   * 中奖弹窗文字
   */
  successModalTitle: string;
  /**
   * 中奖按钮文字
   */
  submitSuccessText: string;
  /**
   * 中奖保存地址按钮文字
   */
  submitAddressText: string;
  /**
   * 未中奖按钮文字
   */
  submitFailedText: string;
  /**
   * em基准像素
   */
  emBase: number;
  /**
   * loading 设置
   */
  loading: {
    /**
     * loading 尺寸大小 默认20
     */
    size: number;
    /**
     * 由几个点（vertices）组成默认12个
     */
    length: number;
    /**
     * 旋转一周的周期时间，单位s
     */
    cycle: number;
  };
  /**
   * 抽奖
   */
  lottery: (prize:Prize) => Promise<any>;
}

/**
 * 游戏奖品数据结构
 * @export
 * @interface Prize
 */
export interface Prize {
  /**
   * 奖品id
   * @type {number}
   * @memberof Prize
   */
  prizeId: number;
  /**
   * 奖品类型 0 未中奖, 1 实物, 2 虚拟
   * @type {number}
   * @memberof Prize
   */
  prizeType: PrizeType;
  /**
   * 领取方式 1：默认；2：填写地址；3：链接类；4：虚拟卡
   * @type {ReceiveType}
   * @memberof Prize
   */
  receiveType: ReceiveType;
  /**
   * 奖品别名
   * @type {string}
   * @memberof Prize
   */
  prizeAlias: string;
  /**
   * 奖品名称
   * @type {string}
   * @memberof Prize
   */
  prizeName: string;
  /**
   * 获奖信息
   * @type {string}
   * @memberof Prize
   */
  awardMsg: string;
  /**
   * 游戏图片
   * @type {string}
   * @memberof Prize
   */
  gameImg: string;
  /**
   * 奖品图片
   * @type {string}
   * @memberof Prize
   */
  prizeImg: string;
  /**
   * 奖品备注
   * @type {string}
   * @memberof Prize
   */
  memo?: string
}

/**
 * 奖品类型
 * @export
 * @enum {number}
 */
export enum PrizeType {
  /**
   * 未中奖
   */
  losingLottery = 0,
  /**
   * 实物
   */
  stuff = 1,
  /**
   * 虚拟
   */
  virtual = 2,
}

/**
 * 领取方式
 * @export
 * @enum {number}
 */
export enum ReceiveType {
  /**
   * 默认
   */
  default = 1,
  /**
   * 填写地址
   */
  address = 2,
  /**
   * 链接类
   */
  link = 3,
  /**
   * 虚拟卡
   */
  virtual = 4,
}


export enum cardIdRequest {
  /**
   * 隐藏身份证
   */
  notDisplayed = "1",
  /**
   * 验证身份证
   */
  requireAndValidation = "2",
  /**
   * 身份证为空时不验证有填写时验证
   */
  requireAndValidationWhenInput = "3",
  /**
   * 不验证身份证
   */
  neverValidation = "4",
}
