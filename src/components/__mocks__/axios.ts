import { LoadCardModel } from '../Trucks/Model';

export const trucks = [
	{
		_id: '1',
		created_by: '1111',
		assigned_to: '1111',
		type: 'sprinter',
		status: 'IS',
		createdDate: '02.01.2023',
	},
	{
		_id: '2',
		created_by: '2222',
		assigned_to: '2222',
		type: 'small stright',
		status: 'IS',
		createdDate: '03.01.2023',
	},
	{
		_id: '3',
		created_by: '3333',
		assigned_to: '3333',
		type: 'large stright',
		status: 'IS',
		createdDate: '04.01.2023',
	},
];

export const loads: LoadCardModel[] = [
	{
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
	},
];

export const archiveLoads: LoadCardModel[] = [
	{
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
	},
];

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	get: jest.fn(() => Promise.resolve({ data: {} })),
	post: jest.fn(() => Promise.resolve({ data: {} })),
	patch: jest.fn(() => Promise.resolve({ data: {} })),
	put: jest.fn(() => Promise.resolve({ data: {} })),
	delete: jest.fn(() => Promise.resolve({ data: {} })),
};
