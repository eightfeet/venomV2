if (window.Promise === undefined) {
	throw new Error('Promise pollyfill not found.');
}

import Game from './Case';
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
	Game,
	NoticeModal,
	Loading,
	validate,
	Message,
	Modal,
	AddressModal,
	inlineStyle
};
