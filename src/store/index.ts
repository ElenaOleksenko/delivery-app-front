import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../helpers';
import truckReducer from './user/truckSlice';
import loadReducer from './user/loadSlice';

import { reducer } from './user/userSlice';

export const rootReducer = combineReducers({
	user: reducer,
	truck: truckReducer,
	load: loadReducer,
});

const persistedStore = loadFromLocalStorage();

export const store = configureStore({
	reducer: rootReducer,
	preloadedState: persistedStore,
});

store.subscribe(() => {
	saveToLocalStorage(store.getState());
});

export type RootState = ReturnType<typeof rootReducer>;
