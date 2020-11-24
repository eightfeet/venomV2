import { ResultModal, AddressModal, Loading, tools, htmlFactory } from '@byhealth/walle';
// import s from './template/game.scss';
import { fixIosScroll } from './helper';

const { dormancyFor, isObject } = tools;
const { removeDom } = htmlFactory;

const stamp = (new Date()).getTime();

fixIosScroll();
/**
 *
 * 游戏核心流程
 * @class Core
 */
class Core {
	/**
	 * Creates an instance of Game.
	 * config = {...}
	 *   targetId GameId 默认game-target-时间戳+100以内随机数
	 *   parentId Game挂载Id
	 *   style = { ... }
	 *     GameTheme 游戏皮肤
	 *     SuccessModalTheme 成功弹窗皮肤
	 *	   AddressModalTheme 地址填写皮肤
	 *     LoadingTheme loading皮肤
	 *   start 启动抽奖方法 必填
	 *   saveAddress 保存收货人地址方法 必填
	 *   prizes 奖品参数
	 *   playerPhone 参与人电话
	 *   checkVerificationCode 验证参与人电话
	 *   receiverInfo 默认收货人信息
	 *   cardIdRequest 要求验证身份证  1 隐藏身份证，2 验证身份证，3 身份证为空时不验证有填写时验证，4 不验证身份证
	 *   onCancel 取消时的回调（取消中奖结果或取消填写地址）
	 *   onEnsure 确定时的回调（确定或完成填写地址后）
	 *   failedModalTitle 未中奖弹窗标题
	 *   submitFailedText 未中奖按钮文字
	 *   successModalTitle 中奖弹窗文字
	 *   submitSuccessText 中奖按钮文字
	 *   submitAddressText 中奖保存地址按钮文字
	 * 	 emBase {Number} em基准像素
	 *   loading = { ... } 设置
	 *      size: 20, // 尺寸大小 默认20
     *      length: 5, // 由几个点（vertices）组成默认12个
     *      cycle: 0.5, // 旋转一周的周期时间，单位s
	 */
	/**
	 * 单条游戏奖品数据结构
	 * prize = {
     *   "prizeId": 1, // 奖品id
     *   "prizeType": 1, // 奖品类型 0 未中奖, 1 实物, 2 虚拟
     *   "receiveType": 1, // 领取方式。1：默认；2：填写地址；3：链接类；4：虚拟卡
     *   "prizeAlias": "巴西绿蜂胶", // 奖品别名
     *   "prizeName": "蜂胶软胶囊彩盒装（60粒，巴西绿蜂胶）", // 奖品名称
     *   "awardMsg": null, // 中奖提示信息
     *   "gameImg": "./assets/images/card1.png", // 游戏图片
     *   "prizeImg": "./assets/images/prize1.jpg", // 奖品图片
     *   "memo": "奖品的备注说明！" // 奖品备注
     * }
	 */
	constructor(config){
		const {
			targetId, parentId, style,
			outerFrameId,
			start, saveAddress,
			prizes, playerPhone, receiverInfo,
			cardIdRequest, checkVerificationCode,
			onCancel, onEnsure,
			failedModalTitle, successModalTitle,
			submitSuccessText, submitAddressText, submitFailedText,
			emBase,
			loading,
			lottery
		} = config;
		const { SuccessModalTheme, FailedModalTheme, AddressModalTheme, MessageTheme, LoadingTheme } = style;

		this.targetId         = targetId || `game-target-${stamp}${window.Math.floor(window.Math.random()*100)}`;
		this.parentId         = parentId;
		this.prizes           = prizes;
		this.lotteryDrawing   = false;
		this.emBase           = emBase || null;
		
		this.loadingSet = isObject(loading) ? loading : {};
		
		this.SuccessModal     =
		new ResultModal({
			outerFrameId,
			style:SuccessModalTheme,
			modalTitle:successModalTitle,
			// 重制游戏时嫁接onCancel方法
			onCancel: this.onCancel(onCancel),
			submitText: submitSuccessText,
			onEnsure: this.onEnsure(onEnsure),
			submitAddressText
		});

		this.FailedModal      =
		new ResultModal({
			outerFrameId,
			style:FailedModalTheme,
			onEnsure: this.onEnsure(onEnsure),
			submitText:submitFailedText,
			modalTitle:failedModalTitle,
			// 重制游戏时this.onCancel嫁接onCancel方法
			onCancel: this.onCancel(onCancel)
		});

		this.AddressModal     =
		new AddressModal({
			AddressModalTheme,
			outerFrameId,
			MessageTheme,
			playerPhone,
			receiverInfo,
			cardIdRequest,
			checkVerificationCode
		});
		
		const data = {style:LoadingTheme, parentId:outerFrameId, ...this.loadingSet};
		this.Loading          = new Loading(data);
		this.start            = start || function(){ throw '无抽奖方法';};
		this.start = start || (() => new Promise((resolve, reject) => {
			reject('start方法必须返回一个Promise对象');
		}));

		// 重制游戏时this.onSaveAddress嫁接saveAddress方法
		this.saveAddress      = saveAddress || (() => new Promise((resolve, reject) => {
			reject('需要saveAddress方法用来保存你的地址');
		}));

		this.lotteryAction = lottery || (() => new Promise((resolve, reject) => {
			reject('lottery方法必须返回一个Promise对象');
		}));
	}

