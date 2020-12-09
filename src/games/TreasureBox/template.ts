import { html } from 'common-tags';
import { Prize } from '~/types/core';
import s from './index.scss';

export const renderGame = ({ prizes }) => {
    return html`
        <div class="${s.root}">
            <div class="${s.prizebox}">
                <div class="${s.prizes}">
                    ${prizes.map(
                        (item: Prize) =>
                            `<div class="${s.item}">
                            <img src="${item.gameImg}" />
                            ${item.prizeAlias}
                            </div>`
                    )}
                </div>
            </div>
            <div class="${s.btnwrap}"><div class="${s.startbtn}"></div></div>
            <div class="${s.box}"></div>
        </div>
    `;
};
