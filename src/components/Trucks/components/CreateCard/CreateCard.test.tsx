import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../store/test-utils';
import { CreateCard } from './CreateCard';
import i18n from 'i18next';
import en from '../../../../trans/en.json';
import ua from '../../../../trans/ua.json';
import { initReactI18next } from 'react-i18next';
import { screen, fireEvent, act, renderHook } from '@testing-library/react';
import { useInput } from '../../../../hooks/use-hooks';

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

const mocedStateUserDriver = {
	user: {
		isAuth: true,
		username: 'name',
		role: 'DRIVER',
		email: 'name@gmail.com',
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

const mocedStateUserShipper = {
	user: {
		isAuth: true,
		username: 'name',
		role: 'SHIPPER',
		email: 'name@gmail.com',
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

it('should render the component when the user is a driver', async () => {
	const onClose = jest.fn();
	const id = '1111';
	const type = 'sprinter';
	const name = 'name';
	const payload = 1111;
	const pickup_address = 'pickup_address';
	const delivery_address = 'delivery_address';
	const width = 20;
	const length = 20;
	const height = 20;
	renderWithProviders(
		<BrowserRouter>
			<CreateCard
				onClose={onClose}
				id={id}
				type={type}
				name={name}
				payload={payload}
				pickup_address={pickup_address}
				delivery_address={delivery_address}
				width={width}
				length={length}
				height={height}
			/>
		</BrowserRouter>,
		{
			preloadedState: mocedStateUserDriver,
		}
	);
});

it(`should render the component when the user is a shipper and id isn't empty`, async () => {
	const onClose = jest.fn();
	const id = '1111';
	const type = 'sprinter';
	const name = 'name';
	const payload = 1111;
	const pickup_address = 'pickup_address';
	const delivery_address = 'delivery_address';
	const width = 20;
	const length = 20;
	const height = 20;
	renderWithProviders(
		<BrowserRouter>
			<CreateCard
				onClose={onClose}
				id={id}
				type={type}
				name={name}
				payload={payload}
				pickup_address={pickup_address}
				delivery_address={delivery_address}
				width={width}
				length={length}
				height={height}
			/>
		</BrowserRouter>,
		{
			preloadedState: mocedStateUserShipper,
		}
	);
});

it(`should render the component when the user is a shipper and id is empty`, async () => {
	const onClose = jest.fn();
	const id = undefined;
	const type = 'sprinter';
	const name = 'name';
	const payload = 1111;
	const pickup_address = 'pickup_address';
	const delivery_address = 'delivery_address';
	const width = 20;
	const length = 20;
	const height = 20;
	renderWithProviders(
		<BrowserRouter>
			<CreateCard
				onClose={onClose}
				id={id}
				type={type}
				name={name}
				payload={payload}
				pickup_address={pickup_address}
				delivery_address={delivery_address}
				width={width}
				length={length}
				height={height}
			/>
		</BrowserRouter>,
		{
			preloadedState: mocedStateUserShipper,
		}
	);
});

it(`should render the component when the user is a shipper and id isn't empty`, async () => {
	const onClose = jest.fn();
	const id = '1111';
	const type = 'sprinter';
	const name = 'name';
	const payload = 1111;
	const pickup_address = 'pickup_address';
	const delivery_address = 'delivery_address';
	const width = 20;
	const length = 20;
	const height = 20;

	const { result } = renderHook(() =>
		useInput(id, { isEmpty: true, typeTruck: true })
	);
	const fakeEvent = { target: {} };

	renderWithProviders(
		<BrowserRouter>
			<CreateCard
				onClose={onClose}
				id={id}
				type={type}
				name={name}
				payload={payload}
				pickup_address={pickup_address}
				delivery_address={delivery_address}
				width={width}
				length={length}
				height={height}
			/>
		</BrowserRouter>,
		{
			preloadedState: mocedStateUserDriver,
		}
	);
	const inputType = screen.getByPlaceholderText('Enter type...');
	await act(async () => {
		fireEvent.change(inputType, { target: { value: 'small stright' } });
		fireEvent.blur(inputType);
		result.current.onBlur(fakeEvent);
	});
});