	/**
	 * 放弃中奖结果时重置游戏
	 * @param { Function } cancel 承接放弃中奖结果方法
	 * @memberof Core
	 */
	onCancel = (cancel) => () => {
		cancel();
	}

	onEnsure = (ensure) => (prize) => {
		if (typeof ensure === 'function') {ensure(prize);}
	}

	/**
	 * 修改和保存地址
	 * @param {Function} callback 保存地址回调
	 * @param {Function} didSaveCallback 完成保存地址后的回调
	 * @memberof Core
	 */
	handleSaveAddress = (onEnsure, onCancel) => {
		this.AddressModal.showModal(this.saveAddress, onCancel, onEnsure);
	}

	/**
	 *
	 * 销毁Game
	 * @memberof Core
	 */
	distory = () => {
		this.Loading.reset();
		const mobileSelect = document.querySelector('.mobileSelect');
		mobileSelect && mobileSelect.parentNode.removeChild(mobileSelect);
		Promise.all([
			removeDom(this.targetId),
			removeDom(this.Loading.id),
			removeDom(this.SuccessModal.state.id),
			removeDom(this.FailedModal.state.id),
			removeDom(this.AddressModal.state.id)
		])
			.then()
			.catch(err => console.log(err));
	}

	/**
	 *
	 * 抽奖
	 * @returns
	 * @memberof Core
	 */
	lottery = () => {
		if (this.lotteryDrawing) {
			return Promise.reject('The lottery is currently drawing. Just a moment');
		}
		this.lotteryDrawing = true;
		Promise.resolve()
			.then(() => this.start())
			.then(res => {
				return Promise.resolve()
					// 处理抽奖过程
					.then(() => this.startLottery(res))
					// 处理抽奖过程结束
					.then(() => dormancyFor(600).then(() => res));
			})
			.then(res => {
				this.lotteryDrawing = false;
				if (res.prizeType === 0) {
					return this.showFailedModal(res);
				}
				return this.showSuccessModal(res);
			})
			.catch(err => {
				this.lotteryDrawing = false;
				console.error(err);
			});
	}

	/**
	 *
	 * 开始抽奖
	 * @param {Object} prize 所获奖品
	 * @returns
	 * @memberof Core
	 */
	startLottery = (prize) => {
		const { prizeId } = prize || {};

		if (!prizeId) {
			this.lotteryDrawing = false;
			throw (`抽奖失败,没有中奖ID（prizeId）\n 异常中奖信息：${JSON.stringify(prize, null, 2)}`);
		}

		const data = this.prizes.filter(item => item.prizeId === prizeId);
		// 可能存在多个同ID奖品
		if (data && data.length >= 1) {
			return this.lotteryAction(prize).then(() => prize);
		}

		throw (`抽奖异常 \n 异常中奖信息：${JSON.stringify(prize, null, 2)}`);
	}

	/**
	 *
	 * 显示中奖信息
	 * 实物奖品时填写收货地址
	 * @param {Object} prize
	 * @returns
	 * @memberof Core
	 */
	showSuccessModal = (prize) => {
		return this.SuccessModal.showModal(prize)
			.then(prize => {
				// 1：默认；2：填写地址；3：链接类；4：虚拟卡
				if (prize.receiveType === 2) {
					this.AddressModal.showModal(this.saveAddress, () => {
						this.showSuccessModal(prize);
					});
				} else {
					Promise.resolve()
						.then(() => dormancyFor(800));
				}
			});
	}

	/**
	 *
	 * 显示失败提示
	 * @param {Object} prize
	 * @returns
	 * @memberof Core
	 */
	showFailedModal(prize){
		return this.FailedModal.showModal(prize);
	}

}


export default Core;