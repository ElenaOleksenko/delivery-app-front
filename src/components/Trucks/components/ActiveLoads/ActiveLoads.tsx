import { ThunkDispatch } from '@reduxjs/toolkit';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../../../helpers';
import {
	deleteAlertAssignedLoadForShipper,
	deleteMessageSuccessLoad,
	deleteResponseDriverFound,
	deleteStatusErrorLoad,
	getActiveLoadShipper,
	updateIfReadLoadByShipper,
} from '../../../../store/user/loadSlice';
import {
	deleteActiveLoadDriver,
	deleteAlertAssignedLoad,
	deleteErrorGetTrucks,
	deleteMessageSuccessTruck,
	getActiveLoadsForDriver,
	updateIfReadLoad,
} from '../../../../store/user/truckSlice';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import './ActiveLoads.css';
import GoBack from '../../../../common/GoBack/GoBack';
import { emptyActiveLoads } from '../../../../constants';
import { useTranslation } from 'react-i18next';
import ActiveLoadElement from './activeLoadElement/ActiveLoadElement';
import BadRequestError from '../../../../common/Error/BadRequestError';
import { LoadCardModel } from '../../Model';

const ActiveLoads = () => {
	const { activeLoadDriver, isErrorTrucks } = useSelector(
		(state: any) => state.truck
	);
	const {
		activeLoadShipper,
		isErrorLoads,
		errorMessage,
		responseDriverFound,
		isLoadArchive,
	} = useSelector((state: any) => state.load);

	let successMessageLoad = useSelector(
		(state: any) => state.load.successMessage
	);
	let successMessageTruck = useSelector(
		(state: any) => state.truck.successMessage
	);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const user: any = useSelector((state: any) => state.user.role);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { t } = useTranslation();
	let successMessageCommon: string;
	let item: any;
	let itemArrivedToDelivery: any;
	if (user === 'DRIVER') {
		successMessageCommon = successMessageTruck;
	} else {
		successMessageCommon = successMessageLoad;
	}
	let commonState: any;
	let stateFromLocalStorage = localStorage.getItem('state');
	if (stateFromLocalStorage !== null) {
		commonState = JSON.parse(stateFromLocalStorage);
	}

	const handleClickSnackbar = () => {
		setOpenSnackbar(true);
	};

	const handleCloseSnackbar = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		isErrorLoads || isErrorTrucks
			? dispatch(deleteStatusErrorLoad()) && deleteErrorGetTrucks()
			: dispatch(deleteMessageSuccessLoad()) &&
			  dispatch(deleteMessageSuccessTruck());
		setOpenSnackbar(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size='medium'
				aria-label='close'
				color='inherit'
				onClick={handleCloseSnackbar}
			>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	useEffect(() => {
		if (user === 'DRIVER' && isEmpty(activeLoadDriver)) {
			dispatch(getActiveLoadsForDriver());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (user === 'SHIPPER' && isEmpty(activeLoadShipper.load)) {
			dispatch(getActiveLoadShipper());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (
			user === 'SHIPPER' &&
			responseDriverFound &&
			isEmpty(activeLoadShipper.load)
		)
			dispatch(deleteResponseDriverFound());
	}, [responseDriverFound, user, dispatch, activeLoadShipper]);

	useEffect(() => {
		if (
			user === 'DRIVER' &&
			activeLoadDriver !== null &&
			activeLoadDriver.state === 'Arrived to delivery'
		) {
			handleClickSnackbar();
			dispatch(deleteActiveLoadDriver());
		}
	}, [user, activeLoadDriver, dispatch]);

	useEffect(() => {
		if (
			user === 'DRIVER' &&
			activeLoadDriver !== null &&
			activeLoadDriver.readByDriver === false
		) {
			dispatch(updateIfReadLoad());
		} else if (
			user === 'SHIPPER' &&
			activeLoadShipper.loadArrivedToDelivery.find((element: any) => {
				if (element.readByShipper === false) {
					return true;
				} else {
					return false;
				}
			})
		) {
			dispatch(updateIfReadLoadByShipper());
		}
	}, [user, activeLoadDriver, activeLoadShipper, dispatch]);

	useEffect(() => {
		if (
			user === 'DRIVER' &&
			isEmpty(activeLoadDriver) === false &&
			activeLoadDriver.readByDriver === true
		) {
			dispatch(deleteAlertAssignedLoad());
		} else if (
			user === 'SHIPPER' &&
			activeLoadShipper.loadArrivedToDelivery.find((element: LoadCardModel) => {
				return element.readByShipper === false;
			}) === undefined
		) {
			dispatch(deleteAlertAssignedLoadForShipper());
		}
	}, [user, activeLoadShipper, activeLoadDriver, dispatch]);

	useEffect(() => {
		if (
			user === 'SHIPPER' &&
			successMessageCommon.length > 0 &&
			isLoadArchive === true
		) {
			console.log('archive');
			handleClickSnackbar();
		}
	}, [user, successMessageCommon, isLoadArchive]);

	const stylesHeight = useMemo(() => {
		return {
			height:
				(user === 'DRIVER' && isEmpty(activeLoadDriver)) ||
				(user === 'SHIPPER' &&
					activeLoadShipper.assignedLoad.length === 0 &&
					activeLoadShipper.loadArrivedToDelivery.length === 0)
					? '100vh'
					: 'auto',
		};
	}, [activeLoadDriver, activeLoadShipper, user]);
	if (
		user === 'DRIVER' &&
		isEmpty(activeLoadDriver) === false &&
		isEmpty(commonState.truck.activeLoadDriver)
	) {
		item = activeLoadDriver;
	} else if (
		user === 'DRIVER' &&
		isEmpty(activeLoadDriver) === false &&
		isEmpty(commonState.truck.activeLoadDriver) === false
	) {
		item = commonState.truck.activeLoadDriver;
	} else if (
		user === 'SHIPPER' &&
		activeLoadShipper.assignedLoad.length > 0 &&
		activeLoadShipper.loadArrivedToDelivery.length === 0
	) {
		item = activeLoadShipper.assignedLoad;
	} else if (
		user === 'SHIPPER' &&
		activeLoadShipper.assignedLoad.length > 0 &&
		activeLoadShipper.loadArrivedToDelivery.length > 0
	) {
		item = activeLoadShipper.assignedLoad;
		itemArrivedToDelivery = activeLoadShipper.loadArrivedToDelivery;
	} else if (
		user === 'SHIPPER' &&
		activeLoadShipper.assignedLoad.length === 0 &&
		activeLoadShipper.loadArrivedToDelivery.length > 0
	) {
		item = activeLoadShipper.loadArrivedToDelivery;
		itemArrivedToDelivery = activeLoadShipper.loadArrivedToDelivery;
	} else {
		item = {};
	}

	if (isErrorTrucks) {
		return (
			<>
				<BadRequestError />
			</>
		);
	} else {
		return (
			<>
				<div className='active-load-box' style={stylesHeight}>
					<GoBack />
					{(isEmpty(item) ||
						(user === 'DRIVER' && item.state === 'Arrived to delivery')) && (
						<div className='container-active-load'>{t(emptyActiveLoads)}</div>
					)}
					<div className='active-shipper-load-box'>
						{user === 'SHIPPER' &&
							activeLoadShipper.loadArrivedToDelivery.length !== 0 &&
							itemArrivedToDelivery.map((item: any) => {
								return <ActiveLoadElement item={item} key={item._id} />;
							})}
						{user === 'SHIPPER' &&
							activeLoadShipper.assignedLoad.length !== 0 &&
							item.map((item: any) => {
								return <ActiveLoadElement item={item} key={item._id} />;
							})}
					</div>
					<div className='active-driver-load-box'>
						{user === 'DRIVER' && isEmpty(activeLoadDriver) === false && (
							<ActiveLoadElement item={item} key={item._id} />
						)}
					</div>

					<Snackbar
						open={openSnackbar}
						autoHideDuration={6000}
						onClose={handleCloseSnackbar}
						message={
							isErrorLoads || isErrorTrucks
								? errorMessage
								: successMessageCommon
						}
						action={action}
						ContentProps={{
							sx: {
								background:
									isErrorLoads || isErrorTrucks
										? 'rgb(250, 112, 153)'
										: 'rgb(219, 165, 17)',
								width: '90vh',
							},
						}}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
					/>
				</div>
			</>
		);
	}
};

export default ActiveLoads;
