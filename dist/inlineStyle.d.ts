import * as CSS from 'csstype';
/**
 * StyleObject样式转换行内样式
 * @param {CSS.Properties} style
 * @return {*}  {(string | null)}
 */
declare const createInlineStyles: (style: CSS.Properties) => string | null;
export { createInlineStyles };
