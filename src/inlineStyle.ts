import { prefix } from 'inline-style-prefixer';
import { cssifyObject } from 'css-in-js-utils';
import * as CSS from 'csstype';

/**
 * StyleObject样式转换行内样式
 * @param {CSS.Properties} style
 * @return {*}  {(string | null)}
 */
const createInlineStyles = (style: CSS.Properties): string | null => {
    const css = cssifyObject(prefix(style));
    return (css ? `${css};` : null);
};

export { createInlineStyles };
