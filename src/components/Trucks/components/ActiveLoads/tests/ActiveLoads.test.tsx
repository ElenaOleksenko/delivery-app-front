import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../../../trans/en.json';
import ua from '../../../../../trans/ua.json';
import { renderWithProviders } from '../../../../../store/test-utils';
import ActiveLoads from '../ActiveLoads';

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

it('should delete the "statusPasswordReset" when the user goes to the login page', async () => {
	renderWithProviders(
		<BrowserRouter>
			<ActiveLoads />
		</BrowserRouter>,
		{
			preloadedState: {
				user: {
					isAuth: true,
					username: 'name',
					role: 'DRIVER',
					email: 'name@gmail.com',
					jwt_token: '1111',
					userPhoto: {},
					message: '',
					isError: false,
					errorMessage: '',
					statusPasswordRestore: 0,
					statusPasswordReset: 200,
					statusRegistration: 0,
					statusDeleteProfile: false,
				},
			},
		}
	);
});
