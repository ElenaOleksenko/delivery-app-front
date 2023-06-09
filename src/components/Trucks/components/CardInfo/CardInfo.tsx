import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { LoadCardModel, TruckCardModel } from '../../Model';
import './CardInfo.css';
import GoBack from '../../../../common/GoBack/GoBack';
import { useTranslation } from 'react-i18next';
import {
	assignTruckText,
	createdDate,
	deliveryAddressText,
	dimensionsText,
	heightText,
	lengthText,
	loadId,
	loadName,
	payloadText,
	pickupAddressText,
	StateText,
	status,
	typeTextLabel,
	userInfo,
	widthText,
} from '../../../../constants';

const CardInfo = () => {
	const idCard = useParams();
	const trucks = useSelector((state: any) => state.truck.trucks);
	const loads = useSelector((state: any) => state.load.loads);
	const { t } = useTranslation();
	const { role } = useSelector((state: any) => state.user);
	let cardInfoCurrent;
	role === 'DRIVER'
		? (cardInfoCurrent = trucks.find((truck: TruckCardModel) => {
				return truck._id === idCard.id?.slice(1);
		  }))
		: (cardInfoCurrent = loads.find((load: LoadCardModel) => {
				return load._id === idCard.id?.slice(1);
		  }));

	const styleInfoContainer = useMemo(() => {
		return {
			height: role === 'DRIVER' ? '100vh' : 'auto',
		};
	}, [role]);

	return (
		<>
			<div className='card-info-container' style={styleInfoContainer}>
				<GoBack />
				{role === 'DRIVER' && (
					<>
						<div className='card-info'>
							<p className='table-header'>{t(userInfo)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.created_by}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(typeTextLabel)}</p>
							<p className='table-container-item'>{cardInfoCurrent.type}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(assignTruckText)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.assigned_to}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(status)}</p>
							<p className='table-container-item'>{cardInfoCurrent.status}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(createdDate)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.createdDate}
							</p>
						</div>
					</>
				)}
				{role === 'SHIPPER' && (
					<>
						<div className='card-info'>
							<p className='table-header'>{t(loadId)}</p>
							<p className='table-container-item'>{cardInfoCurrent._id}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(status)}</p>
							<p className='table-container-item'>{cardInfoCurrent.status}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(StateText)}</p>
							<p className='table-container-item'>{cardInfoCurrent.state}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(userInfo)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.created_by}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(loadName)}</p>
							<p className='table-container-item'>{cardInfoCurrent.name}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(payloadText)}</p>
							<p className='table-container-item'>{cardInfoCurrent.payload}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(pickupAddressText)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.pickup_address}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(deliveryAddressText)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.delivery_address}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(dimensionsText)}:</p>
							<p className='table-container-item'>{}</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(widthText)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.dimensions.width}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(lengthText)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.dimensions.length}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(heightText)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.dimensions.height}
							</p>
						</div>
						<div className='card-info'>
							<p className='table-header'>{t(createdDate)}</p>
							<p className='table-container-item'>
								{cardInfoCurrent.createdDate}
							</p>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default CardInfo;
