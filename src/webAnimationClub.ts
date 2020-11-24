/**
 * 监听动画结束事件
 * 
 * @export
 * @param {HTMLElement} element
 * @param {string} type
 * @return {*} 
 */
export function setCssEndEvent(element: HTMLElement, type: string) {
    return new Promise((resolve) => {
        if (!element) {
            resolve(false);
            return;
        }
        let eventName = null;
        const capitalized = type.charAt(0).toUpperCase() + type.slice(1);
        function end(event) {
            const target = event.srcElement || event.target;
            if (target === element) {
                element.removeEventListener(eventName, end);
                resolve(event);
            }
        }
        if (element.style[`Webkit${capitalized}`] !== undefined) {
            eventName = `webkit${capitalized}End`;
        }
        if ((element.style as any).OTransition !== undefined) {
            eventName = `o${type}End`;
        }
        if (element.style[type] !== undefined) {
            eventName = `${type}end`;
        }
        element.addEventListener(eventName, end);
    });
}

/**
 *
 * 元素动画结束时
 * @export
 * @param {HTMLElement} element
 * @return {*} 
 */
export function onceTransitionEnd(element: HTMLElement): any {
    return new Promise((resolve) => {
        setCssEndEvent(element, 'transition').then(resolve);
    });
}
