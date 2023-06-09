import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { valuesDriver, valuesShipper } from '../../../../constants';
import { ModalPropsI } from '../../Model';
import './Modal.css';

export function Modal({ children, onClose }: ModalPropsI) {
	const [height, setHeight] = useState({});
	const user: any = useSelector((state: any) => state.user.role);

	useEffect(() => {
		user === 'DRIVER' ? setHeight(valuesDriver) : setHeight(valuesShipper);
	}, [user]);

	return (
		<>
			<div
				className='wrapper-container'
				onClick={() => {
					onClose();
				}}
			/>
			<div className='modal-container' style={height}>
				{children}
			</div>
		</>
	);
}
