import axios, { trucks } from '../../../components/__mocks__/axios';
import {
	addNewTruck,
	assignTruck,
	changeLoadState,
	deleteTruck,
	logoutTrucksFromLocStorage,
	updateTruck,
} from '../truckSlice';
import truckReducer from '../truckSlice';

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
	},
	truck: {
		trucks: trucks,
	},
};

it(`should return a successful response when the user adds the new truck`, async () => {
	const newTruck = {
		_id: '33333',
		created_by: '33333333',
		assigned_to: '33333333',
		type: 'sprinter',
		status: 'IS',
		createdDate: '22.01.2023',
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { truck: newTruck },
		})
	);
	const dispatch = jest.fn();
	const thunk = addNewTruck(newTruck);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(newTruck);
});

it(`should return a negative response when the user adds the new truck`, async () => {
	const newTruck = {
		_id: '33333',
		created_by: '33333333',
		assigned_to: '33333333',
		type: 'sprinter',
		status: 'IS',
		createdDate: '22.01.2023',
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
		load: {
			loads: [],
		},
		truck: {
			trucks: trucks,
		},
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			statusText: 'Bad request',
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = addNewTruck(newTruck);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe(
		'There was a problem with your request'
	);
});

it(`should return a successful response when the user updates the truck`, async () => {
	const newTruck = {
		_id: '33333',
		created_by: '33333333',
		assigned_to: '33333333',
		type: 'sprinter',
		status: 'IS',
		createdDate: '22.01.2023',
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { updateTruck: newTruck },
		})
	);
	const dispatch = jest.fn();
	const thunk = updateTruck(newTruck);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(newTruck);
});

it(`should return a negative response when the user updates the truck`, async () => {
	const newTruck = {
		_id: '33333',
		created_by: '33333333',
		assigned_to: '33333333',
		type: 'sprinter',
		status: 'IS',
		createdDate: '22.01.2023',
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			statusText: 'Bad request',
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = updateTruck(newTruck);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe(
		'There was a problem with your request'
	);
});

it(`should return a successful response when the user deletes the truck`, async () => {
	const id = '1';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.delete = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { truck: trucks[0] },
		})
	);
	const dispatch = jest.fn();
	const thunk = deleteTruck(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(trucks[0]);
});

it(`should return a negative response with status 400 when the user deletes the truck`, async () => {
	const id = '1';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.delete = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 400,
			data: { message: 'errorMessage status 400' },
		})
	);
	const dispatch = jest.fn();
	const thunk = deleteTruck(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe('errorMessage status 400');
});

it(`should return a negative response with status 500 when the user deletes the truck`, async () => {
	const id = '1';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.delete = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 500,
			data: { message: 'errorMessage status 500' },
		})
	);
	const dispatch = jest.fn();
	const thunk = deleteTruck(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		errorMessage: 'errorMessage status 500',
		errorStatus: 500,
	});
});

it(`should return a successful response when the user assignes the truck`, async () => {
	const id = '1';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { truck: trucks[0], message: 'message' },
		})
	);
	const dispatch = jest.fn();
	const thunk = assignTruck(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		currTruck: trucks[0],
		message: 'message',
	});
});

it(`should return a negative response with status 400 when the user assignes the truck`, async () => {
	const id = '1';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 400,
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = assignTruck(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		errorMessage: 'There was a problem with your request',
		errorStatus: 400,
	});
});

it(`should return a negative response with status 500 when the user assignes the truck`, async () => {
	const id = '1';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 500,
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = assignTruck(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe(
		'There was a problem with your request'
	);
});

it(`should return a successful response when the user changes the load state`, async () => {
	const load = {
		id: '9',
		created_by: '999',
		assigned_to: '3333',
		status: 'ASSIGNED',
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
		logs: [
			{
				message: 'message',
				time: '04.01.2023',
			},
		],
		createdDate: '04.01.2023',
		readByDriver: false,
		readByShipper: false,
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.patch = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { activeLoadNew: load, message: 'message' },
		})
	);
	const dispatch = jest.fn();
	const thunk = changeLoadState();
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		changeStateLoad: load,
		message: 'message',
	});
});

it(`should logout state trucks from local storage`, () => {
	const initialState = {
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
	};
	const action = {
		type: logoutTrucksFromLocStorage,
		payload: initialState,
	};
	const result = truckReducer(initialState, action);
	expect(result).toEqual(initialState);
});
