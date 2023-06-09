import './Main.css';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../common/Button/Button';
import {
	deleteMessageSuccessLoad,
	deleteStatusIsLoadArchive,
	getActiveLoadShipper,
	getLoads,
	getLoadsFromLocStorage,
	setAlertAssignedLoadForShipper,
} from '../../store/user/loadSlice';
import {
	deleteAlertAssignedLoad,
	getActiveLoadsForDriver,
	getTrucks,
	getTrucksFromLocStorage,
	setAlertAssignedLoad,
} from '../../store/user/truckSlice';
import { LoadCardModel, TruckCardModel } from '../../components/Trucks/Model';
import Card from '../../components/Trucks/components/Card/Card';
import { CreateCard } from '../../components/Trucks/components/CreateCard/CreateCard';
import { Modal } from '../../components/Trucks/components/Modal/Modal';
import { useModal } from '../../hooks/use-hooks';
import { Outlet, useNavigate } from 'react-router-dom';
import SearchBar from '../../components/Trucks/components/SearchBar/SearchBar';
import BadRequestError from '../../common/Error/BadRequestError';
import { ifReadActiveLoadShipper, isEmpty } from '../../helpers';
import { useTranslation } from 'react-i18next';
import {
	addLoadButton,
	addTruckButton,
	assignedTo,
	createdDate,
	deliveryAddress,
	emptyTrucksLoads,
	loadName,
	loadsText,
	pickupAddress,
	status,
	stylesBtnCreateTruckLoad,
	trucksText,
	typeTruck,
	yet,
} from '../../constants';

