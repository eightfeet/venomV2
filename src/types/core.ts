import { AddressModalThemeType } from '@byhealth/walle/lib/modules/AddressModal/Address';
import { ModalAnimation, ModalStyle } from '@eightfeet/modal';
import { Properties } from 'csstype';

interface StyleItem {
  [keys: string]: Properties
}

export interface Modify {
  modify?: Properties[]
}

export type GameTheme<T> = (StyleItem | Modify) & T;

export interface NoticeModal {
  overlay?: Properties;
  wrap?: Properties;
  close?: Properties;
  content?: Properties;
  contentTop?: Properties;
  contentBottom?: Properties;
  submit?: Properties;
  header?: Properties;
  article?: Properties;
  footer?: Properties;
  contentWrap?: Properties;
}

export interface ResultModalStyle extends NoticeModal {
  prizeAlias?: Properties;
  prizeName?: Properties;
  awardMsg?: Properties;
  prizeImg?: Properties;
  memo?: Properties;
  modalTitle?: Properties;
}

export interface Theme<T> {
  /**
   * 游戏皮肤
   */
  GameTheme?: GameTheme<T>;
  /**
   * 成功弹窗皮肤
   */
  SuccessModalTheme?: ResultModalStyle & Modify;
  /**
   * 地址填写弹窗皮肤
   */
  AddressModalTheme?: AddressModalThemeType;
  /**
   * 信息弹窗
   */
  NoticeModalTheme?: NoticeModal;
  /**
   * loading皮肤
   */
  LoadingTheme?: {
      overlay?: Properties;
      content?: Properties;
      vertices?: {
          elements?: string[];
          size?: string;
      } & Properties;
  };
  /**
   * 失败弹窗
   */
  FailedModalTheme?: ResultModalStyle & Modify;
  /**
   * 弱提示
   */
  MessageTheme?: ModalStyle & Modify;
}
export interface CoreConfigType<T> {
  /**
   * GameId 默认game-target-时间戳+100以内随机数
   */
  targetId?: string;
  /**
   * Game挂载Id
   */
  parentId?: string;
  /**
   * 成功弹窗动画
   */
  SuccessModalAnimation?: ModalAnimation;
  /**
   * 皮肤配置
   */
  style: Theme<T>;
  /**core使用无需定义 */
  outerFrameId?: string;
  /**
   * 启动抽奖方法 必填
   */
  start: () => Promise<any>;
  /**
   * 保存地址
   */
  saveAddress: (address: {
      /** 详细地址 */
      address: string;
      /** 身份证号码 */
      idcode?: string;
      /** 收货人电话号码 */
      phone: string;
      /** 收货人姓名 */
      receiver: string;
      /** 省市区id */
      regions: string;
      /** 省市区名称 */
      regionsName: string;
      /** 验证码 */
      verificationvode?: string | number;
  }) => Promise<any>;
  /**
   * 奖品参数
   */
  prizes?: Prize[];
  /**
   * 参与人电话
   */
  playerPhone?: string;
  /**
   * 默认收货人信息
   */
  receiverInfo?: any;
  /**
   * 要求验证身份证
   */
  cardIdRequest?: any;
  /**
   * 验证参与人电话
   */
  checkVerificationCode?: () => Promise<any>;
  /**
   * 取消时的回调（取消中奖结果或取消填写地址）
   */
  onCancel?: () => void;
  /**
   * 确定时的回调（确定或完成填写地址后）
   */
  onEnsure?: (prize: Prize) => void;
  /**
   * 显示中奖
   */
  onShowSuccess?: () => void;
  /**
   * 显示未中奖
   */
  onShowFailed?: () => void;
  /**
   * 显示地址弹窗
   */
  onShowAddress?: () => void;
  /**
   * 未中奖弹窗标题
   */
  failedModalTitle?: string;
  /**
   * 中奖弹窗文字
   */
  successModalTitle?: string;
  /**
   * 中奖按钮文字
   */
  submitSuccessText?: string;
  /**
   * 中奖保存地址按钮文字
   */
  submitAddressText?: string;
  /**
   * 未中奖按钮文字
   */
  submitFailedText?: string;
  /**
   * em基准像素
   */
  emBase?: number;
  /**
   * loading 设置
   */
  loading?: {
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
   * core抽奖方式,无需定义
   * 抽奖的动画形式
   */
  lottery?: (prize: Prize) => Promise<any>;
}
/**
* 游戏奖品数据结构
* @export
* @interface Prize
*/
export interface Prize {
  /**
   * 奖品id
   * @type {string | number}
   * @memberof Prize
   */
  prizeId: string | number;
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
  prizeAlias?: string;
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
  awardMsg?: string;
  /**
   * 游戏图片
   * @type {string}
   * @memberof Prize
   */
  gameImg?: string;
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
  memo?: string;
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
  LosingLottery = 0,
  /**
   * 实物
   */
  Stuff = 1,
  /**
   * 虚拟
   */
  Virtual = 2
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
  Default = 1,
  /**
   * 填写地址
   */
  Address = 2,
  /**
   * 链接类
   */
  Link = 3,
  /**
   * 虚拟卡
   */
  Virtual = 4
}
export enum cardIdRequest {
  /**
   * 隐藏身份证
   */
  NotDisplayed = "1",
  /**
   * 验证身份证
   */
  RequireAndValidation = "2",
  /**
   * 身份证为空时不验证有填写时验证
   */
  RequireAndValidationWhenInput = "3",
  /**
   * 不验证身份证
   */
  NeverValidation = "4"
}


