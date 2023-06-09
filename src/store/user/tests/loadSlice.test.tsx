import axios, { loads } from '../../../components/__mocks__/axios';
import {
	addNewLoad,
	archiveLoad,
	deleteLoad,
	getActiveLoadShipper,
	getLoads,
	logoutLoadsFromLocStorage,
	searchTruckLoad,
	updateLoad,
} from '../loadSlice';
import loadReducer from '../loadSlice';

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
	},
	truck: {
		trucks: [],
	},
};

it(`should return a successful response when the user uploads his loads`, async () => {
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.get = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { loads: loads },
		})
	);
	const dispatch = jest.fn();
	const thunk = getLoads();
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(loads);
});

it(`should return a negative response when the user uploads his loads`, async () => {
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.get = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			statusText: 'Bad request',
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = getLoads();
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe(
		'There was a problem with your request'
	);
});

it(`should return a successful response when the user uploads his active loads`, async () => {
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.get = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { loadArrivedToDelivery: loads, assignedLoad: [] },
		})
	);
	const dispatch = jest.fn();
	const thunk = getActiveLoadShipper();
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		assignedLoad: [],
		loadArrivedToDelivery: loads,
	});
});

it(`should return a negative response when the user uploads his active loads`, async () => {
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.get = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			statusText: 'Bad request',
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = getActiveLoadShipper();
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe(
		'There was a problem with your request'
	);
});

it(`should return a successful response when the user adds the new load`, async () => {
	const newLoad = {
		_id: '9',
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
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { loadNew: newLoad },
		})
	);
	const dispatch = jest.fn();
	const thunk = addNewLoad(newLoad);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(newLoad);
});

it(`should return a negative response when the user adds the new load`, async () => {
	const newLoad = {
		_id: '9',
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
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			statusText: 'Bad request',
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = addNewLoad(newLoad);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe(
		'There was a problem with your request'
	);
});

it(`should return a successful response when the user deletes the load`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.delete = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { deletedLoad: loads[0] },
		})
	);
	const dispatch = jest.fn();
	const thunk = deleteLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(loads[0]);
});

it(`should return a negative response with status 400 when the user deletes the load`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.delete = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 400,
			data: { message: 'error with status 400' },
		})
	);
	const dispatch = jest.fn();
	const thunk = deleteLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe('error with status 400');
});

it(`should return a negative response with status 500 when the user adds the new load`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.delete = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 500,
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = deleteLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		errorMessage: 'There was a problem with your request',
		errorStatus: 500,
	});
});

it(`should return a successful response when the user updates the load`, async () => {
	const loadUpdate = {
		_id: '9',
		name: 'newLoad',
		payload: 200,
		pickup_address: 'pickup_address_new',
		delivery_address: 'delivery_address_new',
		dimensions: {
			width: 70,
			length: 70,
			height: 70,
		},
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { updateLoad: loads[0] },
		})
	);
	const dispatch = jest.fn();
	const thunk = updateLoad(loadUpdate);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(loads[0]);
});

it(`should return a negative response with status 400 when the user updates the load`, async () => {
	const loadUpdate = {
		_id: '9',
		name: 'newLoad',
		payload: 200,
		pickup_address: 'pickup_address_new',
		delivery_address: 'delivery_address_new',
		dimensions: {
			width: 70,
			length: 70,
			height: 70,
		},
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 400,
			data: { message: 'error with status 400' },
		})
	);
	const dispatch = jest.fn();
	const thunk = updateLoad(loadUpdate);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toBe('error with status 400');
});

it(`should return a negative response with status 500 when the user adds the new load`, async () => {
	const loadUpdate = {
		_id: '9',
		name: 'newLoad',
		payload: 200,
		pickup_address: 'pickup_address_new',
		delivery_address: 'delivery_address_new',
		dimensions: {
			width: 70,
			length: 70,
			height: 70,
		},
	};
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 500,
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = updateLoad(loadUpdate);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		errorMessage: 'There was a problem with your request',
		errorStatus: 500,
	});
});

it(`should return a successful response when the user looks for a truck`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { updateLoad: loads[0] },
		})
	);
	const dispatch = jest.fn();
	const thunk = searchTruckLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(loads[0]);
});

it(`should return a negative response with status 400 when the user looks for a truck`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 400,
			data: { updateLoad: loads[0] },
		})
	);
	const dispatch = jest.fn();
	const thunk = searchTruckLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(loads[0]);
});

it(`should return a negative response with status 500 when the user looks for a truck`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.post = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 500,
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = searchTruckLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		errorMessage: 'There was a problem with your request',
		errorStatus: 500,
	});
});

it(`should return a successful response when the user archives the load`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 200,
			data: { archiveCurrLoad: loads[0], message: 'message' },
		})
	);
	const dispatch = jest.fn();
	const thunk = archiveLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		load: loads[0],
		message: 'message',
	});
});

it(`should return a negative response with status 400 when the user archives the load`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 400,
			data: { message: 'error with status 400' },
		})
	);
	const dispatch = jest.fn();
	const thunk = archiveLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual({
		errorMessage: 'error with status 400',
		errorStatus: 400,
	});
});

it(`should return a negative response with status 500 when the user archives the load`, async () => {
	const id = '9';
	localStorage.setItem('state', JSON.stringify(mockedState));
	axios.put = jest.fn().mockImplementationOnce(() =>
		Promise.resolve({
			status: 500,
			data: { message: 'There was a problem with your request' },
		})
	);
	const dispatch = jest.fn();
	const thunk = archiveLoad(id);
	await thunk(dispatch, () => {}, undefined);
	expect(dispatch.mock.calls[1][0].payload).toEqual(
		'There was a problem with your request'
	);
});

it(`should logout state loads from local storage`, () => {
	const initialState = {
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
		isLoadArchive: false,
	};
	const action = {
		type: logoutLoadsFromLocStorage,
		payload: initialState,
	};
	const result = loadReducer(initialState, action);
	expect(result).toEqual(initialState);
});
