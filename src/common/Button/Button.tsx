import React from 'react';
import { IPropsButton } from '../../components/Trucks/Model';
import './Button.css';

export const Button = ({
	text,
	onClick,
	type,
	id,
	style,
	disabled,
	onSubmit,
	onMouseOver,
	onMouseLeave,
}: IPropsButton) => {
	return (
		<>
			<button
				className='logout-button'
				onClick={onClick}
				type={type}
				id={id}
				style={style}
				disabled={disabled}
				onSubmit={onSubmit}
				onMouseOver={onMouseOver}
				onMouseLeave={onMouseLeave}
			>
				{text}
			</button>
		</>
	);
};
