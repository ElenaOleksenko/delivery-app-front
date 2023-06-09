import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from './store/test-utils';

const initialUser = {
	isAuth: false,
	username: '',
	role: '',
	email: '',
	jwt_token: '',
	userPhoto: {},
	message: '',
	isError: true,
	errorMessage: 'errorMessage',
	statusPasswordRestore: 0,
	statusPasswordReset: 0,
	statusRegistration: 0,
	statusDeleteProfile: false,
};

const initialUserLoggedIn = {
	isAuth: true,
	username: 'name',
	role: 'DRIVER',
	email: 'name@gmail.com',
	jwt_token: '1111',
	userPhoto: {},
	message: '',
	isError: true,
	errorMessage: 'errorMessage',
	statusPasswordRestore: 0,
	statusPasswordReset: 0,
	statusRegistration: 0,
	statusDeleteProfile: false,
};
it(`should render the component when the user isn't logged in`, async () => {
	renderWithProviders(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		{
			preloadedState: {
				user: initialUser,
			},
		}
	);
});
it(`should render the component when the user logged in`, async () => {
	renderWithProviders(
		<BrowserRouter>
			<App />
		</BrowserRouter>,
		{
			preloadedState: {
				user: initialUserLoggedIn,
			},
		}
	);
});
