import { act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from '../../../../trans/en.json';
import ua from '../../../../trans/ua.json';
import ArchiveLoads from './ArchiveLoads';
import { getArchiveLoad } from '../../../../store/user/loadSlice';
import { renderWithProviders } from '../../../../store/test-utils';
import axios, { archiveLoads } from '../../../__mocks__/axios';

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
		archiveLoads: archiveLoads,
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

	truck: {
		trucks: [],
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
};

it('The archive loads should be loaded ', async () => {
	await act(async () => {
		localStorage.setItem('state', JSON.stringify(mockedState));
		axios.get.mockImplementationOnce(() =>
			Promise.resolve({
				data: { loads: archiveLoads },
			})
		);
		const dispatch = jest.fn();
		const rejectWithValue = jest.fn();
		const thunk = getArchiveLoad();
		await thunk(dispatch, rejectWithValue, () => ({}));

		renderWithProviders(
			<BrowserRouter>
				<ArchiveLoads />
			</BrowserRouter>,
			{
				preloadedState: mockedState,
			}
		);
		expect(axios.get).toHaveBeenCalledTimes(1);
		expect(dispatch.mock.calls[1][0].payload).toEqual(archiveLoads);
	});
});
