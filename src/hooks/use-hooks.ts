import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadCardModel, TruckCardModel } from '../components/Trucks/Model';
import {
	faUser,
	faTruckRampBox,
	faBoxArchive,
} from '@fortawesome/free-solid-svg-icons';
import {
	activeLoadsSideBar,
	archiveLoadsSideBar,
	profileText,
} from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { sortTrucks } from '../store/user/truckSlice';
import { sortLoads } from '../store/user/loadSlice';

const useHooks = (key: any, defaultValue: any) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = localStorage.getItem(key);

			if (value) {
				return JSON.parse(value);
			} else {
				localStorage.setItem(key, JSON.stringify(defaultValue));
				return defaultValue;
			}
		} catch (error) {
			return defaultValue;
		}
	});

	const setValue = (newValue: string) => {
		try {
			localStorage.setItem(key, JSON.stringify(newValue));
		} catch (error) {
			console.log(error);
		}
		setStoredValue(newValue);
	};
	return [storedValue, setValue];
};

export const useInput = (initialValue: any, validations: any) => {
	const [value, setValue] = useState(initialValue);
	const [isDirty, setDirty] = useState(false);
	const valid = useValidation(value, validations);

	const onChange = (e: any) => {
		setValue(e.target.value);
	};

	const resetInput = () => {
		setValue('');
		setDirty(false);
	};

	const resetInputUpdateCredentials = (data: string) => {
		setValue(data);
		setDirty(false);
	};

	const onBlur = (e: any) => {
		setDirty(true);
	};

	const searchCard = (items: any) => {
		setValue(value);
		localStorage.setItem('currArrSearch', JSON.stringify(items));
		let newItems = [...items];
		return newItems.filter((item: any) =>
			item.name.toLowerCase().includes(value.toLowerCase())
		);
	};
	return {
		value,
		isDirty,
		onChange,
		resetInput,
		onBlur,
		resetInputUpdateCredentials,
		...valid,
		searchCard,
	};
};

export const useValidation = (value: any, validations: any) => {
	const [isEmpty, setEmpty] = useState(true);
	const [isTypeStringError, setTypeStringError] = useState(false);
	const [isTypeNumberError, setTypeNumberError] = useState(false);
	const [minLengthError, setMinLengthError] = useState(false);
	const [minLengthOptionsError, setMinLengthOptionsError] = useState(false);
	const [emailError, setEmailError] = useState(false);
	const [isInputValid, setIsInputValid] = useState(false);
	const [isTypeTruckError, setIsTypeTruckError] = useState(false);

	useEffect(() => {
		for (const validation in validations) {
			switch (validation) {
				case 'minLength':
					value.length < validations[validation]
						? setMinLengthError(true)
						: setMinLengthError(false);
					break;
				case 'isEmpty':
					value ? setEmpty(false) : setEmpty(true);
					break;
				case 'isEmail':
					const regex = /\S+@\S+\.\S+/;
					regex.test(String(value).toLowerCase())
						? setEmailError(false)
						: setEmailError(true);
					break;
				case 'typeTruck':
					value === 'sprinter' ||
					value === 'small stright' ||
					value === 'large stright'
						? setIsTypeTruckError(false)
						: setIsTypeTruckError(true);
					break;
				case 'typeString':
					isNaN(value) ? setTypeStringError(false) : setTypeStringError(true);
					break;
				case 'typeNumber':
					!isNaN(value) ? setTypeNumberError(false) : setTypeNumberError(true);
					break;
				case 'minOptions':
					value < validations[validation]
						? setMinLengthOptionsError(false)
						: setMinLengthOptionsError(true);
					break;
				default:
			}
		}
	}, [value, validations]);

	useEffect(() => {
		if (
			isEmpty ||
			emailError ||
			minLengthError ||
			isTypeTruckError ||
			isTypeStringError ||
			isTypeNumberError ||
			minLengthOptionsError
		) {
			setIsInputValid(false);
		} else {
			setIsInputValid(true);
		}
	}, [
		isEmpty,
		emailError,
		minLengthError,
		isTypeTruckError,
		isTypeStringError,
		isTypeNumberError,
		minLengthOptionsError,
	]);

	return {
		isEmpty,
		minLengthError,
		emailError,
		isInputValid,
		isTypeTruckError,
		isTypeStringError,
		isTypeNumberError,
		minLengthOptionsError,
	};
};

export const useModal = (): any => {
	const [value, setValue] = useState(false);
	const [idValue, setIdValue] = useState('');
	const [type, setType] = useState('');
	const [name, setName] = useState('');
	const [payload, setPayload] = useState(0);
	const [pickup_address, setPickup_address] = useState('');
	const [delivery_address, setDelivery_address] = useState('');
	const [width, setWidth] = useState(0);
	const [length, setLenght] = useState(0);
	const [height, setHeight] = useState(0);

	const open = () => {
		setValue(true);
	};

	enum ModelCard {
		'IS',
		'OL',
	}
	const keys = Object.keys(ModelCard).filter((v) => isNaN(Number(v)));
	const openUpdateModal = (card: TruckCardModel & LoadCardModel) => {
		if (keys.includes(card.status)) {
			setValue(true);
			setIdValue(card._id);
			setType(card.type);
		} else {
			setValue(true);
			setIdValue(card._id);
			setName(card.name);
			setPayload(card.payload);
			setPickup_address(card.pickup_address);
			setDelivery_address(card.delivery_address);
			setWidth(card.dimensions.width);
			setLenght(card.dimensions.length);
			setHeight(card.dimensions.height);
		}
	};

	const close = () => {
		setValue(false);
	};

	return {
		value,
		open,
		close,
		idValue,
		openUpdateModal,
		type,
		name,
		payload,
		pickup_address,
		delivery_address,
		width,
		length,
		height,
	};
};

