export interface TruckCardModel {
	_id: string;
	created_by: string;
	assigned_to: string;
	type: string;
	status: string;
	createdDate: string;
}

export interface LoadCardModel {
	_id: string;
	created_by: string;
	assigned_to: string;
	status: string;
	state: string;
	name: string;
	payload: number;
	pickup_address: string;
	delivery_address: string;
	dimensions: {
		width: number;
		length: number;
		height: number;
	};
	logs: [
		{
			message: string;
			time: string;
		}
	];
	createdDate: string;
	readByDriver: boolean;
	readByShipper: boolean;
}

export type Props =
	| {
			_id: string;
			created_by: string;
			assigned_to: string;
			type: string;
			status: string;
			createdDate: string;
	  }
	| {
			_id: string;
			created_by: string;
			assigned_to: string;
			status: string;
			state: string;
			name: string;
			payload: number;
			pickup_address: string;
			delivery_address: string;
			dimensions: {
				width: number;
				length: number;
				height: number;
			};
			logs: [
				{
					message: string;
					time: string;
				}
			];
			createdDate: string;
			readByDriver: boolean;
			readByShipper: boolean;
	  };
export interface AllProps {
	list: Props;
}

export interface Truck {
	type: string;
}

export interface TruckUpdate {
	_id: string;
	type: string;
}

export interface CurLoad {
	name: string;
	payload: number;
	pickup_address: string;
	delivery_address: string;
	dimensions: {
		width: number;
		length: number;
		height: number;
	};
}

export interface CurLoadUpdate {
	_id: string;
	name: string;
	payload: number;
	pickup_address: string;
	delivery_address: string;
	dimensions: {
		width: number;
		length: number;
		height: number;
	};
}

export interface TrucksState {
	truck: {
		trucks: TruckCardModel[];
	};
}

export interface LoadsState {
	load: {
		loads: TruckCardModel[];
	};
}

export interface SideBarI {
	label: string;
	icon: any;
	id: string;
	to: any;
}

export interface FilterPropsI {
	filterCards: (filterCards: string) => void;
}

export interface ModalPropsI {
	children: React.ReactNode;
	title: string;
	onClose: () => void;
}

export interface PropsI {
	list: TruckCardModel & LoadCardModel;
}

export interface IPropsButton {
	text: any;
	type?: any;
	style?: object;
	onClick?: any;
	disabled?: any;
	onSubmit?: any;
	id?: string;
	onMouseOver?: any;
	onMouseLeave?: any;
}
