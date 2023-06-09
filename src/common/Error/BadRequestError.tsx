import { ThunkDispatch } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { styleButtonErrorBack, styleButtonErrorHome } from '../../constants';
import { deleteStatusLoadsError } from '../../store/user/loadSlice';
import { deleteStatusError } from '../../store/user/userSlice';
import { Button } from '../Button/Button';
import './BadRequestError.css';
import { deleteErrorGetTrucks } from '../../store/user/truckSlice';

const BadRequestError = () => {
	const navigate = useNavigate();
	const { errorMessage, isError } = useSelector((state: any) => state.user);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { isErrorLoads } = useSelector((state: any) => state.load);
	const { isErrorTrucks } = useSelector((state: any) => state.truck);
	const errorMessageTruck = useSelector(
		(state: any) => state.truck.errorMessage
	);

	return (
		<>
			<div className='wrapper-error-container'>
				<div className='error-container'>
					<div className='error-text-container'>
						<h2>BAD REQUEST</h2>
						{isError && <div>{errorMessage}</div>}
						{isErrorTrucks && <div>{errorMessageTruck}</div>}
					</div>
					<div className='button-container'>
						{isError && (
							<Button
								text='Back'
								type='submit'
								style={styleButtonErrorBack}
								onClick={() => {
									navigate(-1);
									dispatch(deleteStatusError(''));
								}}
							/>
						)}
						<Button
							text='Home'
							type='submit'
							style={styleButtonErrorHome}
							onClick={() => {
								dispatch(deleteStatusError(''));
								dispatch(deleteStatusLoadsError(''));
								dispatch(deleteErrorGetTrucks());
								if (isError) {
									navigate('/');
								}
								if (isErrorLoads || isErrorTrucks) {
									navigate('/main-page');
								}
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default BadRequestError;
