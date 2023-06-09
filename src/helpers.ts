import { LoadCardModel } from './components/Trucks/Model';

export const saveToLocalStorage = (state: any) => {
	try {
		localStorage.setItem(`state`, JSON.stringify(state));
		const locStorage = localStorage.getItem('state');
		return locStorage;
	} catch (e) {
		console.error(e);
	}
};

export const loadFromLocalStorage = () => {
	try {
		const stateStr = localStorage.getItem(`state`);
		return stateStr ? JSON.parse(stateStr) : undefined;
	} catch (e) {
		console.error(e);
		return undefined;
	}
};

export function formatDate(date: string) {
	return date.split('/').join('.');
}

export const isEmpty = (obj: any) => {
	for (let key in obj) {
		return false;
	}
	return true;
};

export const ifReadActiveLoadShipper = (arr: LoadCardModel[]) => {
	if (
		arr.length > 0 &&
		arr.filter((el) => el.readByShipper === false).length > 0
	) {
		return true;
	} else {
		return false;
	}
};
