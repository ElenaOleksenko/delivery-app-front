import { screen } from '@testing-library/react';
import Router from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../../trans/en.json';
import ua from '../../../../trans/ua.json';
import { renderWithProviders } from '../../../../store/test-utils';
import { loads, trucks } from '../../../__mocks__/axios';
import CardInfo from './CardInfo';

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

jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useParams: jest.fn(),
}));

it('should render the component if user role is a shipper', async () => {
	jest.spyOn(Router, 'useParams').mockReturnValue({ id: '09' });
	const mockedState = {
		user: {
			isAuth: true,
			username: 'name',
			role: 'SHIPPER',
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
		},

		truck: {
			trucks: [],
			assignTruck: '',
			isErrorGetTrucks: false,
			isErrorTrucks: false,
			isErrorAssignTruck: false,
			successMessage: '',
			errorMessage: '',
			alertAssignedLoad: '',
			activeLoadDriver: {},
		},
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	let stateFromLocStorage = localStorage.getItem('state');
	let state;
	if (stateFromLocStorage !== null) {
		state = JSON.parse(stateFromLocStorage);
	}
	renderWithProviders(
		<BrowserRouter>
			<CardInfo />
		</BrowserRouter>,
		{
			preloadedState: state,
		}
	);
	expect(screen.getByText('load')).toBeInTheDocument();
});

it('should render the component if user role is a driver', async () => {
	jest.spyOn(Router, 'useParams').mockReturnValue({ id: '01' });
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

		load: {
			loads: [],
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
		},

		truck: {
			trucks: trucks,
			assignTruck: '',
			isErrorGetTrucks: false,
			isErrorTrucks: false,
			isErrorAssignTruck: false,
			successMessage: '',
			errorMessage: '',
			alertAssignedLoad: '',
			activeLoadDriver: {},
		},
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	let stateFromLocStorage = localStorage.getItem('state');
	let state;
	if (stateFromLocStorage !== null) {
		state = JSON.parse(stateFromLocStorage);
	}

	renderWithProviders(
		<BrowserRouter>
			<CardInfo />
		</BrowserRouter>,
		{
			preloadedState: state,
		}
	);
});
