#### 红包抽奖可以在不弹窗的情形下展示中奖结果

> 可以通过游戏皮肤theme文件通过样式隐藏弹窗



#### 红包模块个性属性

| 属性         | 类型     | 说明                                                         |
| ------------ | -------- | ------------------------------------------------------------ |
| disableReset | boolean  | 是否禁用reset（默认false,不禁用）                            |
| reset        | function | 重置活动样式，reset方法将在抽奖结果确认后执行，当disableReset属性为true时，reset方法将无效 |
| forceReset   | function | 强制执行reset方法重置活动                                    |

#### game模板功能按钮

1、游戏中加入功能按钮，可以由游戏本身而不是弹窗承接游戏结果用来处理下一步操作

> 按钮文字承接抽奖结果弹窗按钮文字（prize.receiveType === 2 ? ' submitAddressText  || 填写地址'  :  ' submitSuccessText  || 确定'）

2、Html node Id  id="${targetId}-ensure"

