import en from './trans/en.json';
import ua from './trans/ua.json';

import { initReactI18next } from 'react-i18next';
import i18n from 'i18next';

const resources = {
	en: {
		translation: en,
	},
	ua: {
		translation: ua,
	},
};
let language: any;
localStorage.getItem('language') !== undefined
	? (language = localStorage.getItem('language'))
	: (language = en);
i18n.use(initReactI18next).init({
	resources,
	lng: JSON.parse(language),
	fallbackLng: 'en',
});

export default i18n;
