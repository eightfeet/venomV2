import { html } from 'common-tags';
import { Prize } from '~/types/core';
import { htmlFactory } from '@byhealth/walle';
import s from './index.scss';
const { inlineStyle } = htmlFactory;

export const renderGame = ({ prizes, theme }) => {
    const { wrap, prizeImage, prizeTitle, modify } = theme;
    const wrapStyle = inlineStyle(wrap) || '';
    const prizeImageStyle = inlineStyle(prizeImage) || '';
    const prizeTitleStyle = inlineStyle(prizeTitle) || '';

    return html`
        <div class="${s.root}" style="${wrapStyle}">
            <div class="${prizes.length > 4 ? s.prizebox : s.fixprizebox}">
                <div class="${prizes.length > 4 ? 'swiper-wrapper' : s.prizes}">
                    ${prizes.map(
                        (item: Prize) =>
                            html`<div
                                class="${prizes.length > 4
                                    ? 'swiper-slide'
                                    : ''} ${s.item}"
                            >
                                <div class="${s.imgwrap}">
                                    <img
                                        style="${prizeImageStyle}"
                                        src="${item.gameImg}"
                                    />
                                </div>
                                <p style="${prizeTitleStyle} width:${7.5}em">
                                    ${item.prizeAlias}
                                </p>
                            </div>`
                    )}
                </div>
            </div>
            <div class="${s.btnwrap}"><div class="${s.startbtn}"></div></div>
            <div class="${s.box}"></div>
            ${renderModify(modify)}
        </div>
    `;
};

export const renderModify = (modify: any[]) => {
    if (!modify || !Array.isArray(modify)) return '';
    return html`
        ${modify.map(
            (item) =>{
                if (item.animation) {
                    item.transform = `scale(${window.innerWidth/750})`,
                    item.transformOrigin = 'top left'
                }
                
                return `<div class="${s.modify}" style="${inlineStyle(
                    item
                )}">&nbsp;</div>`
            }
        )}
    `;
};
