import { act } from '@testing-library/react';
import Main from './Main';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { renderWithProviders } from '../../store/test-utils';
import axios, { loads, trucks } from '../../components/__mocks__/axios';
import { getTrucks } from '../../store/user/truckSlice';
import en from '../../trans/en.json';
import ua from '../../trans/ua.json';
import { getLoads } from '../../store/user/loadSlice';

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

const mockedStateUserShipper = {
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

const mockedStateNotEmptyTRucks = {
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

const mockedStateNotEmptyLoads = {
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

describe('test suite', () => {
	it('should return the trucks from the data base when the trucks from the local storage are empty and the user is "DRIVER"', async () => {
		await act(async () => {
			localStorage.setItem('state', JSON.stringify(mockedState));
			let commonState: any;
			let stateFromLocalStorageMock = localStorage.getItem('state');
			if (stateFromLocalStorageMock !== null) {
				commonState = JSON.parse(stateFromLocalStorageMock);
			}

			axios.get
				.mockImplementationOnce(() =>
					Promise.resolve({
						status: 200,
						data: { trucks: trucks },
					})
				)
				.mockImplementationOnce(() =>
					Promise.resolve({
						status: 200,
						data: { loads: loads },
					})
				);
			const dispatch = jest.fn();
			const rejectWithValue = jest.fn();
			const thunk = getTrucks();
			await thunk(dispatch, rejectWithValue, () => ({}));
			renderWithProviders(
				<BrowserRouter>
					<Main />
				</BrowserRouter>,
				{
					preloadedState: commonState,
				}
			);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(dispatch.mock.calls[1][0].payload).toEqual(trucks);
		});
	});

	it('should return the trucks from the local storage when the user is "DRIVER"', async () => {
		await act(async () => {
			localStorage.setItem('state', JSON.stringify(mockedStateNotEmptyTRucks));
			let commonStateMock: any;
			let stateFromLocalStorageMockNotEmptyTrucks =
				localStorage.getItem('state');
			if (stateFromLocalStorageMockNotEmptyTrucks !== null) {
				commonStateMock = JSON.parse(stateFromLocalStorageMockNotEmptyTrucks);
			}
			renderWithProviders(
				<BrowserRouter>
					<Main />
				</BrowserRouter>,
				{
					preloadedState: commonStateMock,
				}
			);
		});
	});

	it('should return the loads from the data base when the loads from the local storage are empty and the user is "SHIPPER"', async () => {
		await act(async () => {
			localStorage.setItem('state', JSON.stringify(mockedStateUserShipper));
			let commonStateMock: any;
			let stateFromLocalStorageMock = localStorage.getItem('state');
			if (stateFromLocalStorageMock !== null) {
				commonStateMock = JSON.parse(stateFromLocalStorageMock);
			}

			axios.get.mockImplementationOnce(() =>
				Promise.resolve({
					status: 200,
					data: { loads: loads },
				})
			);
			const dispatch = jest.fn();
			const rejectWithValue = jest.fn();
			const thunk = getLoads();
			await thunk(dispatch, rejectWithValue, () => ({}));
			renderWithProviders(
				<BrowserRouter>
					<Main />
				</BrowserRouter>,
				{
					preloadedState: commonStateMock,
				}
			);
			expect(axios.get).toHaveBeenCalledTimes(1);
			expect(dispatch.mock.calls[1][0].payload).toEqual(loads);
		});
	});

	it('should return the loads from the local storage when the user is "SHIPPER"', async () => {
		await act(async () => {
			localStorage.setItem('state', JSON.stringify(mockedStateNotEmptyLoads));
			let commonStateMockNotEmptyLoads: any;
			let stateFromLocalStorageMockNotEmptyLoads =
				localStorage.getItem('state');
			if (stateFromLocalStorageMockNotEmptyLoads !== null) {
				commonStateMockNotEmptyLoads = JSON.parse(
					stateFromLocalStorageMockNotEmptyLoads
				);
			}

			renderWithProviders(
				<BrowserRouter>
					<Main />
				</BrowserRouter>,
				{
					preloadedState: commonStateMockNotEmptyLoads,
				}
			);

			expect(commonStateMockNotEmptyLoads.load.loads).toEqual(loads);
		});
	});
});