const Main = () => {
	const [searchValue, setSearch] = useState('');
	const modal = useModal();
	const filterCards = (searchValue: string) => {
		setSearch(searchValue);
	};
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const user: any = useSelector((state: any) => state.user.role);
	let { trucks } = useSelector((state: any) => state.truck);

	const {
		loads,
		responseDriverFound,
		isErrorGetLoads,
		activeLoadShipper,
		isLoadArchive,
	} = useSelector((state: any) => state.load);
	let isError;

	const { isErrorGetTrucks, alertAssignedLoad, activeLoadDriver } = useSelector(
		(state: any) => state.truck
	);
	const navigate = useNavigate();
	const { t } = useTranslation();

	user === 'DRIVER'
		? (isError = isErrorGetTrucks)
		: (isError = isErrorGetLoads);
	let commonState: any;
	let stateFromLocalStorage = localStorage.getItem('state');
	if (stateFromLocalStorage !== null) {
		commonState = JSON.parse(stateFromLocalStorage);
	}
	let items;

	if (
		user === 'DRIVER' &&
		trucks !== undefined &&
		commonState.truck.trucks.length === 0
	) {
		items = trucks;
	} else if (
		user === 'DRIVER' &&
		trucks !== undefined &&
		commonState.truck.trucks.length !== 0
	) {
		items = commonState.truck.trucks;
	} else if (
		user === 'SHIPPER' &&
		loads !== undefined &&
		commonState.load.loads.length === 0
	) {
		items = loads;
	} else if (
		user === 'SHIPPER' &&
		loads !== undefined &&
		commonState.load.loads.length !== 0
	) {
		items = commonState.load.loads;
	} else {
		items = [];
	}

	const innerFunction = useCallback(() => {
		if (user === 'DRIVER' && commonState.truck.trucks.length === 0) {
			dispatch(getTrucks());
		} else if (user === 'DRIVER' && commonState.truck.trucks.length !== 0) {
			dispatch(getTrucksFromLocStorage(commonState.truck.trucks));
		} else if (user === 'SHIPPER') {
			dispatch(getLoads());
		} else if (user === 'SHIPPER' && commonState.load.loads.length !== 0) {
			dispatch(getLoadsFromLocStorage(commonState.load.loads));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		innerFunction();
	}, [innerFunction]);

	useEffect(() => {
		if (user === 'DRIVER' && isEmpty(activeLoadDriver)) {
			dispatch(getActiveLoadsForDriver());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (
			user === 'SHIPPER' &&
			activeLoadShipper.assignedLoad.length === 0 &&
			activeLoadShipper.loadArrivedToDelivery.length === 0
		) {
			dispatch(getActiveLoadShipper());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (user === 'SHIPPER' && responseDriverFound)
			navigate('/main-page/search-truck');
	}, [responseDriverFound, user, navigate]);

	useEffect(() => {
		if (
			user === 'DRIVER' &&
			isEmpty(activeLoadDriver) === false &&
			activeLoadDriver !== null &&
			activeLoadDriver.readByDriver === false
		) {
			dispatch(setAlertAssignedLoad());
		} else if (
			user === 'DRIVER' &&
			activeLoadDriver !== null &&
			activeLoadDriver.readByDriver
		) {
			dispatch(deleteAlertAssignedLoad());
		}
	}, [activeLoadDriver, user, alertAssignedLoad, dispatch]);

	useEffect(() => {
		if (
			user === 'SHIPPER' &&
			ifReadActiveLoadShipper(activeLoadShipper.loadArrivedToDelivery)
		) {
			dispatch(setAlertAssignedLoadForShipper());
		}
	}, [activeLoadShipper, user, dispatch]);

	useEffect(() => {
		if (user === 'SHIPPER' && isLoadArchive === true) {
			dispatch(deleteStatusIsLoadArchive());
			dispatch(deleteMessageSuccessLoad());
		}
	});

	if (isError) {
		return (
			<>
				<BadRequestError />
			</>
		);
	} else {
		return (
			<div className='wrapper-main-container'>
				<div className='common-search-btn-container'>
					<div className='btn-add-truck-container'>
						<Button
							text={user === 'DRIVER' ? t(addTruckButton) : t(addLoadButton)}
							style={stylesBtnCreateTruckLoad}
							onClick={() => {
								modal.open();
							}}
						/>
					</div>
					<SearchBar filterCards={filterCards} />
				</div>
				<div className='main-header-table-container'>
					<div className='header-table-container'>
						{user === 'DRIVER' && (
							<>
								<div className='table-header'>{t(typeTruck)}</div>
								<div className='table-header'>{t(status)}</div>
								<div className='table-header'>{t(assignedTo)}</div>
								<div className='table-header'>{t(createdDate)}</div>
							</>
						)}
						{user === 'SHIPPER' && (
							<>
								<div className='table-header'>{t(loadName)}</div>
								<div className='table-header'>{t(pickupAddress)}</div>
								<div className='table-header'>{t(deliveryAddress)}</div>
								<div className='table-header'>{t(createdDate)}</div>
								<div className='table-header'>{t(status)}</div>
								<div className='table-header'></div>
							</>
						)}
					</div>
					{items.length > 0 && (
						<div className='header-table-items-container'>
							{searchValue
								? items
										.filter((item: any) => {
											return user === 'DRIVER'
												? item.type
														.toLowerCase()
														.includes(searchValue.toLowerCase())
												: item.name
														.toLowerCase()
														.includes(searchValue.toLowerCase());
										})
										.map((mockedTruck: TruckCardModel & LoadCardModel) => (
											<Card list={mockedTruck} key={mockedTruck._id} />
										))
								: items.map((mockedTruck: TruckCardModel & LoadCardModel) => (
										<Card list={mockedTruck} key={mockedTruck._id} />
								  ))}
						</div>
					)}
					{items.length === 0 && (
						<div className='text-items-container'>
							{t(emptyTrucksLoads)}{' '}
							{user === 'DRIVER' ? t(trucksText) : t(loadsText)} {''}
							{t(yet)}.
						</div>
					)}
				</div>
				{modal.value && (
					<Modal title='Create new product' onClose={modal.close}>
						<CreateCard onClose={modal.close} />
					</Modal>
				)}

				<Outlet />
			</div>
		);
	}
};

export default Main;
