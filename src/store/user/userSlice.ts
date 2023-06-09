import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { loadFromLocalStorage } from '../../helpers';
import { baseUrl } from '../../constants';

interface UserState {
	isAuth: boolean;
	username: string;
	email: string;
	jwt_token: string;
	role: string;
	userPhoto: object;
	message: string;
	isError: boolean;
	errorMessage: any;
	statusPasswordReset: number;
	statusPasswordRestore: number;
	statusRegistration: number;
	statusDeleteProfile: boolean;
}

export const initialState = {
	isAuth: false,
	username: '',
	email: '',
	jwt_token: '',
	role: '',
	userPhoto: {},
	message: '',
	isError: false,
	errorMessage: '',
	statusPasswordReset: 0,
	statusPasswordRestore: 0,
	statusRegistration: 0,
	statusDeleteProfile: false,
} as UserState;

interface User {
	username: string;
	email: string;
	password: string;
}

interface Data {
	password: string;
	token: string | undefined;
	id: string;
}

interface Credentials {
	username: string;
	email: string;
	password: string;
	role: string;
}

interface PasswordCredentials {
	oldPassword: string;
	newPassword: string;
}

interface UpdateCredentials {
	username: string;
	email: string;
}
export const registration = createAsyncThunk(
	'user/register',
	async (
		credentials: Credentials,
		{ rejectWithValue, fulfillWithValue, dispatch }
	) => {
		try {
			const response = await axios.post(
				`${baseUrl}/api/auth/register`,
				credentials,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			const status = await response.status;
			// return fulfillWithValue(status);//////////////////////////////////////////////////////////
			if (response.status === 200) {
				return fulfillWithValue(status);
			} else if (response.status === 400) {
				const errorStatus = response.status;
				const errorMessage = response.data.message;
				return rejectWithValue({
					errorStatus,
					errorMessage,
				});
			} else if (response.status > 400) {
				return rejectWithValue(response.data.message);
			}
		} catch (error: any) {
			if (error.response.status === 400) {
				const errorStatus = error.response.status;
				const errorMessage = error.response.data.message;
				return rejectWithValue({
					errorStatus,
					errorMessage,
				});
			} else if (error.response.status > 400) {
				return rejectWithValue((error as Error).message);
			}
		}
	}
);

export const login = createAsyncThunk(
	'user/login',
	async (user: User, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.post(`${baseUrl}/api/auth/login`, user, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const data = await response.data.user;
			localStorage.setItem('token', data.jwt_token);
			return data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'user/reset',
	async (email: object, { rejectWithValue, dispatch }) => {
		try {
			const response = await axios.post(
				`${baseUrl}/api/auth/password-reset`,
				email,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const status = await response.status;
			return status;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const restorePassword = createAsyncThunk(
	'user/restore',
	async (data: Data, { rejectWithValue }) => {
		try {
			const response = await axios.patch(
				`${baseUrl}/api/auth/password-change`,
				data,
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const status = await response.status;
			return status;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const uploadUserPhoto = createAsyncThunk(
	'user/upload',
	async (formData: any, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.post(
				`${baseUrl}/api/users/me/profile-picture`,
				formData,
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const photo = await response.data;
			return photo;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateUserCredentials = createAsyncThunk(
	'user/update',
	async (credentials: UpdateCredentials, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.put(
				`${baseUrl}/api/users/me/update-user`,
				credentials,
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			} else {
				const updateUser = await response.data;
				return updateUser;
			}
		} catch (error: any) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateUserPassword = createAsyncThunk(
	'user/updatePass',
	async (
		credentials: PasswordCredentials,
		{ rejectWithValue, fulfillWithValue, dispatch }
	) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.patch(
				`${baseUrl}/api/users/me/password`,
				credentials,
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status === 200) {
				const message = await response.data.message;
				return fulfillWithValue(message);
			} else if (response.status === 400) {
				return rejectWithValue(response.data.message);
			}
		} catch (error: any) {
			if (error.response.status === 400) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue((error as Error).message);
			}
		}
	}
);

export const deleteUserPhoto = createAsyncThunk(
	'user/delete',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.delete(
				`${baseUrl}/api/users/me/delete-photo`,
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const photo = await response.data.updateUser.userPhoto;
			return photo;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const logout = createAsyncThunk(
	'user/logout',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.delete(`${baseUrl}/api/users/me/logout`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const status = await response.status;
			return status;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteProfile = createAsyncThunk(
	'user/deleteProfile',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.delete(
				`${baseUrl}/api/users/me/delete-user`,
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const message = await response.data.message;
			return message;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		deleteStatusReset(state, action) {
			state.isAuth = false;
			state.username = '';
			state.email = '';
			state.jwt_token = '';
			state.role = '';
			state.userPhoto = {};
			state.message = '';
			state.isError = false;
			state.errorMessage = '';
			state.statusPasswordReset = action.payload;
			state.statusDeleteProfile = false;
		},
		deleteStatusRestore(state, action) {
			state.isAuth = false;
			state.username = '';
			state.email = '';
			state.jwt_token = '';
			state.role = '';
			state.userPhoto = {};
			state.message = '';
			state.isError = false;
			state.errorMessage = '';
			state.statusPasswordRestore = action.payload;
			state.statusDeleteProfile = false;
		},
		deleteStatusRegistration(state, action) {
			state.isAuth = false;
			state.username = '';
			state.email = '';
			state.jwt_token = '';
			state.role = '';
			state.userPhoto = {};
			state.message = '';
			state.isError = false;
			state.errorMessage = '';
			state.statusPasswordRestore = 0;
			state.statusRegistration = action.payload;
			state.statusDeleteProfile = false;
		},
		deleteStatusError(state, action) {
			state.isError = false;
			state.errorMessage = action.payload;
		},
		deleteMessageSuccess(state) {
			state.message = '';
		},
		deleteUserFromLocStorage(state: any) {
			state = initialState;
		},
		deleteStatusDeleteProfile(state: any) {
			state.statusDeleteProfile = 0;
		},
		setUserDelete(state) {
			state.isAuth = false;
			state.username = '';
			state.email = '';
			state.jwt_token = '';
			state.role = '';
			state.userPhoto = {};
			state.message = '';
			state.isError = false;
			state.errorMessage = '';
			state.statusPasswordRestore = 0;
			state.statusRegistration = 0;
			state.statusDeleteProfile = false;
		},
		validateError(state, action) {
			state.isError = true;
			state.errorMessage = action.payload;
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(registration.fulfilled, (state: any, action: any) => {
				state.statusRegistration = action.payload;
			})
			.addCase(registration.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			})
			.addCase(login.fulfilled, (state: any, action: any) => {
				state.isAuth = true;
				state.username = action.payload.username;
				state.email = action.payload.email;
				state.role = action.payload.role;
				state.userPhoto = action.payload.userPhoto;
				state.jwt_token = action.payload.jwt_token;
			})
			.addCase(login.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			})
			.addCase(resetPassword.fulfilled, (state: any, action: any) => {
				state.statusPasswordReset = action.payload;
			})
			.addCase(resetPassword.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			})
			.addCase(restorePassword.fulfilled, (state: any, action: any) => {
				state.statusPasswordRestore = action.payload;
			})
			.addCase(restorePassword.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			})
			.addCase(uploadUserPhoto.fulfilled, (state: any, action: any) => {
				state.userPhoto = action.payload.updateUser.userPhoto;
				state.message = action.payload.message;
			})
			.addCase(deleteUserPhoto.fulfilled, (state: any, action: any) => {
				state.userPhoto = action.payload;
			})
			.addCase(uploadUserPhoto.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			})
			.addCase(updateUserCredentials.fulfilled, (state: any, action: any) => {
				state.username = action.payload.updateUser.username;
				state.email = action.payload.updateUser.email;
				state.message = action.payload.message;
			})
			.addCase(updateUserCredentials.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			})
			.addCase(updateUserPassword.fulfilled, (state: any, action: any) => {
				state.message = action.payload;
			})
			.addCase(updateUserPassword.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			})
			.addCase(logout.fulfilled, (state: any, action: any) => {
				state.isAuth = false;
				state.username = '';
				state.email = '';
				state.jwt_token = '';
				state.role = '';
				state.userPhoto = {};
				state.message = '';
				state.isError = false;
				state.errorMessage = '';
				state.statusPasswordRestore = 0;
				state.statusRegistration = 0;
				state.statusDeleteProfile = false;
			})
			.addCase(deleteProfile.fulfilled, (state: any, action: any) => {
				state.message = action.payload;
				state.statusDeleteProfile = true;
			})
			.addCase(deleteProfile.rejected, (state: any, action: any) => {
				state.isError = true;
				state.errorMessage = action.payload;
			});
	},
});

export const { reducer } = userSlice;
export const {
	deleteStatusReset,
	deleteStatusRestore,
	deleteStatusRegistration,
	deleteStatusError,
	deleteMessageSuccess,
	deleteUserFromLocStorage,
	deleteStatusDeleteProfile,
	setUserDelete,
	validateError,
} = userSlice.actions;
