
/**
 *
 * 数值处理工具
 * @export
 * @param {Number} num
 * @returns
 */
export function getFullNum(num) {
	//处理非数字
	if (isNaN(num)) {
		return num;
	}
  
	//处理不需要转换的数字
	let str = num.toString();
  
	if (!/e/i.test(str)) {
		const strArr = str.split(".");
		if (strArr[1]) {
			strArr[1] = strArr[1].slice(0, 3);
		}
		return parseFloat(strArr.join("."));
	}
  
	return num.toFixed(18).replace(/\.?0+$/, "");
}
  
/**
 *
 * 九宫格补全：
 * @export
 * @param {Number} n
 * @returns
 */
export function getGameDataLength(n) {
	if ((n - 4) % 4 === 0 && n !== 4) return n;
	return n + 4 - ((n - 4) % 4);
}
  
/**
 *
 * 补充并重组游戏数据
 * @export
 * @param {Array} data
 * @param {Number} gameDataLength
 * @returns
 */
export function supplementingData(data, gameDataLength) {
	let oprationData = [];
	for (let index = 0; index < 10; index++) {
		if (oprationData.length < gameDataLength) {
			oprationData = oprationData.concat(data);
		}
	}
	oprationData = oprationData.slice(0, gameDataLength);
	return oprationData;
}