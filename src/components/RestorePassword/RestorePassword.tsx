import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import './RestorePassword.css';
import {
	active,
	cancel,
	enterNewPassword,
	goToLoginPage,
	isDisabled,
	passwordChangedSucc,
	passwordError,
	passwordLengthError,
	registrationPasswordField,
	styleBtnForgotPassCancel,
	styleLogin,
	submit,
} from '../../constants';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { restorePassword } from '../../store/user/userSlice';
import { useInput } from '../../hooks/use-hooks';
import BadRequestError from '../../common/Error/BadRequestError';

function RestorePassword() {
	const password = useInput('', { isEmpty: true, minLength: 6 });
	const [isShowPassword, setShowPassword] = useState(false);
	const [type, setType] = useState('password');
	const navigate = useNavigate();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { t } = useTranslation();
	const statusRestore = useSelector(
		(state: any) => state.user.statusPasswordRestore
	);
	const { errorMessage } = useSelector((state: any) => state.user);
	const { id, resetToken } = useParams();
	console.log(id, resetToken);

	const togglePassInput = (e: any) => {
		if (type === 'password') {
			setType('text');
			setShowPassword(true);
		} else {
			setType('password');
			setShowPassword(false);
		}
	};

	const enterProfile = (password: string, resetToken: any, id: any) => {
		dispatch(
			restorePassword({ password: password, token: resetToken, id: id })
		);
	};
	if (errorMessage) {
		return (
			<>
				<BadRequestError />
			</>
		);
	} else {
		if (statusRestore === 0) {
			return (
				<>
					<div className='wrapper-change-pass-container'>
						<div className='change-pass-container'>
							<form
								className='change-pass-form'
								onSubmit={(e) => {
									e.preventDefault();
									if (resetToken !== undefined || id !== undefined) {
										enterProfile(password.value, resetToken, id);
									}
								}}
							>
								<h2>{t(enterNewPassword)}</h2>
								<div className='icon-password-change-container'>
									<span className='icon-password-container'>
										<FontAwesomeIcon
											icon={faLock}
											className='password-icon'
										></FontAwesomeIcon>
									</span>
									<Input
										placeholder={t(registrationPasswordField)}
										value={password.value}
										type={type}
										onChange={(e: any) => password.onChange(e)}
										style={styleLogin}
										onBlur={(e: any) => password.onBlur(e)}
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
								<div className='button-change-pass-container'>
									<Button
										type='submit'
										text={t(submit)}
										disabled={!password.isInputValid}
										style={password.isInputValid ? active : isDisabled}
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
					<div className='instructions-text-container'>
						{t(passwordChangedSucc)}
					</div>
					<div className='link-container'>
						<Link className='link' to={'/'}>
							{t(goToLoginPage)}
						</Link>
					</div>
				</div>
			);
		}
	}
}

export default RestorePassword;
