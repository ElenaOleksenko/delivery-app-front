import { ThunkDispatch } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../../common/Button/Button';
import './ActiveLoadElement.css';
import {
	changeNextStateBtn,
	createdDate,
	deliveryAddressText,
	dimensionsText,
	heightText,
	lengthText,
	loadId,
	loadName,
	payloadText,
	pickupAddressText,
	pickUpLoadBtn,
	StateText,
	styleBtnChangeNextState,
	userInfo,
	widthText,
} from '../../../../../constants';
import { archiveLoad } from '../../../../../store/user/loadSlice';
import { changeLoadState } from '../../../../../store/user/truckSlice';
import { isEmpty } from '../../../../../helpers';

const ActiveLoadElement = ({ item }: any) => {
	const user: any = useSelector((state: any) => state.user.role);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { t } = useTranslation();

	return (
		<div className='active-load-card-info-box'>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(StateText)}</p>
				<p className='active-load-table-container-item'>{item.state}</p>
				{user === 'SHIPPER' && item.state === 'Arrived to delivery' && (
					<Button
						text={t(pickUpLoadBtn)}
						style={styleBtnChangeNextState}
						onClick={() => {
							dispatch(archiveLoad(item._id));
						}}
					/>
				)}
				{user === 'DRIVER' && isEmpty(item) === false && (
					<Button
						text={t(changeNextStateBtn)}
						style={styleBtnChangeNextState}
						onClick={() => {
							dispatch(changeLoadState());
						}}
					/>
				)}
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(loadName)}</p>
				<p className='active-load-table-container-item'>{item.name}</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(loadId)}</p>
				<p className='active-load-table-container-item'>{item._id}</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>
					{user === 'SHIPPER' ? 'Driver' : 'Shipper'}
				</p>
				<p className='active-load-table-container-item'>
					{user === 'SHIPPER'
						? item.logs[0].message
						: `Shipper id, who created the load ${item.created_by}`}
				</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(payloadText)}</p>
				<p className='active-load-table-container-item'>{item.payload}</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(pickupAddressText)}</p>
				<p className='active-load-table-container-item'>
					{item.pickup_address}
				</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(deliveryAddressText)}</p>
				<p className='table-container-item'>{item.delivery_address}</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(userInfo)}</p>
				<p className='table-container-item'>{item.created_by}</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(dimensionsText)}:</p>
				<p className='table-container-item'>{}</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(widthText)}</p>
				<p className='table-container-item'>
					{item.dimensions !== undefined ? item.dimensions.width : null}
				</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(heightText)}</p>
				<p className='table-container-item'>
					{item.dimensions !== undefined ? item.dimensions.height : null}
				</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(lengthText)}</p>
				<p className='table-container-item'>
					{item.dimensions !== undefined ? item.dimensions.length : null}
				</p>
			</div>
			<div className='active-load-card-info'>
				<p className='active-load-table-header'>{t(createdDate)}</p>
				<p className='table-container-item'>{item.createdDate}</p>
			</div>
		</div>
	);
};

export default ActiveLoadElement;
