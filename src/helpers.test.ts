import { LoadCardModel } from './components/Trucks/Model';
import {
	formatDate,
	ifReadActiveLoadShipper,
	isEmpty,
	loadFromLocalStorage,
	saveToLocalStorage,
} from './helpers';

it('should return new date', () => {
	const date = '11/02/2020';
	const newDate = '11.02.2020';
	const result = formatDate(date);
	expect(result).toEqual(newDate);
});

it('should check is object empty, reurn true', () => {
	const emptyObj = {};
	const resultEmpty = isEmpty(emptyObj);
	expect(resultEmpty).toBeTruthy();
});
it('should check is object empty, return false', () => {
	const obj = { name: 'John' };
	const resultEmpty = isEmpty(obj);
	expect(resultEmpty).toBeFalsy();
});
it('should save data to localStorage', () => {
	const state = { name: 'John' };
	const result = saveToLocalStorage(state);
	expect(result).toEqual('{"name":"John"}');
});
it('should load data from localStorage', () => {
	const data = { name: 'John' };
	localStorage.setItem(`data`, JSON.stringify(data));
	const result = loadFromLocalStorage();
	const expectedValue = { name: 'John' };
	expect(result).toEqual(expectedValue);
});
it('should load data - undefined from localStorage', () => {
	const data = undefined;
	localStorage.clear();
	localStorage.setItem(`data`, JSON.stringify(data));
	const result = loadFromLocalStorage();
	const expectedValue = undefined;
	expect(result).toEqual(expectedValue);
});
it('should return false if user doesn`t have new actibe loads', () => {
	const arrayActiveLoads: LoadCardModel[] = [];
	const result = ifReadActiveLoadShipper(arrayActiveLoads);
	expect(result).toBeFalsy();
});
it('should return true if the active load was read', () => {
	const arrayActiveLoads: LoadCardModel[] = [
		{
			_id: '000',
			created_by: '9999',
			assigned_to: '1111',
			status: 'ASSIGNED',
			state: 'Arrived to Pick Up',
			name: 'Load',
			payload: 200,
			pickup_address: 'pickup_address',
			delivery_address: 'delivery_address',
			dimensions: {
				width: 20,
				length: 20,
				height: 20,
			},
			logs: [
				{
					message: 'message',
					time: '11.04.2023',
				},
			],
			createdDate: '11.04.2023',
			readByDriver: false,
			readByShipper: false,
		},
	];
	const result = ifReadActiveLoadShipper(arrayActiveLoads);
	expect(result).toBeTruthy();
});
