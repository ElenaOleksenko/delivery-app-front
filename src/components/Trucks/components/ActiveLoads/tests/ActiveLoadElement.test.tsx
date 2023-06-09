import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../../store/test-utils';
import ActiveLoadElement from '../activeLoadElement/ActiveLoadElement';
import { loads } from '../../../../__mocks__/axios';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../../../trans/en.json';
import ua from '../../../../../trans/ua.json';

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
	const item = loads[0];
	renderWithProviders(
		<BrowserRouter>
			<ActiveLoadElement item={item} />
		</BrowserRouter>,
		{
			preloadedState: {
				user: {
					isAuth: true,
					username: 'name',
					role: 'SHIPPER',
					email: '',
					jwt_token: '',
					userPhoto: {},
					message: '',
					isError: false,
					errorMessage: '',
					statusPasswordRestore: 0,
					statusPasswordReset: 0,
					statusRegistration: 0,
					statusDeleteProfile: false,
				},
			},
		}
	);
});
