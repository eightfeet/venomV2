if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Game, { GameConfigType, GameThemeType, ThemeType } from './TreasureBox';
import {
	Loading,
	AddressModal,
	NoticeModal,
	validate,
	Message,
	Modal,
	htmlFactory
} from '@byhealth/walle';
import { Prize } from '~/types/core';
const { inlineStyle } = htmlFactory;

export {
	ThemeType,
	GameThemeType,
	GameConfigType,
	Prize
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



