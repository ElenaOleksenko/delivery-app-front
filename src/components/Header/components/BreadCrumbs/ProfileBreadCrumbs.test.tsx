import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../../trans/en.json';
import ua from '../../../../trans/ua.json';
import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../store/test-utils';
import ProfileBreadCrumbs from './ProfileBreadCrumbs';

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

it(`should render the component, show the logout button after the user clicks on the profile`, async () => {
	renderWithProviders(
		<BrowserRouter>
			<ProfileBreadCrumbs />
		</BrowserRouter>,
		{
			preloadedState: {
				user: {
					isAuth: true,
					username: 'name',
					role: 'DRIVER',
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
	const profile = screen.getByTestId('profile');
	await act(async () => {
		fireEvent.click(profile);
	});
	const logout = screen.getByTestId('logout');
	expect(logout).toBeInTheDocument();
	await act(async () => {
		fireEvent.click(logout);
	});
});
