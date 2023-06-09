import { useState, useMemo } from 'react';
import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import './Registration.css';
import {
	active,
	cancel,
	emailError,
	emailInvalidError,
	isDisabled,
	passwordError,
	passwordLengthError,
	registrationEmailField,
	registrationPasswordField,
	registrationRoleField,
	registrationUserNameField,
	roleError,
	styleBtnForgotPassCancel,
	styleLogin,
	submit,
	userNameError,
	userNameLengthError,
} from '../../constants';
import { useTranslation } from 'react-i18next';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLock,
	faEnvelope,
	faEyeSlash,
	faEye,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../hooks/use-hooks';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { deleteStatusError, registration } from '../../store/user/userSlice';
import BadRequestError from '../../common/Error/BadRequestError';

function Registration() {
	const username = useInput('', { isEmpty: true, minLength: 3 });
	const email = useInput('', {
		isEmpty: true,
		isEmail: true,
	});
	const password = useInput('', { isEmpty: true, minLength: 6 });
	const role = useInput('', { isEmpty: true });
	const [type, setType] = useState('password');
	const [isShowPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { statusRegistration, errorMessage } = useSelector(
		(state: any) => state.user
	);

	const errorMessageUserExsist = useMemo(() => {
		return {
			color: errorMessage.errorStatus === 400 ? 'rgb(250, 112, 153)' : '',
			fontSize: '.9em',
		};
	}, [errorMessage]);

	const togglePassInput = (e: any) => {
		if (type === 'password') {
			setType('text');
			setShowPassword(true);
		} else {
			setType('password');
			setShowPassword(false);
		}
	};

	const enterRegistration = (
		username: any,
		email: any,
		password: any,
		role: any
	) => {
		const credentials = {
			username: username.value,
			email: email.value,
			password: password.value,
			role: role.value,
		};
		dispatch(registration(credentials));
	};

	const errorRegistration = () => {
		setTimeout(() => {
			dispatch(deleteStatusError(''));
		}, 5000);
		return (
			errorMessage.errorStatus === 400 && (
				<div style={errorMessageUserExsist}>{errorMessage.errorMessage}</div>
			)
		);
	};
	if (errorMessage.length > 0) {
		return (
			<>
				<BadRequestError />
			</>
		);
	} else {
		if (statusRegistration === 0) {
			return (
				<>
					<div className='wrapper-registration-container'>
						<div className='registration-container'>
							<form
								className='registration-form'
								onSubmit={(e) => {
									e.preventDefault();
									enterRegistration(username, email, password, role);
								}}
							>
								<h2>{t('Registration')}</h2>
								<div className='wrapper-password-input-container'>
									<span className='icon-username-container'>
										<FontAwesomeIcon icon={faUser} className='email-icon' />
									</span>
									<Input
										placeholder={t(registrationUserNameField)}
										value={username.value}
										type='text'
										onChange={(e: any) => username.onChange(e)}
										style={styleLogin}
										onBlur={(e: any) => username.onBlur(e)}
									/>
									<span className='icon-password-show-container'>
										<FontAwesomeIcon
											icon={faUser}
											className='email-icon-hide'
										></FontAwesomeIcon>
									</span>
								</div>
								<div>
									{username.isDirty && username.isEmpty && (
										<div className='error-registration'>{t(userNameError)}</div>
									)}
								</div>
								{username.isDirty && username.minLengthError && (
									<div className='error-registration'>
										{t(userNameLengthError)}
									</div>
								)}

								<div className='wrapper-email-input-container'>
									<span className='icon-email-container'>
										<FontAwesomeIcon
											icon={faEnvelope}
											className='email-icon'
										></FontAwesomeIcon>
									</span>
									<Input
										placeholder={t(registrationEmailField)}
										value={email.value}
										type='text'
										onChange={(e: any) => email.onChange(e)}
										style={styleLogin}
										onBlur={(e: any) => email.onBlur(e)}
									/>
									<span className='wrapper-password-show-container'>
										<FontAwesomeIcon
											icon={faLock}
											className='email-icon-hide'
										></FontAwesomeIcon>
									</span>
								</div>
								{email.isDirty && email.isEmpty && (
									<div className='error-registration'>{t(emailError)}</div>
								)}
								{email.isDirty && email.emailError && (
									<div className='error-registration'>
										{t(emailInvalidError)}
									</div>
								)}
								{errorMessage.errorStatus === 400 && errorRegistration()}
								<div className='wrapper-password-input-container'>
									<span className='icon-password-container'>
										<FontAwesomeIcon
											icon={faLock}
											className='password-icon'
										></FontAwesomeIcon>
									</span>
									<Input
										placeholder={t(registrationPasswordField)}
										style={styleLogin}
										value={password.value}
										onChange={(e: any) => password.onChange(e)}
										onBlur={(e: any) => password.onBlur(e)}
										type={type}
									/>
									<span
										className='wrapper-password-show-container'
										onClick={togglePassInput}
									>
										{isShowPassword ? (
											<FontAwesomeIcon
												icon={faEyeSlash}
												className='email-icon'
											></FontAwesomeIcon>
										) : (
											<FontAwesomeIcon
												icon={faEye}
												className='email-icon'
											></FontAwesomeIcon>
										)}
									</span>
								</div>
								{password.isDirty && password.isEmpty && (
									<div className='error-registration'>{t(passwordError)}</div>
								)}
								{password.isDirty && password.minLengthError && (
									<div className='error-registration'>
										{t(passwordLengthError)}
									</div>
								)}
								<div>
									<FormControl
										variant='standard'
										sx={{
											m: 1,
											minWidth: '46.5vh',
											borderBottom: '0.1vh solid lightgrey',
											margin: '1vh 0 0 0',
											'& .MuiInputBase-input: focus': {
												backgroundColor: 'white',
											},
											'& .MuiInputBase-root: after': {
												borderBottom: '.2vh solid rgb(254, 202, 62)',
											},
											'& .MuiInput-underline:hover:not(.Mui-disabled):before': {
												borderColor: 'rgb(254, 202, 62)',
												borderWidth: '.1vh',
											},
											'& .MuiFormLabel-root.Mui-focused': {
												color: 'rgb(254, 202, 62)',
											},
											'& .MuiFormLabel-root': {
												color: '#7f9abb',
											},
											'& .MuiSelect-select': { color: '#7f9abb' },
											'& .MuiSvgIcon-root': { color: '#7f9abb' },
										}}
									>
										<InputLabel id='demo-simple-select-standard-label'>
											{t(registrationRoleField)}
										</InputLabel>
										<Select
											labelId='demo-simple-select-standard-label'
											id='demo-simple-select-standard'
											value={role.value}
											onChange={(e: any) => role.onChange(e)}
											onBlur={(e: any) => role.onBlur(e)}
											label='Role'
										>
											<MenuItem className='MenuItem' value=''>
												<em>None</em>
											</MenuItem>
											<MenuItem
												className='MenuItem'
												onMouseEnter={(e: any) =>
													(e.target.style.backgroundColor = '#e7effb')
												}
												onMouseLeave={(e: any) =>
													(e.target.style.backgroundColor = '#ffffff')
												}
												value={'SHIPPER'}
											>
												SHIPPER
											</MenuItem>
											<MenuItem
												className='MenuItem'
												value={'DRIVER'}
												onMouseEnter={(e: any) =>
													(e.target.style.backgroundColor = '#e7effb')
												}
												onMouseLeave={(e: any) =>
													(e.target.style.backgroundColor = '#ffffff')
												}
											>
												DRIVER
											</MenuItem>
										</Select>
									</FormControl>
									{role.isDirty && role.isEmpty && (
										<div className='error-registration'>{t(roleError)}</div>
									)}
								</div>
								<div className='button-register-password-container'>
									<Button
										type='submit'
										text={t(submit)}
										disabled={
											!username.isInputValid ||
											!email.isInputValid ||
											!password.isInputValid ||
											!role.isInputValid
										}
										style={
											username.isInputValid &&
											email.isInputValid &&
											password.isInputValid &&
											role.isInputValid
												? active
												: isDisabled
										}
									/>
									<Button
										type='submit'
										text={t(cancel)}
										style={styleBtnForgotPassCancel}
										onClick={(): void => navigate('/')}
									/>
								</div>
							</form>
						</div>
					</div>
				</>
			);
		} else {
			return (
				<div className='text-container'>
					<div className='registration-text-container'>
						You have successfully registered
					</div>
					<div className='link-container'>
						<Link className='link' to={'/'}>
							{t('Go to Login page')}
						</Link>
					</div>
				</div>
			);
		}
	}
}

export default Registration;
