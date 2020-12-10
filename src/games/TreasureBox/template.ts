import { html } from 'common-tags';
import { Prize } from '~/types/core';
import s from './index.scss';

export const renderGame = ({ prizes }) => {
    return html`
        <div class="${s.root}">
            <div class="${prizes.length > 4 ? s.prizebox : s.fixprizebox}">
                <div class="${prizes.length > 4 ? 'swiper-wrapper' : s.prizes}">
                    ${prizes.map(
                        (item: Prize) =>
                            html`<div class="${prizes.length > 4 ? 'swiper-slide' : ''} ${s.item}">
                                <div class="${s.imgwrap}">
                                    <img src="${item.gameImg}" />
                                </div>
                                <p style="width:${7.5}em">${item.prizeAlias}</p>
                            </div>`
                    )}
                </div>
            </div>
            <div class="${s.btnwrap}"><div class="${s.startbtn}"></div></div>
            <div class="${s.box}"></div>
        </div>
    `;
};
