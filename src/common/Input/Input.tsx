import './Input.css';
interface InputComponentProps {
	placeholder: string;
	style?: object;
	onChange?: any;
	text?: any;
	value?: string;
	type?: string;
	onBlur?: any;
	onFocus?: any;
	id?: string;
}
function Input({
	onChange,
	placeholder,
	value,
	style,
	text,
	type,
	onBlur,
	onFocus,
	id,
}: InputComponentProps) {
	return (
		<>
			<div className='input-label-container'>
				<label htmlFor='text'>{text}</label>
				<input
					onChange={onChange}
					placeholder={placeholder}
					value={value}
					style={style}
					type={type}
					onBlur={onBlur}
					onFocus={onFocus}
					id={id}
				/>
			</div>
		</>
	);
}

export default Input;
