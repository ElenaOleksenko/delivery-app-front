import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../store/test-utils';
import Logo from './Logo';
import { act, fireEvent, screen } from '@testing-library/react';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
	...(jest.requireActual('react-router-dom') as any),
	useNavigate: () => mockedUsedNavigate,
}));

const mockesStateUser = {
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
};

it(`should render the component, navigate to the main page when the user clicks on the logo`, async () => {
	renderWithProviders(
		<BrowserRouter>
			<Logo />
		</BrowserRouter>,
		{
			preloadedState: mockesStateUser,
		}
	);
	const logo = screen.getByTestId('logo');
	await act(async () => {
		fireEvent.click(logo);
	});
});

it(`should render the component, navigate to the main page when the user role isn't empty and when the user clicks on the logo`, async () => {
	renderWithProviders(
		<BrowserRouter>
			<Logo />
		</BrowserRouter>,
		{
			preloadedState: mockesStateUser,
		}
	);
	const logo = screen.getByTestId('logo');
	await act(async () => {
		fireEvent.click(logo);
	});
});

it(`should render the component, navigate to the main page when the user role is empty and when the user clicks on the logo`, async () => {
	renderWithProviders(
		<BrowserRouter>
			<Logo />
		</BrowserRouter>,
		{
			preloadedState: mockesStateUser,
		}
	);
	const logo = screen.getByTestId('logo');
	await act(async () => {
		fireEvent.click(logo);
	});
});
