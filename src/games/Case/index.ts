if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Game, { GameConfigType, GameThemeType, PrizeType, ThemeType } from './Case';
import {
	Loading,
	AddressModal,
	NoticeModal,
	validate,
	Message,
	Modal,
	htmlFactory
} from '@byhealth/walle';
const { inlineStyle } = htmlFactory;

export {
	ThemeType,
	GameThemeType,
	GameConfigType,
	PrizeType
};

export {
	Game,
	NoticeModal,
	Loading,
	validate,
	Message,
	Modal,
	AddressModal,
	inlineStyle
};
