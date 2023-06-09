import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	Truck,
	TruckCardModel,
	TruckUpdate,
} from '../../components/Trucks/Model';
import { loadFromLocalStorage } from '../../helpers';
import { baseUrl } from '../../constants';

interface TruckState {
	trucks: TruckCardModel[];
	assignTruck: string;
	isErrorGetTrucks: boolean;
	isErrorTrucks: boolean;
	isErrorActiveLoad: boolean;
	isErrorAssignTruck: boolean;
	successMessage: string;
	errorMessage: string;
	alertAssignedLoad: string;
	activeLoadDriver: object;
}

export const initialState = {
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
} as TruckState;

export const getTrucks = createAsyncThunk(
	'truck/getTrucks',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.get(`${baseUrl}/api/trucks`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const data = await response.data.trucks;
			return data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const getActiveLoadsForDriver = createAsyncThunk(
	'truck/getActiveLoadsForDriver',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.get(`${baseUrl}/api/loads/active`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const data = await response.data.load;
			return data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addNewTruck = createAsyncThunk(
	'truck/addNewTruck',
	async (currTruck: Truck, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.post(`${baseUrl}/api/trucks`, currTruck, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const truck = await response.data.truck;
			return truck;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const updateTruck = createAsyncThunk(
	'truck/updateTruck',
	async (currTruck: TruckUpdate, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const truckUpdate = {
				type: currTruck.type,
			};
			const response = await axios.put(
				`${baseUrl}/api/trucks/${currTruck._id}`,
				truckUpdate,
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
			const truck = await response.data.updateTruck;
			return truck;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteTruck = createAsyncThunk(
	'truck/deleteTruck',
	async (id: string, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.delete(`${baseUrl}/api/trucks/${id}`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 200) {
				const truck = await response.data.truck;
				return fulfillWithValue(truck);
			} else if (response.status === 400) {
				return rejectWithValue(response.data.message);
			} else {
				const errorStatus = response.status;
				const errorMessage = response.data.message;
				return rejectWithValue({
					errorStatus,
					errorMessage,
				});
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

export const assignTruck = createAsyncThunk(
	'truck/assignTruck',
	async (id: string, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.post(
				`${baseUrl}/api/trucks/${id}/assign`,
				{},
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status === 200) {
				const currTruck = await response.data.truck;
				const message = await response.data.message;
				const truck = { currTruck, message };
				return fulfillWithValue(truck);
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

export const updateIfReadLoad = createAsyncThunk(
	'truck/updateIfReadLoad',
	async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.patch(
				`${baseUrl}/api/loads/active/`,
				{},
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			const changeStateLoad = await response.data.activeLoad;
			return fulfillWithValue(changeStateLoad);
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

export const changeLoadState = createAsyncThunk(
	'truck/changeLoadState',
	async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.patch(
				`${baseUrl}/api/loads/active/state`,
				{},
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status === 200) {
				const changeStateLoad = await response.data.activeLoadNew;
				const message = await response.data.message;
				const load = { changeStateLoad, message };
				return fulfillWithValue(load);
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

const truckSlice = createSlice({
	name: 'truck',
	initialState,
	reducers: {
		getTrucksFromLocStorage(state: any, action: any) {
			state.trucks = action.payload;
		},
		deleteErrorGetTrucks(state) {
			state.isErrorTrucks = false;
			state.errorMessage = '';
		},
		deleteErrorActiveLoad(state) {
			state.isErrorActiveLoad = false;
			state.errorMessage = '';
		},
		logoutTrucksFromLocStorage(state: any) {
			state.isErrorGetTrucks = false;
			state.trucks = [];
			state.assignTruck = '';
			state.alertAssignedLoad = '';
			state.isErrorTrucks = false;
			state.isErrorActiveLoad = false;
			state.isErrorAssignTruck = false;
			state.successMessage = '';
			state.errorMessage = '';
			state.activeLoadDriver = {};
		},
		sortTrucks(state: any, action: any) {
			state.trucks = action.payload;
		},
		deleteStatusErrorTruck(state) {
			state.isErrorAssignTruck = false;
			state.errorMessage = '';
		},
		deleteMessageSuccessTruck(state) {
			state.successMessage = '';
		},
		setAlertAssignedLoad(state) {
			state.alertAssignedLoad = '!';
		},
		deleteAlertAssignedLoad(state) {
			state.alertAssignedLoad = '';
		},
		deleteActiveLoad(state) {
			state.activeLoadDriver = {};
		},
		getActiveLoadDriverLocalStorage(state: any, action: any) {
			state.activeLoadDriver = action.payload;
		},
		deleteActiveLoadDriver(state: any) {
			state.activeLoadDriver = {};

			// eslint-disable-next-line array-callback-return
			return state.trucks.find((element: any) => {
				if (element.status === 'OL') {
					element.status = 'IS';
					element.assigned_to = null;
				}
			});
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(getTrucks.fulfilled, (state: any, action: any) => {
				state.trucks = action.payload;
			})
			.addCase(getTrucks.rejected, (state: any, action: any) => {
				state.isErrorGetTrucks = true;
				state.errorMessage = action.payload;
			})
			.addCase(addNewTruck.fulfilled, (state: any, action: any) => {
				state.trucks.push(action.payload);
			})
			.addCase(addNewTruck.rejected, (state: any, action: any) => {
				state.isErrorTrucks = true;
				state.errorMessage = action.payload;
			})
			.addCase(deleteTruck.fulfilled, (state: any, action: any) => {
				state.trucks = state.trucks.filter((truck: TruckCardModel) => {
					return truck._id !== action.payload._id;
				});
			})
			.addCase(deleteTruck.rejected, (state: any, action: any) => {
				if (action.payload.errorStatus === 400) {
					state.isErrorTrucks = true;
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.isErrorTrucks = true;
					state.errorMessage = action.payload;
				}
			})
			.addCase(updateTruck.fulfilled, (state: any, action: any) => {
				let id = state.trucks.findIndex(
					(element: any) => element._id === action.payload._id
				);
				state.trucks.splice(id, 1, action.payload);
			})
			.addCase(assignTruck.fulfilled, (state: any, action: any) => {
				let id = state.trucks.findIndex(
					(element: any) => element._id === action.payload.currTruck._id
				);
				state.trucks.splice(id, 1, action.payload.currTruck);
				state.successMessage = action.payload.message;
			})
			.addCase(assignTruck.rejected, (state: any, action: any) => {
				if (action.payload.errorStatus === 400) {
					state.isErrorAssignTruck = true;
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.isErrorAssignTruck = true;
					state.errorMessage = action.payload;
				}
			})
			.addCase(getActiveLoadsForDriver.fulfilled, (state: any, action: any) => {
				state.activeLoadDriver = action.payload;
			})
			.addCase(getActiveLoadsForDriver.rejected, (state: any, action: any) => {
				state.isErrorActiveLoad = true;
				state.errorMessage = action.payload;
			})
			.addCase(changeLoadState.fulfilled, (state: any, action: any) => {
				state.activeLoadDriver = action.payload.changeStateLoad;
				state.successMessage = action.payload.message;
			})
			.addCase(updateIfReadLoad.fulfilled, (state: any, action: any) => {
				state.activeLoadDriver = action.payload;
			});
	},
});
export default truckSlice.reducer;
export const {
	getTrucksFromLocStorage,
	deleteErrorGetTrucks,
	logoutTrucksFromLocStorage,
	sortTrucks,
	deleteStatusErrorTruck,
	deleteMessageSuccessTruck,
	setAlertAssignedLoad,
	deleteAlertAssignedLoad,
	deleteActiveLoad,
	getActiveLoadDriverLocalStorage,
	deleteActiveLoadDriver,
	deleteErrorActiveLoad,
} = truckSlice.actions;
