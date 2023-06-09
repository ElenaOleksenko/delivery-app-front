import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../store/test-utils';
import Login from './Login';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../trans/en.json';
import ua from '../../trans/ua.json';
import {
	deleteStatusRegistration,
	deleteStatusReset,
} from '../../store/user/userSlice';
import {
	screen,
	fireEvent,
	renderHook,
	act,
	waitFor,
} from '@testing-library/react';

import { deleteErrorGetTrucks } from '../../store/user/truckSlice';
import { deleteErrorGetLoads } from '../../store/user/loadSlice';
import { useInput } from '../../hooks/use-hooks';

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
			<Login />
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
	dispatch(deleteStatusReset(0));
	expect(screen.getByText(/Logistics made easy/i)).toBeInTheDocument();
});

it('should delete the status registration when the user goes to the login page', async () => {
	const dispatch = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<Login />
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
					statusRegistration: 200,
					statusDeleteProfile: false,
				},
			},
		}
	);
	dispatch(deleteStatusRegistration(0));
	expect(screen.getByText(/Logistics made easy/i)).toBeInTheDocument();
});

it('should delete the status registration when the user goes to the login page', async () => {
	const dispatch = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<Login />
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
					statusRegistration: 200,
					statusDeleteProfile: false,
				},
			},
		}
	);
	dispatch(deleteStatusRegistration(0));
	expect(screen.getByText(/Logistics made easy/i)).toBeInTheDocument();
});

it('should navigate to the forgot password page', async () => {
	renderWithProviders(
		<BrowserRouter>
			<Login />
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
	const btn = screen.getByRole('button', { name: 'Forgot Password?' });
	await act(async () => {
		fireEvent.click(btn);
	});
	expect(mockedUsedNavigate).toHaveBeenCalledWith('/forgot-password');
});

it('should delete the status "isErrorGetTrucks" when the user goes to the login page', async () => {
	const dispatch = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>,
		{
			preloadedState: {
				truck: {
					trucks: [],
					assignTruck: '',
					isErrorGetTrucks: true,
					isErrorTrucks: false,
					isErrorActiveLoad: false,
					isErrorAssignTruck: false,
					successMessage: '',
					errorMessage: '',
					alertAssignedLoad: '',
					activeLoadDriver: {},
				},
			},
		}
	);
	dispatch(deleteErrorGetTrucks());
	expect(screen.getByText(/Logistics made easy/i)).toBeInTheDocument();
});

it('should delete the status "isErrorGetLoads" when the user goes to the login page', async () => {
	const dispatch = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>,
		{
			preloadedState: {
				load: {
					loads: [],
					archiveLoads: [],
					activeLoadShipper: { assignedLoad: [], loadArrivedToDelivery: [] },
					successMessage: '',
					isErrorGetLoads: true,
					loadTruckWasFound: {},
					driverFound: false,
					responseDriverFound: false,
					readByShipper: false,
					alertAssignedLoadForShipper: 0,
					isErrorLoads: false,
					errorMessage: '',
					isLoadArchive: false,
				},
			},
		}
	);
	dispatch(deleteErrorGetLoads());
	expect(screen.getByText(/Logistics made easy/i)).toBeInTheDocument();
});

it('should render the username value of the input and the error when this value is short', async () => {
	const { result } = renderHook(() =>
		useInput('us', { isEmpty: true, minLength: 3 })
	);
	const fakeEvent = { target: {} };

	const { getByPlaceholderText } = renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
	const usernameInput = getByPlaceholderText(/Name/i);
	expect(usernameInput).toBeInTheDocument();
	expect(result.current.isDirty).toBe(false);
	await act(async () => {
		fireEvent.change(usernameInput, { target: { value: 'us' } });
		fireEvent.blur(usernameInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.minLengthError).toBe(true);
	await waitFor(() =>
		expect(
			screen.getByText('Length must be at least 3 characters')
		).toBeInTheDocument()
	);
});

it('should render the empty username value of the input and the error because the this value should be required', async () => {
	const { result } = renderHook(() =>
		useInput('', { isEmpty: true, minLength: 3 })
	);
	const fakeEvent = { target: {} };

	const { getByPlaceholderText } = renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
	const usernameInput = getByPlaceholderText(/Name/i);
	expect(usernameInput).toBeInTheDocument();
	expect(result.current.isDirty).toBe(false);
	await act(async () => {
		fireEvent.change(usernameInput, { target: { value: '' } });
		fireEvent.blur(usernameInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.isEmpty).toBe(true);
	await waitFor(() =>
		expect(screen.getByText('UserName should be required')).toBeInTheDocument()
	);
});

it('should render the email value of the input and the error when this value is invalid', async () => {
	const { result } = renderHook(() =>
		useInput('email', {
			isEmpty: true,
			isEmail: true,
		})
	);
	const fakeEvent = { target: {} };

	const { getByPlaceholderText } = renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
	const emailInput = getByPlaceholderText(/Email/i);
	expect(emailInput).toBeInTheDocument();
	expect(result.current.isDirty).toBe(false);
	await act(async () => {
		fireEvent.change(emailInput, { target: { value: 'email' } });
		fireEvent.blur(emailInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.emailError).toBe(true);
	await waitFor(() =>
		expect(screen.getByText('Invalid email')).toBeInTheDocument()
	);
});

it('should render the empty email value of the input and the error because the this value should be required', async () => {
	const { result } = renderHook(() =>
		useInput('', {
			isEmpty: true,
			isEmail: true,
		})
	);
	const fakeEvent = { target: {} };
	const { getByPlaceholderText } = renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
	const emailInput = getByPlaceholderText(/Email/i);
	expect(emailInput).toBeInTheDocument();
	expect(result.current.isDirty).toBe(false);
	await act(async () => {
		fireEvent.change(emailInput, { target: { value: '' } });
		fireEvent.blur(emailInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.isEmpty).toBe(true);
	await waitFor(() =>
		expect(screen.getByText('Email should be required')).toBeInTheDocument()
	);
});

it('should render the password value of the input and the error when this value is short', async () => {
	const { result } = renderHook(() =>
		useInput('1234', { isEmpty: true, minLength: 6 })
	);
	const fakeEvent = { target: {} };

	const { getByPlaceholderText } = renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
	const passwordInput = getByPlaceholderText(/Password/i);
	expect(passwordInput).toBeInTheDocument();
	expect(result.current.isDirty).toBe(false);
	await act(async () => {
		fireEvent.change(passwordInput, { target: { value: '1234' } });
		fireEvent.blur(passwordInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.minLengthError).toBe(true);
	await waitFor(() =>
		expect(
			screen.getByText('Length must be at least 6 characters')
		).toBeInTheDocument()
	);
});

it('should render the empty password value of the input and the error because the this value should be required', async () => {
	const { result } = renderHook(() =>
		useInput('', { isEmpty: true, minLength: 6 })
	);
	const fakeEvent = { target: {} };

	const { getByPlaceholderText } = renderWithProviders(
		<BrowserRouter>
			<Login />
		</BrowserRouter>
	);
	const passwordInput = getByPlaceholderText(/Password/i);
	expect(passwordInput).toBeInTheDocument();
	expect(result.current.isDirty).toBe(false);
	await act(async () => {
		fireEvent.change(passwordInput, { target: { value: '' } });
		fireEvent.blur(passwordInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.isEmpty).toBe(true);
	await waitFor(() =>
		expect(screen.getByText('Password should be required')).toBeInTheDocument()
	);
});
