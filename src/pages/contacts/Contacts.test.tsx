import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../trans/en.json';
import ua from '../../trans/ua.json';
import { renderWithProviders } from '../../store/test-utils';
import { BrowserRouter } from 'react-router-dom';
import Contacts from './Contacts';
import { screen } from '@testing-library/react';

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
it('should render the component', async () => {
	renderWithProviders(
		<BrowserRouter>
			<Contacts />
		</BrowserRouter>
	);
	expect(screen.getByText('80931111111')).toBeInTheDocument();
});
