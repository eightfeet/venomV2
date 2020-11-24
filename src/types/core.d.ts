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
   * 皮肤配置
   */
  style: {
    /**
     * 游戏皮肤
     */
    GameTheme: any;
    /**
     * 成功弹窗皮肤
     */
    SuccessModalTheme: any;
    /**
     * 地址填写弹窗皮肤
     */
    AddressModalTheme: any;
    /**
     * loading皮肤
     */
    LoadingTheme: any;
  };
  outerFrameId;
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
  prizes: Prizes;
  /**
   * 参与人电话
   */
  playerPhone: string;
  /**
   * 默认收货人信息
   */
  receiverInfo: string;
  /**
   * 要求验证身份证
   */
  cardIdRequest: cardIdRequest;
  /**
   * 验证参与人电话
   */
  checkVerificationCode: string;
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
  lottery: () => Promise<any>;
}

export interface Prizes {}

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
