import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../store/test-utils';
import userEvent from '@testing-library/user-event';
import {
	waitFor,
	screen,
	fireEvent,
	act,
	renderHook,
} from '@testing-library/react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../trans/en.json';
import ua from '../../trans/ua.json';
import Profile from './ChangeProfile';
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
const mockedStateUser = {
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

it('should upload file', async () => {
	const avatar = true;
	const usernameEdit = 'name';
	const emailEdit = 'name@gmail.com';
	const file = new File(['hello'], 'hello.png', { type: 'image/png' });
	renderWithProviders(
		<BrowserRouter>
			<Profile
				avatar={avatar}
				usernameEdit={usernameEdit}
				emailEdit={emailEdit}
			/>
		</BrowserRouter>,
		{
			preloadedState: mockedStateUser,
		}
	);
	const btn = screen.getByRole('button', { name: /Upload a photo/i });
	await act(async () => {
		fireEvent.click(btn);
	});
	const input: HTMLInputElement = screen.getByLabelText('Upload a photo', {
		selector: 'input',
	});
	expect(input).toBeInTheDocument();
	await act(async () => {
		userEvent.upload(input, file);
	});
	if (input.files !== null) {
		expect(input.files[0]).toStrictEqual(file);
	}
});

it('should render an error when the user uploads an invalid file type', async () => {
	const avatar = true;
	const usernameEdit = 'name';
	const emailEdit = 'name@gmail.com';
	const file = new File(['hello'], 'hello.pdf', { type: 'pdf' });
	renderWithProviders(
		<BrowserRouter>
			<Profile
				avatar={avatar}
				usernameEdit={usernameEdit}
				emailEdit={emailEdit}
			/>
		</BrowserRouter>,
		{
			preloadedState: mockedStateUser,
		}
	);
	const btn = screen.getByRole('button', { name: /Upload a photo/i });
	await act(async () => {
		fireEvent.click(btn);
	});
	const input = screen.getByLabelText('Upload a photo', { selector: 'input' });
	expect(input).toBeInTheDocument();
	await act(async () => {
		userEvent.upload(input, file);
	});
	expect(screen.getByText(/Invalid file type/i)).toBeInTheDocument();
});

it('should delete the user photo', async () => {
	const avatar = true;
	const usernameEdit = 'name';
	const emailEdit = 'name@gmail.com';
	renderWithProviders(
		<BrowserRouter>
			<Profile
				avatar={avatar}
				usernameEdit={usernameEdit}
				emailEdit={emailEdit}
			/>
		</BrowserRouter>,
		{
			preloadedState: mockedStateUser,
		}
	);
	const btn = screen.getByRole('button', { name: /Upload a photo/i });
	await act(async () => {
		fireEvent.click(btn);
	});
	const deleteElement = screen.getByText(/Delete photo/i);
	expect(deleteElement).toBeInTheDocument();
	await act(async () => {
		fireEvent.click(deleteElement);
	});
});

it('should render an error when username is short', async () => {
	const avatar = true;
	const { result } = renderHook(() =>
		useInput('le', { isEmpty: true, minLength: 3 })
	);
	const fakeEvent = { target: {} };
	const emailEdit = 'helen@gmail.com';
	renderWithProviders(
		<BrowserRouter>
			<Profile
				usernameEdit={result.current}
				avatar={avatar}
				emailEdit={emailEdit}
			/>
		</BrowserRouter>
	);
	const usernameInput: HTMLInputElement = screen.getByLabelText('Username');
	expect(usernameInput).toBeInTheDocument();
	await act(async () => {
		fireEvent.change(usernameInput, {
			target: { value: result.current.value },
		});
		fireEvent.blur(usernameInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.minLengthError).toBe(true);

	waitFor(() => {
		expect(
			screen.getByText('Length must be at least 3 characters')
		).toBeInTheDocument();
		screen.debug();
	});
});

it('should render an error when username field is empty', async () => {
	const avatar = true;
	const { result } = renderHook(() =>
		useInput('', { isEmpty: true, minLength: 3 })
	);
	const fakeEvent = { target: {} };
	const emailEdit = 'helen@gmail.com';
	renderWithProviders(
		<BrowserRouter>
			<Profile
				usernameEdit={result.current}
				avatar={avatar}
				emailEdit={emailEdit}
			/>
		</BrowserRouter>
	);
	const usernameInput: HTMLInputElement = screen.getByLabelText('Username');
	expect(usernameInput).toBeInTheDocument();

	await act(async () => {
		fireEvent.change(usernameInput, {
			target: { value: result.current.value },
		});
		fireEvent.blur(usernameInput);
		result.current.onBlur(fakeEvent);
	});
	expect(result.current.isDirty).toBe(true);
	expect(result.current.isEmpty).toBe(true);
	waitFor(() => {
		expect(screen.getByText('UserName should be required')).toBeInTheDocument();
	});
});

it('should call', async () => {
	const avatar = true;
	const { result } = renderHook(() =>
		useInput('helen1', { isEmpty: true, minLength: 3 })
	);
	const emailEdit = 'helen@gmail.com';
	renderWithProviders(
		<BrowserRouter>
			<Profile
				usernameEdit={result.current}
				avatar={avatar}
				emailEdit={emailEdit}
			/>
		</BrowserRouter>
	);
	const usernameInput: HTMLInputElement = screen.getByLabelText('Username');
	const btn = screen.getByRole('button', { name: /Save/i });
	expect(btn).toBeDisabled();
	act(() => {
		fireEvent.change(usernameInput, {
			target: { value: result.current.value },
		});
	});
	waitFor(() => {
		expect(btn).not.toBeDisabled();
	});
});
