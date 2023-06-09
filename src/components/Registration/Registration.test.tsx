import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../trans/en.json';
import ua from '../../trans/ua.json';
import Registration from './Registration';
import { renderWithProviders } from '../../store/test-utils';
import { registration } from '../../store/user/userSlice';
import { screen } from '@testing-library/react';
import axios from '../__mocks__/axios';

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

it('should delete the "statusPasswordReset" when the user goes to the login page', async () => {
	const dispatch = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<Registration />
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
					statusPasswordReset: 200,
					statusRegistration: 0,
					statusDeleteProfile: false,
				},
			},
		}
	);
	const credentials = {
		username: 'username',
		email: 'email@gmail.com',
		password: '123456',
		role: 'DRIVER',
	};
	dispatch(registration(credentials));
});

it('should display error when the user with the same email already exists ', async () => {
	const error = {
		status: 400,
		data: { message: 'The user with the same email already exists' },
	};
	const credentials = {
		username: 'username',
		email: 'username@gmail.com',
		password: '111111',
		role: 'DRIVER',
	};
	axios.post = jest.fn().mockImplementationOnce(() => Promise.resolve(error));
	const dispatch = jest.fn();
	const thunk = registration(credentials);
	await thunk(dispatch, () => {}, undefined);

	renderWithProviders(
		<BrowserRouter>
			<Registration />
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
					isError: true,
					errorMessage: dispatch.mock.calls[1][0].payload,
					statusPasswordRestore: 0,
					statusPasswordReset: 0,
					statusRegistration: 0,
					statusDeleteProfile: false,
				},
			},
		}
	);
	expect(
		screen.getByText('The user with the same email already exists')
	).toBeInTheDocument();
});
