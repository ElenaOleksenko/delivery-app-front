import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../store/test-utils';
import RestorePassword from './RestorePassword';
import i18n from 'i18next';
import en from '../../trans/en.json';
import ua from '../../trans/ua.json';
import { initReactI18next } from 'react-i18next';
import { act, fireEvent, screen } from '@testing-library/react';

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

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: () => mockedUsedNavigate,
}));

it('should render the component', async () => {
	renderWithProviders(
		<BrowserRouter>
			<RestorePassword />
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

it('should navigate to the login page when the user clicks on the cancel button', async () => {
	renderWithProviders(
		<BrowserRouter>
			<RestorePassword />
		</BrowserRouter>,
		{
			preloadedState: {
				user: {
					isAuth: false,
					username: '',
					role: '',
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
	await act(async () => {
		fireEvent.click(screen.getByText('Cancel'));
	});
	expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
});
