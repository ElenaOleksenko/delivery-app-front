import React from 'react';
import { CurLoad, CurLoadUpdate, Truck, TruckUpdate } from '../../Model';
import Input from '../../../../common/Input/Input';
import { Button } from '../../../../common/Button/Button';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { addNewTruck, updateTruck } from '../../../../store/user/truckSlice';
import { useInput } from '../../../../hooks/use-hooks';
import { addNewLoad, updateLoad } from '../../../../store/user/loadSlice';
import {
	active,
	addChanges,
	addLoadButton,
	addTruckButton,
	createLoadTitle,
	deliveryAddressError,
	deliveryAddressErrorString,
	deliveryAddressText,
	enterDeliveryAddressText,
	enterDimensionsText,
	enterHeightText,
	enterLengthText,
	enterNameText,
	enterPayloadText,
	enterPickupAdress,
	enterType,
	enterWidthText,
	errorAdresses,
	heightError,
	heightErrorLength,
	heightErrorNumber,
	heightText,
	invalidType,
	isDisabled,
	lengthError,
	lengthErrorLength,
	lengthErrorNumber,
	lengthText,
	loadName,
	nameError,
	nameErrorLength,
	nameErrorString,
	payloadError,
	payloadErrorLength,
	payloadErrorNumber,
	payloadText,
	pickupAddressText,
	pickupError,
	pickupErrorLength,
	pickupErrorString,
	styleCreateCardShipper,
	styleInputCreateCard,
	typeError,
	typeTextLabel,
	updateLoadTitle,
	validTypeTruckText,
	widthError,
	widthErrorLength,
	widthErrorNumber,
	widthText,
} from '../../../../constants';
import './CreateCard.css';
import { useTranslation } from 'react-i18next';
export function CreateCard({
	onClose,
	id,
	type,
	name,
	payload,
	pickup_address,
	delivery_address,
	width,
	length,
	height,
}: any) {
	let idCard;
	let nameCard;
	let payloadCard;
	let pickupAddressCard;
	let deliveryAddressCard;
	let widthCard;
	let lengthCard;
	let heightCard;

	id === undefined ? (idCard = '') : (idCard = type);
	const typeTruck = useInput(idCard, { isEmpty: true, typeTruck: true });
	id === undefined ? (nameCard = '') : (nameCard = name);
	const nameLoad = useInput(nameCard, {
		isEmpty: true,
		minLength: 4,
		typeString: true,
	});
	id === undefined ? (payloadCard = '') : (payloadCard = payload);
	const payloadLoad = useInput(payloadCard, {
		isEmpty: true,
		typeNumber: true,
		minOptions: 4000,
	});
	id === undefined
		? (pickupAddressCard = '')
		: (pickupAddressCard = pickup_address);
	const pickup_addressLoad = useInput(pickupAddressCard, {
		isEmpty: true,
		minLength: 15,
		typeString: true,
	});
	id === undefined
		? (deliveryAddressCard = '')
		: (deliveryAddressCard = delivery_address);
	const delivery_addressLoad = useInput(deliveryAddressCard, {
		isEmpty: true,
		minLength: 15,
		typeString: true,
	});
	id === undefined ? (widthCard = '') : (widthCard = width);
	const widthLoad = useInput(widthCard, {
		isEmpty: true,
		typeNumber: true,
		minOptions: 700,
	});
	id === undefined ? (lengthCard = '') : (lengthCard = length);
	const lengthLoad = useInput(lengthCard, {
		isEmpty: true,
		typeNumber: true,
		minOptions: 350,
	});
	id === undefined ? (heightCard = '') : (heightCard = height);
	const heightLoad = useInput(heightCard, {
		isEmpty: true,
		typeNumber: true,
		minOptions: 200,
	});

	const user: any = useSelector((state: any) => state.user.role);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { t } = useTranslation();

	const submitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
	};

	const truck = {
		type: typeTruck.value,
	};
	const truckUpdate = {
		_id: id,
		type: typeTruck.value,
	};
	const load = {
		name: nameLoad.value,
		payload: payloadLoad.value,
		pickup_address: pickup_addressLoad.value,
		delivery_address: delivery_addressLoad.value,
		dimensions: {
			width: widthLoad.value,
			length: lengthLoad.value,
			height: heightLoad.value,
		},
	};
	const loadUpdate = {
		_id: id,
		name: nameLoad.value,
		payload: payloadLoad.value,
		pickup_address: pickup_addressLoad.value,
		delivery_address: delivery_addressLoad.value,
		dimensions: {
			width: widthLoad.value,
			length: lengthLoad.value,
			height: heightLoad.value,
		},
	};

	const addCurrCard = (truck: Truck, load: CurLoad) => {
		user === 'DRIVER'
			? dispatch(addNewTruck(truck))
			: dispatch(addNewLoad(load));
		onClose();
	};

	const updateCurrCard = (truck: TruckUpdate, load: CurLoadUpdate) => {
		user === 'DRIVER'
			? dispatch(updateTruck(truck))
			: dispatch(updateLoad(load));
		onClose();
	};
	return (
		<form onSubmit={submitHandler} className='form-container'>
			{user === 'DRIVER' && (
				<>
					<Input
						type='text'
						style={styleInputCreateCard}
						text={t(typeTextLabel)}
						placeholder={t(enterType)}
						value={typeTruck.value}
						onChange={(e: any) => typeTruck.onChange(e)}
						onBlur={(e: any) => typeTruck.onBlur(e)}
					/>
					<div>
						{typeTruck.isDirty && typeTruck.isEmpty && (
							<div className='error-registration'>{t(typeError)}</div>
						)}
						{typeTruck.isDirty && typeTruck.isTypeTruckError && (
							<div className='error-registration'>{t(invalidType)}</div>
						)}
					</div>
					<p className='create-card-description'>{t(validTypeTruckText)}</p>
				</>
			)}

			{user === 'SHIPPER' && (
				<>
					<h2>{id === undefined ? t(createLoadTitle) : t(updateLoadTitle)}</h2>
					<Input
						placeholder={t(enterNameText)}
						text={t(loadName)}
						value={nameLoad.value}
						onChange={(e: any) => nameLoad.onChange(e)}
						onBlur={(e: any) => nameLoad.onBlur(e)}
						style={styleCreateCardShipper}
					/>
					<div className='error-registration-container'>
						{nameLoad.isDirty && nameLoad.isEmpty && (
							<div className='error-registration'>{t(nameError)}</div>
						)}
						{nameLoad.isDirty && nameLoad.minLengthError && (
							<div className='error-registration'>{t(nameErrorLength)}</div>
						)}
						{nameLoad.isDirty && nameLoad.isTypeStringError && (
							<div className='error-registration'>{t(nameErrorString)}</div>
						)}
					</div>
					<Input
						placeholder={t(enterPayloadText)}
						text={t(payloadText)}
						value={payloadLoad.value}
						onChange={(e: any) => payloadLoad.onChange(e)}
						onBlur={(e: any) => payloadLoad.onBlur(e)}
						style={styleCreateCardShipper}
					/>
					<div className='error-registration-container'>
						{payloadLoad.isDirty && payloadLoad.isEmpty && (
							<div className='error-registration'>{t(payloadError)}</div>
						)}
						{payloadLoad.isDirty && payloadLoad.isTypeNumberError && (
							<div className='error-registration'>{t(payloadErrorNumber)}</div>
						)}
						{payloadLoad.isDirty && payloadLoad.minLengthOptionsError && (
							<div className='error-registration'>{t(payloadErrorLength)}</div>
						)}
					</div>
					<Input
						placeholder={t(enterPickupAdress)}
						text={t(pickupAddressText)}
						style={styleCreateCardShipper}
						value={pickup_addressLoad.value}
						onChange={(e: any) => pickup_addressLoad.onChange(e)}
						onBlur={(e: any) => pickup_addressLoad.onBlur(e)}
					/>
					<div className='error-registration-container'>
						{pickup_addressLoad.isDirty && pickup_addressLoad.isEmpty && (
							<div className='error-registration'>{t(pickupError)}</div>
						)}
						{pickup_addressLoad.isDirty &&
							pickup_addressLoad.minLengthError && (
								<div className='error-registration'>{t(pickupErrorLength)}</div>
							)}
						{pickup_addressLoad.isDirty &&
							pickup_addressLoad.isTypeStringError && (
								<div className='error-registration'>{t(pickupErrorString)}</div>
							)}
						{pickup_addressLoad.isDirty &&
							pickup_addressLoad.value === delivery_addressLoad.value && (
								<div className='error-registration'>{t(errorAdresses)}</div>
							)}
					</div>
					<Input
						placeholder={t(enterDeliveryAddressText)}
						text={t(deliveryAddressText)}
						style={styleCreateCardShipper}
						value={delivery_addressLoad.value}
						onChange={(e: any) => delivery_addressLoad.onChange(e)}
						onBlur={(e: any) => delivery_addressLoad.onBlur(e)}
					/>
					<div className='error-registration-container'>
						{delivery_addressLoad.isDirty && delivery_addressLoad.isEmpty && (
							<div className='error-registration'>
								{t(deliveryAddressError)}
							</div>
						)}
						{delivery_addressLoad.isDirty &&
							delivery_addressLoad.minLengthError && (
								<div className='error-registration'>{t(pickupErrorLength)}</div>
							)}
						{delivery_addressLoad.isDirty &&
							delivery_addressLoad.isTypeStringError && (
								<div className='error-registration'>
									{t(deliveryAddressErrorString)}
								</div>
							)}
						{delivery_addressLoad.isDirty &&
							pickup_addressLoad.value === delivery_addressLoad.value && (
								<div className='error-registration'>{t(errorAdresses)}</div>
							)}
					</div>
					<p className='dimensions'>{t(enterDimensionsText)}</p>
					<Input
						placeholder={t(enterWidthText)}
						text={t(widthText)}
						style={styleCreateCardShipper}
						value={widthLoad.value}
						onChange={(e: any) => widthLoad.onChange(e)}
						onBlur={(e: any) => widthLoad.onBlur(e)}
					/>
					<div className='error-registration-container'>
						{widthLoad.isDirty && widthLoad.isEmpty && (
							<div className='error-registration'>{t(widthError)}</div>
						)}
						{widthLoad.isDirty && widthLoad.isTypeNumberError && (
							<div className='error-registration'>{t(widthErrorNumber)}</div>
						)}
						{widthLoad.isDirty && widthLoad.minLengthOptionsError && (
							<div className='error-registration'>{t(widthErrorLength)}</div>
						)}
					</div>
					<Input
						placeholder={t(enterLengthText)}
						text={t(lengthText)}
						style={styleCreateCardShipper}
						value={lengthLoad.value}
						onChange={(e: any) => lengthLoad.onChange(e)}
						onBlur={(e: any) => lengthLoad.onBlur(e)}
					/>
					<div className='error-registration-container'>
						{lengthLoad.isDirty && lengthLoad.isEmpty && (
							<div className='error-registration'>{t(lengthError)}</div>
						)}
						{lengthLoad.isDirty && lengthLoad.isTypeNumberError && (
							<div className='error-registration'>{t(lengthErrorNumber)}</div>
						)}
						{lengthLoad.isDirty && lengthLoad.minLengthOptionsError && (
							<div className='error-registration'>{t(lengthErrorLength)}</div>
						)}
					</div>
					<Input
						placeholder={t(enterHeightText)}
						text={t(heightText)}
						style={styleCreateCardShipper}
						value={heightLoad.value}
						onChange={(e: any) => heightLoad.onChange(e)}
						onBlur={(e: any) => heightLoad.onBlur(e)}
					/>
					<div className='error-registration-container'>
						{heightLoad.isDirty && heightLoad.isEmpty && (
							<div className='error-registration'>{t(heightError)}</div>
						)}
						{heightLoad.isDirty && heightLoad.isTypeNumberError && (
							<div className='error-registration'>{t(heightErrorNumber)}</div>
						)}
						{heightLoad.isDirty && heightLoad.minLengthOptionsError && (
							<div className='error-registration'>{t(heightErrorLength)}</div>
						)}
					</div>
				</>
			)}
			{id === undefined ? (
				<Button
					text={user === 'DRIVER' ? t(addTruckButton) : t(addLoadButton)}
					onClick={() => addCurrCard(truck, load)}
					disabled={
						user === 'DRIVER'
							? !typeTruck.isInputValid
							: !nameLoad.isInputValid ||
							  !payloadLoad.isInputValid ||
							  !pickup_addressLoad.isInputValid ||
							  !delivery_addressLoad.isInputValid ||
							  !widthLoad.isInputValid ||
							  !heightLoad.isInputValid ||
							  !lengthLoad.isInputValid ||
							  pickup_addressLoad.value === delivery_addressLoad.value
					}
					style={
						user === 'DRIVER'
							? typeTruck.isInputValid
								? active
								: isDisabled
							: nameLoad.isInputValid &&
							  payloadLoad.isInputValid &&
							  pickup_addressLoad.isInputValid &&
							  delivery_addressLoad.isInputValid &&
							  widthLoad.isInputValid &&
							  heightLoad.isInputValid &&
							  lengthLoad.isInputValid &&
							  pickup_addressLoad.value !== delivery_addressLoad.value
							? active
							: isDisabled
					}
				/>
			) : (
				<Button
					text={t(addChanges)}
					onClick={() => {
						updateCurrCard(truckUpdate, loadUpdate);
					}}
					disabled={
						user === 'DRIVER'
							? !typeTruck.isInputValid
							: !nameLoad.isInputValid ||
							  !payloadLoad.isInputValid ||
							  !pickup_addressLoad.isInputValid ||
							  !delivery_addressLoad.isInputValid ||
							  !widthLoad.isInputValid ||
							  !heightLoad.isInputValid ||
							  !lengthLoad.isInputValid ||
							  pickup_addressLoad.value === delivery_addressLoad.value
					}
					style={
						user === 'DRIVER'
							? typeTruck.isInputValid
								? active
								: isDisabled
							: nameLoad.isInputValid &&
							  payloadLoad.isInputValid &&
							  pickup_addressLoad.isInputValid &&
							  delivery_addressLoad.isInputValid &&
							  widthLoad.isInputValid &&
							  heightLoad.isInputValid &&
							  lengthLoad.isInputValid &&
							  pickup_addressLoad.value !== delivery_addressLoad.value
							? active
							: isDisabled
					}
				/>
			)}
		</form>
	);
}
