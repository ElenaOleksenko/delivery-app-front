import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
	CurLoad,
	CurLoadUpdate,
	LoadCardModel,
} from '../../components/Trucks/Model';
import { loadFromLocalStorage } from '../../helpers';
import { baseUrl } from '../../constants';

const archiveLoads: LoadCardModel[] = [];

const loads: LoadCardModel[] = [];

export const initialState = {
	loads: loads,
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
};

export const getLoads = createAsyncThunk(
	'load/getLoads',
	async (_, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.get(`${baseUrl}/api/loads`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const data = await response.data.loads;
			return data;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const getActiveLoadShipper = createAsyncThunk(
	'load/getActiveLoads',
	async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.get(`${baseUrl}/api/loads/shipping_info`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const loadArrivedToDelivery = await response.data.loadArrivedToDelivery;
			const assignedLoad = await response.data.assignedLoad;
			return fulfillWithValue({ assignedLoad, loadArrivedToDelivery });
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const addNewLoad = createAsyncThunk(
	'truck/addNewLoad',
	async (currLoad: CurLoad, { rejectWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.post(`${baseUrl}/api/loads`, currLoad, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status !== 200) {
				throw new Error('There was a problem with your request');
			}
			const load = await response.data.loadNew;
			return load;
		} catch (error) {
			return rejectWithValue((error as Error).message);
		}
	}
);

export const deleteLoad = createAsyncThunk(
	'load/deleteLoad',
	async (id: string, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.delete(`${baseUrl}/api/loads/${id}`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			if (response.status === 200) {
				const load = await response.data.deletedLoad;
				return fulfillWithValue(load);
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
				return rejectWithValue(error.response.data.message);
			} else {
				const errorStatus = error.response.status;
				const errorMessage = error.response.data.message;
				return rejectWithValue({
					errorStatus,
					errorMessage,
				});
			}
		}
	}
);

export const updateLoad = createAsyncThunk(
	'truck/updateLoad',
	async (
		currLoad: CurLoadUpdate,
		{ rejectWithValue, fulfillWithValue, dispatch }
	) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const loadUpdate = {
				name: currLoad.name,
				payload: currLoad.payload,
				pickup_address: currLoad.pickup_address,
				delivery_address: currLoad.delivery_address,
				dimensions: {
					width: currLoad.dimensions.width,
					length: currLoad.dimensions.length,
					height: currLoad.dimensions.height,
				},
			};
			const response = await axios.put(
				`${baseUrl}/api/loads/${currLoad._id}`,
				loadUpdate,
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status === 200) {
				const load = await response.data.updateLoad;
				return fulfillWithValue(load);
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
				return rejectWithValue(error.response.data.message);
			} else {
				const errorStatus = error.response.status;
				const errorMessage = error.message;
				return rejectWithValue({
					errorStatus,
					errorMessage,
				});
			}
		}
	}
);

export const searchTruckLoad = createAsyncThunk(
	'truck/searchTruckLoad',
	async (id: string, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.post(
				`${baseUrl}/api/loads/${id}/post`,
				{},
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status === 200) {
				const load = await response.data.updateLoad;
				return fulfillWithValue(load);
			} else if (response.status === 400) {
				return rejectWithValue(response.data.updateLoad);
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
				return rejectWithValue(error.response.data.updateLoad);
			} else {
				const errorStatus = error.response.status;
				const errorMessage = error.message;
				return rejectWithValue({
					errorStatus,
					errorMessage,
				});
			}
		}
	}
);

export const updateIfReadLoadByShipper = createAsyncThunk(
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

export const archiveLoad = createAsyncThunk(
	'truck/archiveLoad',
	async (id: string, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.put(
				`${baseUrl}/api/loads/${id}/archive/`,
				{},
				{
					headers: {
						Authorization: locAppState,
						'Content-Type': 'application/json',
					},
				}
			);
			if (response.status === 200) {
				const load = await response.data.archiveCurrLoad;
				const message = await response.data.message;
				const archiveLoad = { load, message };
				return fulfillWithValue(archiveLoad);
			} else if (response.status === 400) {
				const errorStatus = response.status;
				const errorMessage = response.data.message;
				return rejectWithValue({
					errorStatus,
					errorMessage,
				});
			} else {
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

export const getArchiveLoad = createAsyncThunk(
	'truck/getArchiveLoad',
	async (_, { rejectWithValue, fulfillWithValue, dispatch }) => {
		try {
			let locAppState = `Bearer ${loadFromLocalStorage().user.jwt_token}`;
			const response = await axios.get(`${baseUrl}/api/loads/archive/`, {
				headers: {
					Authorization: locAppState,
					'Content-Type': 'application/json',
				},
			});
			const loads = await response.data.loads;
			return fulfillWithValue(loads);
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

const loadSlice = createSlice({
	name: 'load',
	initialState,
	reducers: {
		getLoadsFromLocStorage(state: any, action: any) {
			state.loads = action.payload;
		},
		deleteErrorGetLoads(state) {
			state.isErrorGetLoads = false;
			state.errorMessage = '';
		},
		logoutLoadsFromLocStorage(state: any) {
			state.loads = [];
			state.activeLoadShipper = { assignedLoad: [], loadArrivedToDelivery: [] };
			state.responseDriverFound = false;
			state.loadTruckWasFound = {};
			state.alertAssignedLoadForShipper = 0;
			state.isErrorGetLoads = false;
			state.driverFound = false;
			state.isErrorLoads = false;
			state.errorMessage = '';
		},
		sortLoads(state, action) {
			state.loads = action.payload;
		},
		deleteResponseDriverFound(state) {
			state.responseDriverFound = false;
		},
		deleteStatusLoadsError(state, action) {
			state.isErrorLoads = false;
			state.responseDriverFound = false;
			state.errorMessage = action.payload;
		},
		getActiveLoadShipperLocalStorage(state: any, action: any) {
			state.activeLoadShipper.assignedLoad = action.payload.assignedLoad;
			state.activeLoadShipper.loadArrivedToDelivery =
				action.payload.loadArrivedToDelivery;
		},
		setAlertAssignedLoadForShipper(state) {
			const lengthArray = state.activeLoadShipper.loadArrivedToDelivery.filter(
				(el: any) => {
					return el.readByShipper === false;
				}
			);
			state.alertAssignedLoadForShipper = lengthArray.length;
		},
		deleteAlertAssignedLoadForShipper(state) {
			state.alertAssignedLoadForShipper = 0;
		},
		deleteStatusErrorLoad(state) {
			state.isErrorLoads = false;
			state.errorMessage = '';
		},
		deleteMessageSuccessLoad(state) {
			state.successMessage = '';
		},
		deleteStatusIsLoadArchive(state) {
			state.isLoadArchive = false;
		},
	},
	extraReducers: (builder: any) => {
		builder
			.addCase(getLoads.fulfilled, (state: any, action: any) => {
				state.loads = action.payload;
			})
			.addCase(getLoads.rejected, (state: any, action: any) => {
				state.isErrorGetLoads = true;
				state.errorMessage = action.payload;
			})
			.addCase(getActiveLoadShipper.fulfilled, (state: any, action: any) => {
				state.activeLoadShipper.assignedLoad = action.payload.assignedLoad;
				state.activeLoadShipper.loadArrivedToDelivery =
					action.payload.loadArrivedToDelivery;
			})
			.addCase(addNewLoad.fulfilled, (state: any, action: any) => {
				state.loads.push(action.payload);
			})
			.addCase(deleteLoad.fulfilled, (state: any, action: any) => {
				state.loads = state.loads.filter((load: LoadCardModel) => {
					return load._id !== action.payload._id;
				});
			})
			.addCase(deleteLoad.rejected, (state: any, action: any) => {
				if (action.payload.errorStatus === 400) {
					state.isErrorLoads = true;
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.isErrorLoads = true;
					state.errorMessage = action.payload;
				}
			})
			.addCase(updateLoad.fulfilled, (state: any, action: any) => {
				let id = state.loads.findIndex(
					(element: any) => element._id === action.payload._id
				);
				state.loads.splice(id, 1, action.payload);
			})
			.addCase(updateLoad.rejected, (state: any, action: any) => {
				if (action.payload.errorStatus === 400) {
					state.isErrorLoads = true;
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.isErrorLoads = true;
					state.errorMessage = action.payload;
				}
			})
			.addCase(searchTruckLoad.fulfilled, (state: any, action: any) => {
				let id = state.loads.findIndex(
					(element: any) => element._id === action.payload._id
				);
				state.loadTruckWasFound = action.payload;
				state.loads.splice(id, 1, action.payload);
				state.driverFound = true;
				state.responseDriverFound = true;
			})
			.addCase(searchTruckLoad.rejected, (state: any, action: any) => {
				if (action.payload.errorStatus > 400) {
					state.isErrorLoads = true;
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.responseDriverFound = true;
					state.loadTruckWasFound = action.payload;
				}
			})
			.addCase(
				updateIfReadLoadByShipper.fulfilled,
				(state: any, action: any) => {
					state.activeLoadShipper.loadArrivedToDelivery.find((el: any) => {
						if (el.readByShipper === false) {
							el.readByShipper = true;
						}
						return 1;
					});
				}
			)
			.addCase(archiveLoad.fulfilled, (state: any, action: any) => {
				if (action.payload.load.status === 'ARCHIVE') {
					let id = state.loads.findIndex(
						(element: any) => element._id === action.payload.load._id
					);
					state.loads.splice(id, 1);
					state.activeLoadShipper.loadArrivedToDelivery =
						state.activeLoadShipper.loadArrivedToDelivery.filter((el: any) => {
							return el._id !== action.payload.load._id;
						});
					state.successMessage = action.payload.message;
					state.isLoadArchive = true;
				}
			})
			.addCase(archiveLoad.rejected, (state: any, action: any) => {
				if (action.payload.errorStatus === 400) {
					state.isErrorLoads = true;
					state.errorMessage = action.payload.errorMessage;
				} else {
					state.isErrorLoads = true;
					state.errorMessage = action.payload;
				}
			})
			.addCase(getArchiveLoad.fulfilled, (state: any, action: any) => {
				state.archiveLoads = action.payload;
			});
	},
});
export default loadSlice.reducer;

export const {
	getLoadsFromLocStorage,
	deleteErrorGetLoads,
	logoutLoadsFromLocStorage,
	sortLoads,
	deleteResponseDriverFound,
	deleteStatusLoadsError,
	getActiveLoadShipperLocalStorage,
	setAlertAssignedLoadForShipper,
	deleteAlertAssignedLoadForShipper,
	deleteStatusErrorLoad,
	deleteMessageSuccessLoad,
	deleteStatusIsLoadArchive,
} = loadSlice.actions;
