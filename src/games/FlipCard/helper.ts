/**
 * 坐标数组
 */
export const Arr: {
    [keys: number]: number[][];
} = {
	1: [[1, 2]],
	2: [
		[1, 1],
		[1, 3]
	],
	3: [
		[1, 1],
		[1, 3],
		[2, 2]
	],
	4: [
		[1, 1],
		[1, 3],
		[2, 1],
		[2, 3]
	],
	5: [
		[1, 0],
		[1, 2],
		[1, 4],
		[2, 1],
		[2, 3]
	],
	6: [
		[1, 0],
		[1, 2],
		[1, 4],
		[2, 0],
		[2, 2],
		[2, 4]
	]
};

/**
 *
 * 洗牌工具
 * @param { Array } arr
 * @returns
 */
export function KdShuffle(arr: any[]) {
	let len = arr.length,
		i: number,
		temp: any;
	while (len) {
		i = Math.floor(Math.random() * len--);
		temp = arr[i];
		arr[i] = arr[len];
		arr[len] = temp;
	}
	return arr;
}