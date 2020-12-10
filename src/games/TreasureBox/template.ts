import { html } from 'common-tags';
import { Prize } from '~/types/core';
import s from './index.scss';

export const renderMax4 = (prizes) => {
    return html`
        <div class="${s.prizes}">
            ${prizes.map(
                (item: Prize) =>
                    html`<div class="${s.item}">
                        <div class="${s.imgwrap}">
                            <img src="${item.gameImg}" />
                        </div>
                        <p style="width:${30 / prizes.length}em">
                            ${item.prizeAlias}
                        </p>
                    </div>`
            )}
        </div>
    `;
};

export const renderMin5 = (prizes) => {
    return html`
        <div class="${s.prizemin5}">
            <div class="${s.prizesliderbox}">
                ${prizes.map(
                    (item: Prize) =>
                        html`<div class="${s.item}">
                            <div class="${s.imgwrap}">
                                <img src="${item.gameImg}" />
                            </div>
                            <p style="width:${7.5}em">
                                ${item.prizeAlias}
                            </p>
                        </div>`
                )}
            </div>
        </div>
    `;
};

export const renderGame = ({ prizes }) => {
    return html`
        <div class="${s.root}">
            <div class="${s.prizebox}">
                ${prizes.length <= 4 ? renderMax4(prizes) : renderMin5(prizes)}
            </div>
            <div class="${s.btnwrap}"><div class="${s.startbtn}"></div></div>
            <div class="${s.box}"></div>
        </div>
    `;
};
