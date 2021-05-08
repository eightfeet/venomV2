/**
 * dom Hooks 挂载模板到document的指定目标节点，当目标节点不存在时创建一个并设置基准fontSize
 *
 * @export
 * @param {HTMLElement} dom (Required) html模板
 * @param {String} target (Required) element id
 * @param {String} parentId 父级 id
 * @returns
 */
export declare function createDom(dom: string, target: string, parentId: string, emBase: number): Promise<HTMLElement>;
/**
 * 移除指定id的dom及其子节点
 *
 * @export
 * @param {string} target
 */
export declare function removeDom(target: string): Promise<unknown>;
/**
 *
 * html模板编与样式绑定，使用html模板时需要用到
 * @export
 * @param {*} dom
 * @param {*} classes
 * @returns
 */
export declare function combineDomByClass(dom: any, classes: any): Promise<unknown>;
