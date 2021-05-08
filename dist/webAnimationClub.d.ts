/**
 * 监听动画结束事件
 *
 * @export
 * @param {HTMLElement} element
 * @param {string} type
 * @return {*}
 */
export declare function setCssEndEvent(element: HTMLElement, type: string): Promise<unknown>;
/**
 *
 * 元素动画结束时
 * @export
 * @param {HTMLElement} element
 * @return {*}
 */
export declare function onceTransitionEnd(element: HTMLElement): any;
