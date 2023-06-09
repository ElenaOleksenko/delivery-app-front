import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropsI } from '../../Model';
import './Card.css';
import { formatDate } from '../../../../helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPen,
	faTrash,
	faEye,
	faTruck,
} from '@fortawesome/free-solid-svg-icons';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
	deleteLoad,
	deleteMessageSuccessLoad,
	deleteStatusErrorLoad,
	searchTruckLoad,
} from '../../../../store/user/loadSlice';
import {
	assignTruck,
	deleteErrorGetTrucks,
	deleteMessageSuccessTruck,
	deleteStatusErrorTruck,
	deleteTruck,
} from '../../../../store/user/truckSlice';
import { useModal } from '../../../../hooks/use-hooks';
import { Modal } from '../Modal/Modal';
import { CreateCard } from '../CreateCard/CreateCard';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {
	assignTruckText,
	deleteText,
	details,
	truckSearch,
	update,
} from '../../../../constants';
import { useTranslation } from 'react-i18next';

const Card = ({ list }: PropsI) => {
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { role, email } = useSelector((state: any) => state.user);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const modal = useModal();
	let errorMessageLoad = useSelector((state: any) => state.load.errorMessage);
	let errorMessageTruck = useSelector((state: any) => state.truck.errorMessage);
	let successMessageLoad = useSelector(
		(state: any) => state.load.successMessage
	);
	let successMessageTruck = useSelector(
		(state: any) => state.truck.successMessage
	);
	let errorMessageCommon;
	let successMessageCommon: any;

	const { isErrorAssignTruck, isErrorTrucks } = useSelector(
		(state: any) => state.truck
	);
	const { isErrorLoads } = useSelector((state: any) => state.load);

	if (role === 'DRIVER') {
		errorMessageCommon = errorMessageTruck;
		successMessageCommon = successMessageTruck;
	} else {
		errorMessageCommon = errorMessageLoad;
		successMessageCommon = successMessageLoad;
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
		if (isErrorAssignTruck || isErrorLoads || isErrorTrucks) {
			dispatch(deleteStatusErrorTruck()) &&
				dispatch(deleteErrorGetTrucks()) &&
				dispatch(deleteStatusErrorLoad());
		}
		if (successMessageCommon) {
			dispatch(deleteMessageSuccessTruck()) &&
				dispatch(deleteMessageSuccessLoad());
		}

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

	const deleteItem = (id: string) => {
		role === 'DRIVER' ? dispatch(deleteTruck(id)) : dispatch(deleteLoad(id));
		handleClickSnackbar();
	};

	const assignItem = (id: string) => {
		dispatch(assignTruck(id));
		handleClickSnackbar();
	};

	return (
		<div className='table-container'>
			{role === 'DRIVER' && (
				<>
					<div className='table-container-item'>{list.type}</div>
					<div className='table-container-item'>{list.status}</div>
					{list.assigned_to === null && (
						<div className='table-container-item'>{''}</div>
					)}
					{list.assigned_to !== null && (
						<div className='table-container-item'>{email}</div>
					)}
					<div className='table-container-item'>
						{formatDate(list.createdDate)}
					</div>
				</>
			)}
			{role === 'SHIPPER' && (
				<>
					<div className='table-container-item'>{list.name}</div>
					<div className='table-container-item-pickup'>
						{list.pickup_address}
					</div>
					<div className='table-container-item-delivery'>
						{list.delivery_address}
					</div>
					<div className='table-container-item'>
						{formatDate(list.createdDate)}
					</div>
					<div className='table-container-item'>{list.status}</div>
				</>
			)}

			<div className='item-icon-container'>
				<div className='table-container-item'>
					<Tooltip title={t(update)}>
						<FontAwesomeIcon
							icon={faPen}
							className='item-icon'
							onClick={() => {
								modal.openUpdateModal(list);
							}}
							data-testid='update-icon'
						/>
					</Tooltip>
				</div>
				<div className='table-container-item'>
					<Tooltip title={t(deleteText)}>
						<FontAwesomeIcon
							icon={faTrash}
							className='item-icon'
							onClick={() => deleteItem(list._id)}
							data-testid='delete-icon'
						/>
					</Tooltip>
				</div>
				<div className='table-container-item'>
					<Tooltip title={t(details)}>
						<FontAwesomeIcon
							data-testid='eye'
							icon={faEye}
							className='item-icon'
							onClick={() => navigate(`info/:${list._id}`)}
						/>
					</Tooltip>
				</div>
				{role === 'DRIVER' && (
					<div className='table-container-item'>
						<Tooltip title={t(assignTruckText)}>
							<FontAwesomeIcon
								icon={faTruck}
								className='item-icon'
								onClick={() => assignItem(list._id)}
							/>
						</Tooltip>
					</div>
				)}
				{role === 'SHIPPER' && (
					<div className='table-container-item'>
						<Tooltip title={t(truckSearch)}>
							<FontAwesomeIcon
								icon={faTruck}
								className='item-icon'
								onClick={() => {
									dispatch(searchTruckLoad(list._id));
								}}
							/>
						</Tooltip>
					</div>
				)}
				<Snackbar
					open={openSnackbar}
					autoHideDuration={6000}
					onClose={handleCloseSnackbar}
					message={
						isErrorAssignTruck || isErrorLoads || isErrorTrucks
							? errorMessageCommon
							: successMessageCommon
					}
					action={action}
					ContentProps={{
						sx: {
							background:
								isErrorAssignTruck || isErrorLoads || isErrorTrucks
									? 'rgb(250, 112, 153)'
									: successMessageCommon
									? 'rgb(219, 165, 17)'
									: 'none',
							boxShadow:
								!isErrorAssignTruck ||
								!isErrorLoads ||
								!isErrorTrucks ||
								!successMessageCommon
									? 'none'
									: '',
							width: '90vh',
						},
					}}
					anchorOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
				/>
			</div>

			{modal.value && (
				<Modal title='Create new product' onClose={modal.close}>
					<CreateCard
						onClose={modal.close}
						type={modal.type}
						id={modal.idValue}
						name={modal.name}
						payload={modal.payload}
						pickup_address={modal.pickup_address}
						delivery_address={modal.delivery_address}
						width={modal.width}
						length={modal.length}
						height={modal.height}
					/>
				</Modal>
			)}
		</div>
	);
};
export default Card;
