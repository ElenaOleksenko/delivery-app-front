import './ArchiveLoads.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { getArchiveLoad } from '../../../../store/user/loadSlice';
import GoBack from '../../../../common/GoBack/GoBack';
import { LoadCardModel } from '../../Model';
import { useTranslation } from 'react-i18next';
import {
	assignedTo,
	createdDate,
	deliveryAddressText,
	heightText,
	lengthText,
	loadName,
	payloadText,
	pickupAddressText,
	status,
	widthText,
} from '../../../../constants';

const ArchiveLoads = () => {
	const user: any = useSelector((state: any) => state.user.role);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { t } = useTranslation();
	const archiveLoads: any = useSelector(
		(state: any) => state.load.archiveLoads
	);
	useEffect(() => {
		if (user === 'SHIPPER') {
			dispatch(getArchiveLoad());
		}
	}, [user, dispatch]);
	return (
		<div className='archive-load-box'>
			<GoBack />
			<div className='main-archive-table-container'>
				<div className='header-table-archive-container'>
					<div className='table-header-elements'>{t(loadName)}</div>
					<div className='table-header-elements'>{t(assignedTo)}</div>
					<div className='table-header-elements'>{t(pickupAddressText)}</div>
					<div className='table-header-elements'>{t(deliveryAddressText)}</div>
					<div className='table-header-elements'>{t(createdDate)}</div>
					<div className='table-header-elements'>{t(status)}</div>
					<div className='table-header-elements'>{t(payloadText)}</div>
					<div className='table-header-elements'>{t(heightText)}</div>
					<div className='table-header-elements'>{t(widthText)}</div>
					<div className='table-header-elements'>{t(lengthText)}</div>
				</div>
				{archiveLoads.map((mockedLoad: LoadCardModel) => (
					<div className='box-loads-elements' key={mockedLoad._id}>
						<div className='table-elements'>{mockedLoad.name}</div>
						<div className='table-elements'>{mockedLoad.assigned_to}</div>
						<div className='table-elements'>{mockedLoad.pickup_address}</div>
						<div className='table-elements'>{mockedLoad.delivery_address}</div>
						<div className='table-elements'>{mockedLoad.createdDate}</div>
						<div className='table-elements'>{mockedLoad.status}</div>
						<div className='table-elements'>{mockedLoad.payload}</div>
						<div className='table-elements'>{mockedLoad.dimensions.height}</div>
						<div className='table-elements'>{mockedLoad.dimensions.width}</div>
						<div className='table-elements'>{mockedLoad.dimensions.length}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default ArchiveLoads;