export const useOnClickStyle = () => {
	const [avatar, setAvatar] = useState(true);
	const [editPass, setEditPass] = useState(false);
	const [deleteProfile, setDeleteProfile] = useState(false);

	const clickAvatar = () => {
		setAvatar(true);
		setEditPass(false);
		setDeleteProfile(false);
	};

	const clickEditPass = () => {
		setEditPass(true);
		setAvatar(false);
		setDeleteProfile(false);
	};

	const clickDeleteProfile = () => {
		setDeleteProfile(true);
		setAvatar(false);
		setEditPass(false);
	};

	return {
		avatar,
		editPass,
		deleteProfile,
		clickAvatar,
		clickEditPass,
		clickDeleteProfile,
	};
};

export const useTogglePassword = () => {
	const [typeOld, setTypeOld] = useState('password');
	const [typeNew, setTypeNew] = useState('password');
	const [typeNewConfirm, setTypeNewConfirm] = useState('password');
	const [isShowPasswordOld, setShowPasswordOld] = useState(false);
	const [isShowPasswordNew, setShowPasswordNew] = useState(false);
	const [isShowPasswordNewConfirm, setShowPasswordNewConfirm] = useState(false);

	const togglePassInputOld = () => {
		if (typeOld === 'password') {
			setTypeOld('text');
			setShowPasswordOld(true);
		} else {
			setTypeOld('password');
			setShowPasswordOld(false);
		}
	};

	const togglePassInputNew = () => {
		if (typeNew === 'password') {
			setTypeNew('text');
			setShowPasswordNew(true);
		} else {
			setTypeNew('password');
			setShowPasswordNew(false);
		}
	};

	const togglePassInputNewConfirm = () => {
		if (typeNewConfirm === 'password') {
			setTypeNewConfirm('text');
			setShowPasswordNewConfirm(true);
		} else {
			setTypeNewConfirm('password');
			setShowPasswordNewConfirm(false);
		}
	};

	return {
		typeOld,
		typeNew,
		typeNewConfirm,
		isShowPasswordOld,
		isShowPasswordNew,
		isShowPasswordNewConfirm,
		togglePassInputOld,
		togglePassInputNew,
		togglePassInputNewConfirm,
	};
};

export const useTrans = (): any => {
	const { t } = useTranslation();

	const sideBar = [
		{
			label: t(activeLoadsSideBar),
			icon: faTruckRampBox,
			id: '3',
			to: '/main-page/active-loads',
		},
		{
			label: t(archiveLoadsSideBar),
			icon: faBoxArchive,
			id: '1',
			to: '/main-page/archive-loads',
		},
		{
			label: t(profileText),
			icon: faUser,
			id: '4',
			to: '/main-page/profile',
		},
	];
	return sideBar;
};

export const useSortCards = () => {
	const user: any = useSelector((state: any) => state.user.role);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

	const sortCards = (items: any, args: string[]) => {
		const sortField = args[0];
		let hiLo = true;
		if (args[1] === 'desc') {
			hiLo = false;
		}
		if (items !== undefined) {
			items.sort((a: any, b: any) => {
				if (a[sortField] < b[sortField]) {
					if (hiLo) return -1;
					else return 1;
				} else if (a[sortField] > b[sortField]) {
					if (hiLo) return 1;
					else return -1;
				} else {
					return 0;
				}
			});
		}
		user === 'DRIVER'
			? dispatch(sortTrucks(items))
			: dispatch(sortLoads(items));
	};

	return { sortCards };
};

export const useChangesStylesIsFocused = (initialValue: boolean) => {
	const [isFocused, setIsFocused] = useState(initialValue);

	const styleSearch = {
		margin: '1vh 0 2vh 0',
		width: '60vh',
		paddingLeft: '1vh',
		borderLeftColor: 'transparent !important',
		fontSize: '.9em',
		height: '5vh',
		borderRadius: '0vh 1vh 1vh 0vh',
		borderWidth: isFocused ? '.3vh' : '.1vh',
		borderRightStyle: 'solid',
		borderBottomStyle: 'solid',
		borderTopStyle: 'solid',
		borderLeftStyle: 'none',
		borderColor: isFocused ? 'rgb(219, 165, 17)' : '#bbcfe7',
	};

	const stylefilterContainer = {
		borderColor: isFocused ? 'rgb(219, 165, 17)' : '#bbcfe7',
		borderWidth: isFocused ? '.3vh' : '.1vh',
	};

	const onBlur = () => {
		setIsFocused(false);
	};
	const onFocus = () => {
		setIsFocused(true);
	};

	return {
		onBlur,
		onFocus,
		styleSearch,
		stylefilterContainer,
	};
};
export default useHooks;
