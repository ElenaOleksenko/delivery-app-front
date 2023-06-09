import { BrowserRouter } from 'react-router-dom';
import ProfilePage from './ProfilePage';
import i18n from 'i18next';
import en from '../../trans/en.json';
import ua from '../../trans/ua.json';
import { initReactI18next } from 'react-i18next';
import { renderWithProviders } from '../../store/test-utils';
import { act, fireEvent, renderHook, screen } from '@testing-library/react';
import { useOnClickStyle } from '../../hooks/use-hooks';

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

const mockedStateUser = {
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
		statusDeleteProfile: true,
	},
};

it('should render the component', async () => {
	renderWithProviders(
		<BrowserRouter>
			<ProfilePage />
		</BrowserRouter>,
		{
			preloadedState: mockedStateUser,
		}
	);
	expect(screen.getByText('Profile')).toBeInTheDocument();
});

it('should render the component', async () => {
	renderWithProviders(
		<BrowserRouter>
			<ProfilePage />
		</BrowserRouter>,
		{
			preloadedState: mockedStateUser,
		}
	);
	const avatarContainer = screen.getByTestId('container-avatar');
	expect(avatarContainer).toBeInTheDocument();
	const { result } = renderHook(() => useOnClickStyle());
	await act(async () => {
		fireEvent.click(avatarContainer);
		result.current.clickAvatar();
	});
	expect(result.current.avatar).toBe(true);
	expect(result.current.editPass).toBe(false);
	expect(result.current.deleteProfile).toBe(false);
});

it('should render the component', async () => {
	renderWithProviders(
		<BrowserRouter>
			<ProfilePage />
		</BrowserRouter>,
		{
			preloadedState: mockedStateUser,
		}
	);
	const changePasswordContainer = screen.getByTestId(
		'container-change-password'
	);
	expect(changePasswordContainer).toBeInTheDocument();
	const { result } = renderHook(() => useOnClickStyle());
	await act(async () => {
		fireEvent.click(changePasswordContainer);
		result.current.clickEditPass();
	});
	expect(result.current.editPass).toBe(true);
	expect(result.current.avatar).toBe(false);
	expect(result.current.deleteProfile).toBe(false);
});

it('should render the component', async () => {
	renderWithProviders(
		<BrowserRouter>
			<ProfilePage />
		</BrowserRouter>,
		{
			preloadedState: mockedStateUser,
		}
	);
	const deleteProfileContainer = screen.getByTestId('container-delete-profile');
	expect(deleteProfileContainer).toBeInTheDocument();
	const { result } = renderHook(() => useOnClickStyle());
	await act(async () => {
		fireEvent.click(deleteProfileContainer);
		result.current.clickDeleteProfile();
	});
	expect(result.current.deleteProfile).toBe(true);
	expect(result.current.avatar).toBe(false);
	expect(result.current.editPass).toBe(false);
});
