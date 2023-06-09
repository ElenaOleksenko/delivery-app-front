import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../store/test-utils';
import {
	screen,
	fireEvent,
	renderHook,
	act,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import { loads, trucks } from '../../../__mocks__/axios';
import Card from './Card';
import { PropsI } from '../../Model';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../../trans/en.json';
import ua from '../../../../trans/ua.json';
import { useModal } from '../../../../hooks/use-hooks';

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

const list: PropsI = {
	list: {
		_id: '1',
		created_by: '1111',
		assigned_to: '1111',
		type: 'sprinter',
		status: 'IS',
		createdDate: '02.01.2023',
		state: 'Arrived to delivery',
		name: 'load',
		payload: 100,
		pickup_address: 'pickup_address',
		delivery_address: 'delivery_address',
		dimensions: {
			width: 10,
			length: 10,
			height: 10,
		},
		logs: [{ message: 'message', time: '04.01.2023' }],
		readByDriver: false,
		readByShipper: false,
	},
};

const mockedState = {
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
		statusPasswordReset: 0,
		statusRegistration: 0,
		statusDeleteProfile: false,
	},
	truck: {
		trucks: trucks,
		assignTruck: '',
		isErrorGetTrucks: false,
		isErrorTrucks: false,
		isErrorActiveLoad: false,
		isErrorAssignTruck: false,
		successMessage: '',
		errorMessage: '',
		alertAssignedLoad: '',
		activeLoadDriver: {},
	},
	load: {
		loads: loads,
		archiveLoads: [],
		activeLoadShipper: { assignedLoad: [], loadArrivedToDelivery: [] },
		successMessage: '',
		isErrorGetLoads: false,
		loadTruckWasFound: {},
		driverFound: false,
		responseDriverFound: false,
		readByShipper: false,
		alertAssignedLoadForShipper: 0,
		isErrorLoads: false,
		errorMessage: '',
		isLoadArchive: false,
	},
};

it('should render the component if user role is a shipper', async () => {
	renderWithProviders(
		<BrowserRouter>
			<Card list={list.list} />
		</BrowserRouter>,
		{
			preloadedState: mockedState,
		}
	);
	await act(async () => {
		fireEvent.click(screen.getByTestId('eye'));
	});
	expect(mockedUsedNavigate).toHaveBeenCalledWith(`info/:${list.list._id}`);
});

it('should delete the truck', async () => {
	const store = {
		getState: () => mockedState,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
	renderWithProviders(
		<BrowserRouter>
			<Card list={list.list} />
		</BrowserRouter>,
		{ store }
	);
	screen.debug();
	const truck = screen.getByText('sprinter');
	const deleteElement = screen.getByTestId('delete-icon');
	expect(deleteElement).toBeInTheDocument();
	await act(async () => {
		fireEvent.click(deleteElement);
	});
	waitForElementToBeRemoved(truck).then(() =>
		console.log('Element no longer in DOM')
	);
});

it('should open modal', async () => {
	localStorage.setItem('state', JSON.stringify(mockedState));
	let stateFromLocStorage = localStorage.getItem('state');
	let state;
	if (stateFromLocStorage !== null) {
		state = JSON.parse(stateFromLocStorage);
	}
	renderWithProviders(
		<BrowserRouter>
			<Card list={list.list} />
		</BrowserRouter>,
		{
			preloadedState: state,
		}
	);
	const updateElement = screen.getByTestId('update-icon');
	expect(updateElement).toBeInTheDocument();
	const { result } = renderHook(() => useModal());
	await act(async () => {
		fireEvent.click(updateElement);
		result.current.openUpdateModal(list.list);
	});
	expect(result.current.value).toBe(true);
	expect(result.current.type).toBe(list.list.type);
	expect(result.current.idValue).toBe(list.list._id);
});
