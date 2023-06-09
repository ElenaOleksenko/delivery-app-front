import { useEffect } from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../common/Button/Button';
import BadRequestError from '../../../../common/Error/BadRequestError';
import { deleteResponseDriverFound } from '../../../../store/user/loadSlice';
import './SearchTruckResponse.css';

const SearchTruckResponse = () => {
	const user: any = useSelector((state: any) => state.user.role);
	const {
		isErrorLoads,
		loadTruckWasFound,
		responseDriverFound,
		activeLoadShipper,
	} = useSelector((state: any) => state.load);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const navigate = useNavigate();

	useEffect(() => {
		if (
			user === 'SHIPPER' &&
			responseDriverFound &&
			(activeLoadShipper.assignedLoad.length === 0 ||
				activeLoadShipper.loadArrivedToDelivery.length === 0)
		)
			dispatch(deleteResponseDriverFound());
	}, [responseDriverFound, user, activeLoadShipper, dispatch]);

	const styleGoToMainPage = {
		marginLeft: '15vh',
		width: '18vh',
	};
	if (isErrorLoads) {
		return (
			<>
				<BadRequestError />
			</>
		);
	} else {
		return (
			<>
				<div className='search-truck-response-box'>
					<ul className='search-truck-response-list-box'>
						<li className='search-truck-response-list-item-message'>
							{typeof loadTruckWasFound !== 'string'
								? loadTruckWasFound.logs[0].message
								: loadTruckWasFound}
						</li>
						<div className='search-truck-response-list-item-box'>
							<li className='search-truck-response-list-item'>load ID</li>
							<li className='search-truck-response-list-item'>
								{loadTruckWasFound._id}
							</li>
						</div>
						<div className='search-truck-response-list-item-box'>
							<li className='search-truck-response-list-item'>load name</li>
							<li className='search-truck-response-list-item'>
								{loadTruckWasFound.name}
							</li>
						</div>
					</ul>
					<Button
						text='Back to main page'
						style={styleGoToMainPage}
						onClick={() => {
							dispatch(deleteResponseDriverFound());
							navigate('/main-page');
						}}
					/>
				</div>
			</>
		);
	}
};

export default SearchTruckResponse;
