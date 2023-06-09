import { useState, useEffect, useCallback } from 'react';
import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import {
	active,
	buttonLogin,
	emailError,
	emailInvalidError,
	isDisabled,
	passwordError,
	passwordLengthError,
	registrationEmailField,
	registrationPasswordField,
	registrationUserNameField,
	styleLogin,
	userNameError,
	userNameLengthError,
} from '../../constants';
import { useTranslation } from 'react-i18next';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faLock,
	faEnvelope,
	faEyeSlash,
	faEye,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import {
	deleteStatusRegistration,
	deleteStatusReset,
	deleteStatusRestore,
	login,
} from '../../store/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useInput } from '../../hooks/use-hooks';
import BadRequestError from '../../common/Error/BadRequestError';
import { deleteErrorGetTrucks } from '../../store/user/truckSlice';
import { deleteErrorGetLoads } from '../../store/user/loadSlice';

function Login() {
	const [isShowPassword, setShowPassword] = useState(false);
	const [type, setType] = useState('password');
	const { t } = useTranslation();
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const {
		statusPasswordReset,
		statusPasswordRestore,
		statusRegistration,
		errorMessage,
		isError,
		isAuth,
		statusDeleteProfile,
	} = useSelector((state: any) => state.user);
	const username = useInput('', { isEmpty: true, minLength: 3 });
	const email = useInput('', {
		isEmpty: true,
		isEmail: true,
	});
	const password = useInput('', { isEmpty: true, minLength: 6 });
	const { isErrorGetLoads } = useSelector((state: any) => state.load);
	const { isErrorGetTrucks } = useSelector((state: any) => state.truck);
	let userToken = localStorage.getItem('token');

	useEffect(() => {
		if (statusPasswordReset === 200) {
			dispatch(deleteStatusReset(0));
		}
	}, [statusPasswordReset, dispatch]);

	useEffect(() => {
		if (statusRegistration === 200) {
			dispatch(deleteStatusRegistration(0));
		}
	}, [statusRegistration, dispatch]);

	useEffect(() => {
		if (statusPasswordRestore === 200) {
			dispatch(deleteStatusRestore(0));
		}
	}, [statusPasswordRestore, dispatch]);

	useEffect(() => {
		if (isAuth === true) {
			navigate('/main-page');
		}
	}, [isAuth, navigate]);

	const isUserHasToken = useCallback(() => {
		try {
			if (userToken) {
				navigate('/main-page');
			} else {
				navigate('/');
			}
		} catch (e) {
			console.log(e);
		}
	}, [userToken, navigate]);

	useEffect(() => {
		isUserHasToken();
	}, [isUserHasToken]);

	useEffect(() => {
		if (isErrorGetTrucks) {
			dispatch(deleteErrorGetTrucks());
		}
		if (isErrorGetLoads) {
			dispatch(deleteErrorGetLoads());
		}
	}, [isErrorGetLoads, isErrorGetTrucks, dispatch]);

	useEffect(() => {
		if (statusDeleteProfile === 200) {
			navigate('/');
		}
	}, [statusDeleteProfile, navigate]);

	const enterProfile = (username: any, email: any, password: any) => {
		const user = {
			username: username.value,
			email: email.value,
			password: password.value,
		};
		dispatch(login(user));
	};

	const togglePassInput = (e: any) => {
		if (type === 'password') {
			setType('text');
			setShowPassword(true);
		} else {
			setType('password');
			setShowPassword(false);
		}
	};

	if (isError && errorMessage.length > 0) {
		return (
			<>
				<BadRequestError />
			</>
		);
	} else {
		return (
			<>
				<div className='login-container'>
					<div className='greeting-container'>
						<div className='greeting-container-description'>
							<h1>
								<span className='first-part-description'>
									{t('Logistics made easy')}
								</span>
								<span className='second-part-description'>
									{t('through digital solutions')}
								</span>
							</h1>
							<p className='description'>{t('description')}</p>
						</div>
						<form
							className='login-form'
							onSubmit={(e) => {
								e.preventDefault();
								enterProfile(username, email, password);
							}}
						>
							<h2>{t(buttonLogin)}</h2>
							<div className='icon-email-input-container'>
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

							<div className='icon-email-input-container'>
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
								<span className='icon-password-show-container'>
									<FontAwesomeIcon
										icon={faLock}
										className='email-icon-hide'
									></FontAwesomeIcon>
								</span>
							</div>
							<div>
								{email.isDirty && email.isEmpty && (
									<div className='error-registration'>{t(emailError)}</div>
								)}
							</div>
							{email.isDirty && email.emailError && (
								<div className='error-registration'>{t(emailInvalidError)}</div>
							)}
							<div className='icon-password-input-container'>
								<span className='icon-password-container'>
									<FontAwesomeIcon
										icon={faLock}
										className='password-icon'
									></FontAwesomeIcon>
								</span>
								<Input
									placeholder={t(registrationPasswordField)}
									value={password.value}
									style={styleLogin}
									onChange={(e: any) => password.onChange(e)}
									onBlur={(e: any) => password.onBlur(e)}
									type={type}
								/>
								<span
									className='icon-password-show-container'
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
							<div className='button-login-container'>
								<Button
									type='submit'
									text={t(buttonLogin)}
									disabled={
										!email.isInputValid ||
										!password.isInputValid ||
										!username.isInputValid
									}
									style={
										email.isInputValid &&
										password.isInputValid &&
										username.isInputValid
											? active
											: isDisabled
									}
								/>
								<Button
									type='submit'
									text={t('Forgot Password?')}
									onClick={(): void => navigate('/forgot-password')}
								/>
							</div>
							<div className='registration-link'>
								<p className='link-description'>
									{t("Dont't have an account?")}
								</p>
								<div className='link-container'>
									<Link className='link' to={'registration'}>
										{t('Sign up')}
									</Link>
								</div>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
