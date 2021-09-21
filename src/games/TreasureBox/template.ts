import { html } from 'common-tags';
import { Prize, PrizeType } from '~/types/core';
import { htmlFactory } from '@byhealth/walle';
import s from './index.scss';
import { Properties } from 'csstype';
const { inlineStyle } = htmlFactory;

export const renderGame = ({ prizes, theme }:{ prizes: any[], theme: any}, id: string ) => {
	const { wrap, prizeImage, prizeTitle, modify } = theme;
	const wrapStyle = inlineStyle(wrap) || '';
	const prizeImageStyle = inlineStyle(prizeImage) || '';
	const prizeTitleStyle = inlineStyle(prizeTitle) || '';

	const prizesFliter = prizes.filter((item:Prize) => item.prizeType !== PrizeType.LosingLottery);

	return html`
        <div class="${s.root} ${id}_wrap" style="${wrapStyle}">
            <div class="${prizesFliter.length > 4 ? s.prizebox : s.fixprizebox} ${id}_prizebox">
                <div class="${prizesFliter.length > 4 ? 'swiper-wrapper' : s.prizes}">
                    ${prizesFliter.map(
		(item: Prize, index: number) =>
			html`<div
                                class="${prizesFliter.length > 4
		? 'swiper-slide'
		: ''} ${s.item}"
                            >
                                <div class="${s.imgwrap} ${index === 0 ? s.firstimgwrap : ''} ${id}_imgwrap">
                                    <img
                                        style="${prizeImageStyle}"
                                        class="${id}_gameImg"
                                        src="${item.gameImg}"
                                    />
                                </div>
                                <p style="${prizeTitleStyle} width:${7.5}em" class="${id}_prizeAlias">
                                    ${item.prizeAlias}
                                </p>
                            </div>`
	)}
                </div>
            </div>
            <div class="${s.btnwrap}"><div class="${s.startbtn} ${id}_startbtn"></div></div>
            <div class="${s.box} ${id}_box"></div>
            ${renderModify(modify)}
        </div>
    `;
};

export const renderModify = (modify: Properties[]) => {
	if (!modify || !Array.isArray(modify)) return '';
	return html`
        ${modify.map(
		(item) =>{
			if (item.animation) {
				item.transform = `scale(${window.innerWidth/750})`,
				item.transformOrigin = 'top left';
			}
                
			return `<div class="${s.modify}" style="${inlineStyle(
				item
			)}">&nbsp;</div>`;
		}
	)}
    `;
};
