import axiosMock from '../../../components/__mocks__/axios';
import {
	deleteMessageSuccess,
	deleteProfile,
	deleteStatusDeleteProfile,
	deleteStatusError,
	deleteStatusRegistration,
	deleteStatusReset,
	deleteStatusRestore,
	deleteUserFromLocStorage,
	deleteUserPhoto,
	initialState,
	login,
	logout,
	reducer,
	registration,
	resetPassword,
	restorePassword,
	setUserDelete,
	updateUserCredentials,
	updateUserPassword,
	uploadUserPhoto,
	validateError,
} from '../userSlice';

describe('userSlice', () => {
	beforeEach(() => {
		axiosMock.get.mockClear();
		axiosMock.post.mockClear();
		axiosMock.patch.mockClear();
		axiosMock.put.mockClear();
		axiosMock.delete.mockClear();
		jest.resetAllMocks();
	});
	it('should return default state when passed the empty action', () => {
		const action = { type: '' };
		const result = reducer(undefined, action);
		expect(result).toEqual(initialState);
	});
	it('should return statusPasswordReset with "deleteStatusReset" action', () => {
		const state = {
			email: '',
			errorMessage: '',
			isAuth: false,
			isError: false,
			jwt_token: '',
			message: '',
			role: '',
			statusDeleteProfile: false,
			statusPasswordReset: 400,
			statusPasswordRestore: 0,
			statusRegistration: 0,
			userPhoto: {},
			username: '',
		};
		const action = { type: deleteStatusReset, payload: 400 };
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return statusPasswordRestore with "deleteStatusRestore" action', () => {
		const state = {
			email: '',
			errorMessage: '',
			isAuth: false,
			isError: false,
			jwt_token: '',
			message: '',
			role: '',
			statusDeleteProfile: false,
			statusPasswordReset: 0,
			statusPasswordRestore: 200,
			statusRegistration: 0,
			userPhoto: {},
			username: '',
		};
		const action = { type: deleteStatusRestore, payload: 200 };
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return statusRegistration with "deleteStatusRegistration" action', () => {
		const state = {
			email: '',
			errorMessage: '',
			isAuth: false,
			isError: false,
			jwt_token: '',
			message: '',
			role: '',
			statusDeleteProfile: false,
			statusPasswordReset: 0,
			statusPasswordRestore: 0,
			statusRegistration: 0,
			userPhoto: {},
			username: '',
		};
		const action = { type: deleteStatusRegistration, payload: 0 };
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should delete userState', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = { type: setUserDelete, payload: undefined };
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should delete status Error', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: deleteStatusError,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should delete message succsess', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = { type: deleteMessageSuccess, payload: '' };
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should delete user from localStorage', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = { type: deleteUserFromLocStorage, payload: undefined };
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should delete statys "deleteProfile"', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: 0,
		};
		const action = { type: deleteStatusDeleteProfile, payload: 0 };
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should validate Error', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: validateError,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should register user', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 200,
			statusDeleteProfile: false,
		};
		const action = {
			type: registration.fulfilled,
			payload: 200,
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return an error when the user registers', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: registration.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should login user', () => {
		const state = {
			isAuth: true,
			username: 'name',
			email: 'name@gmail.com',
			jwt_token: '11111',
			role: 'DRIVER',
			userPhoto: undefined,
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: login.fulfilled,
			payload: {
				username: 'name',
				email: 'name@gmail.com',
				jwt_token: '11111',
				role: 'DRIVER',
			},
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return an error when the user logins', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: login.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return status 200 when the user resets the password', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 200,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: resetPassword.fulfilled,
			payload: 200,
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return an error when the user resets the password', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: resetPassword.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return status 200 when the user restores the password', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 200,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: restorePassword.fulfilled,
			payload: 200,
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it('should return an error when the user restores the password', () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: restorePassword.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should return the user photo`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: 'photo.png',
			message: 'message',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: uploadUserPhoto.fulfilled,
			payload: { updateUser: { userPhoto: 'photo.png' }, message: 'message' },
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should return an error when user uploads photo`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: uploadUserPhoto.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should delete user photo`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: deleteUserPhoto.fulfilled,
			payload: {},
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should update user credentials`, () => {
		const state = {
			isAuth: false,
			username: 'newName',
			email: 'newName@gmail.com',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: 'message',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: updateUserCredentials.fulfilled,
			payload: {
				isAuth: true,
				updateUser: { username: 'newName', email: 'newName@gmail.com' },
				message: 'message',
			},
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should return an error when the user updates credentials`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: updateUserCredentials.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should update the user password`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: 'message',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: updateUserPassword.fulfilled,
			payload: 'message',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should return an error when the user updates password`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: updateUserPassword.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should logout user`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: logout.fulfilled,
			payload: state,
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should delete the user profile`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: 'message',
			isError: false,
			errorMessage: '',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: true,
		};
		const action = {
			type: deleteProfile.fulfilled,
			payload: 'message',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});
	it(`should return an error when the user deletes profile`, () => {
		const state = {
			isAuth: false,
			username: '',
			email: '',
			jwt_token: '',
			role: '',
			userPhoto: {},
			message: '',
			isError: true,
			errorMessage: 'errorMessage',
			statusPasswordRestore: 0,
			statusPasswordReset: 0,
			statusRegistration: 0,
			statusDeleteProfile: false,
		};
		const action = {
			type: deleteProfile.rejected,
			payload: 'errorMessage',
		};
		const result = reducer(initialState, action);
		expect(result).toEqual(state);
	});

	it(`should return a successful response when the user registers`, async () => {
		const credentials = {
			username: 'username',
			email: 'username@gmail.com',
			password: '111111',
			role: 'DRIVER',
		};
		axiosMock.post = jest
			.fn()
			.mockImplementationOnce(() => Promise.resolve({ status: 200 }));
		const dispatch = jest.fn();
		const thunk = registration(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe(200);
	});

	it(`should return a negative response with status 400 when the user registers`, async () => {
		const error = {
			status: 400,
			data: { message: 'errorMessage' },
		};

		const credentials = {
			username: 'username',
			email: 'username@gmail.com',
			password: '111111',
			role: 'DRIVER',
		};
		const payloadMock = { errorStatus: 400, errorMessage: 'errorMessage' };
		axiosMock.post = jest
			.fn()
			.mockImplementationOnce(() => Promise.resolve(error));
		const dispatch = jest.fn();
		const thunk = registration(credentials);
		await thunk(dispatch, () => {}, undefined);
		console.log(dispatch.mock.calls[1][0].payload);
		expect(dispatch.mock.calls[1][0].payload).toEqual(payloadMock);
	});

	it(`should return a negative response with status more than 400 when the user registers`, async () => {
		const error = {
			status: 500,
			data: { message: 'errorMessage' },
		};
		const credentials = {
			username: 'username',
			email: 'username@gmail.com',
			password: '111111',
			role: 'DRIVER',
		};
		const payloadMock = 'errorMessage';
		axiosMock.post = jest
			.fn()
			.mockImplementationOnce(() => Promise.resolve(error));
		const dispatch = jest.fn();
		const thunk = registration(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].payload).toEqual(payloadMock);
	});

	it(`should return a successful response when the user log in`, async () => {
		const credentials = {
			username: 'username',
			email: 'username@gmail.com',
			password: '111111',
		};
		const mockUser = {
			username: 'username',
			email: 'username@gmail.com',
			role: 'DRIVER',
			userPhoto: {},
			jwt_token: '11111',
		};
		axiosMock.post = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ status: 200, data: { user: mockUser } })
			);
		const dispatch = jest.fn();
		const thunk = login(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toEqual(mockUser);
	});

	it(`should return a negative response when the user log in`, async () => {
		const credentials = {
			username: 'username',
			email: 'username@gmail.com',
			password: '111111',
		};
		const mockUser = {
			username: 'username',
			email: 'username@gmail.com',
			role: 'DRIVER',
			userPhoto: {},
			jwt_token: '11111',
		};
		const error = 'There was a problem with your request';
		axiosMock.post = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ data: { user: mockUser } })
			);
		const dispatch = jest.fn();
		const thunk = login(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toEqual(error);
	});

	it(`should return a successful response when the user reset password`, async () => {
		const credentials = {
			email: 'username@gmail.com',
		};
		axiosMock.post = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ statusText: 'OK', status: 200 })
			);
		const dispatch = jest.fn();
		const thunk = resetPassword(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe(200);
	});

	it(`should return a negative response when the user resets password`, async () => {
		const credentials = {
			email: 'username@gmail.com',
		};
		axiosMock.post = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ message: 'There was a problem with your request' })
			);
		const dispatch = jest.fn();
		const thunk = resetPassword(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe(
			'There was a problem with your request'
		);
	});

	it(`should return a successful response when the user restores password`, async () => {
		const credentials = {
			password: '11111',
			email: 'username@gmail.com',
			token: '11111',
			id: '222222',
		};
		axiosMock.patch = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ statusText: 'OK', status: 200 })
			);
		const dispatch = jest.fn();
		const thunk = restorePassword(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe(200);
	});

	it(`should return a negative response when the user restores password`, async () => {
		const credentials = {
			password: '11111',
			email: 'username@gmail.com',
			token: '11111',
			id: '222222',
		};
		axiosMock.patch = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ message: 'There was a problem with your request' })
			);
		const dispatch = jest.fn();
		const thunk = restorePassword(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe(
			'There was a problem with your request'
		);
	});

	it(`should return a successful response when the user updates his credentials`, async () => {
		const credentials = {
			username: 'username',
			email: 'username@gmail.com',
			id: '222222',
		};
		const mockUser = {
			updateUser: { username: 'username', email: 'username@gmail.com' },
		};
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.put = jest
			.fn()
			.mockImplementationOnce(() =>
				Promise.resolve({ status: 200, data: mockUser })
			);
		const dispatch = jest.fn();
		const thunk = updateUserCredentials(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toEqual(mockUser);
	});

	it(`should return a negative response when the user updates his credentials`, async () => {
		const credentials = {
			username: 'username',
			email: 'username@gmail.com',
			id: '222222',
		};
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
				trucks: [],
			},
		};
		const error = 'There was a problem with your request';
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.put = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				statusText: 'Bad request',
				message: error,
			})
		);
		const dispatch = jest.fn();
		const thunk = updateUserCredentials(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe(error);
	});

	it(`should return a successful response when the user updates his password`, async () => {
		const credentials = {
			oldPassword: '111oldPassword',
			newPassword: '111newPassword',
			email: 'name@gmail.com',
			id: '222222',
		};
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.patch = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				status: 200,
				data: { message: 'successful response' },
			})
		);
		const dispatch = jest.fn();
		const thunk = updateUserPassword(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe('successful response');
	});

	it(`should return a negative response when the user updates his password`, async () => {
		const credentials = {
			oldPassword: '111oldPassword',
			newPassword: '111newPassword',
			email: 'name@gmail.com',
			id: '222222',
		};
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
				trucks: [],
			},
		};
		const error = 'There was a problem with your request';
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.patch = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				status: 400,
				data: {
					message: error,
				},
			})
		);
		const dispatch = jest.fn();
		const thunk = updateUserPassword(credentials);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(credentials);
		expect(dispatch.mock.calls[1][0].payload).toBe(error);
	});

	it(`should return a successful response when the user deletes his photo`, async () => {
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.delete = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				status: 200,
				data: { updateUser: { userPhoto: 'photo.pdf' } },
			})
		);
		const dispatch = jest.fn();
		const thunk = deleteUserPhoto();
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].payload).toBe('photo.pdf');
	});

	it(`should return a negative response when the user deletes his photo`, async () => {
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.delete = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				statusText: 'Bad request',
				message: 'There was a problem with your request',
			})
		);
		const dispatch = jest.fn();
		const thunk = deleteUserPhoto();
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].payload).toBe(
			'There was a problem with your request'
		);
	});

	it(`should return a successful response when the user logs out`, async () => {
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.delete = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				statusText: 'OK',
				status: 200,
			})
		);
		const dispatch = jest.fn();
		const thunk = logout();
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].payload).toBe(200);
	});

	it(`should return a negative response when the user logs out`, async () => {
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.delete = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				statusText: 'Bad request',
				message: 'There was a problem with your request',
			})
		);
		const dispatch = jest.fn();
		const thunk = logout();
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].payload).toBe(
			'There was a problem with your request'
		);
	});

	it(`should return a successful response when the user deletes his profile`, async () => {
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.delete = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				status: 200,
				data: { message: 'message' },
			})
		);
		const dispatch = jest.fn();
		const thunk = deleteProfile();
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].payload).toBe('message');
	});

	it(`should return a negative response when the user deletes his profile`, async () => {
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
				trucks: [],
			},
		};
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.delete = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				statusText: 'Bad request',
				message: 'There was a problem with your request',
			})
		);
		const dispatch = jest.fn();
		const thunk = deleteProfile();
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].payload).toBe(
			'There was a problem with your request'
		);
	});

	it(`should return a successful response when the user uploads his photo`, async () => {
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
				trucks: [],
			},
		};
		const photo = new File(['hello'], 'hello.pdf', { type: 'pdf' });
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.post = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				status: 200,
				data: { updateUser: photo },
			})
		);
		const dispatch = jest.fn();
		const thunk = uploadUserPhoto(photo);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(photo);
		expect(dispatch.mock.calls[1][0].payload).toEqual({ updateUser: photo });
	});

	it(`should return a negative response when the user uploads his photo`, async () => {
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
				trucks: [],
			},
		};
		const photo = new File(['hello'], 'hello.pdf', { type: 'pdf' });
		localStorage.setItem('state', JSON.stringify(mockedState));
		axiosMock.post = jest.fn().mockImplementationOnce(() =>
			Promise.resolve({
				statusText: 'Bad request',
				message: 'There was a problem with your request',
			})
		);
		const dispatch = jest.fn();
		const thunk = uploadUserPhoto(photo);
		await thunk(dispatch, () => {}, undefined);
		expect(dispatch.mock.calls[1][0].meta.arg).toEqual(photo);
		expect(dispatch.mock.calls[1][0].payload).toBe(
			'There was a problem with your request'
		);
	});
});
