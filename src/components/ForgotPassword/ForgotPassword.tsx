import { Button } from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { Link, useNavigate } from 'react-router-dom';
import './ForgotPassword.css';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../store/user/userSlice';
import { ThunkDispatch } from '@reduxjs/toolkit';
import BadRequestError from '../../common/Error/BadRequestError';
import { useInput } from '../../hooks/use-hooks';
import {
	active,
	cancel,
	emailError,
	emailInvalidError,
	forgotPasswordEmailText,
	goToLoginPage,
	isDisabled,
	passwordChangeInstructions,
	registrationEmailField,
	styleBtnForgotPassCancel,
	styleInputForgotPassword,
	submit,
} from '../../constants';

function ForgotPassword() {
	const navigate = useNavigate();
	const { t } = useTranslation();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const { statusPasswordReset, errorMessage } = useSelector(
		(state: any) => state.user
	);
	const email = useInput('', { isEmpty: true, isEmail: true });

	const enterForgotPassword = (email: any) => {
		const credentials = {
			email: email.value,
		};
		dispatch(resetPassword(credentials));
	};

	if (errorMessage) {
		return (
			<>
				<BadRequestError />
			</>
		);
	} else {
		if (statusPasswordReset === 0) {
			return (
				<>
					<div className='wrapper-foggot-pass-container'>
						<div className='forgot-password-container'>
							<form
								className='forgot-password-form'
								onSubmit={(e) => {
									e.preventDefault();
									enterForgotPassword(email);
								}}
							>
								<h2 className='forgot-pass-header'>{t('Forgot password')}</h2>
								<p>{t('textForgotPassword')}</p>
								<div className='icon-email-input-cotainer'>
									<Input
										placeholder={t(forgotPasswordEmailText)}
										text={t(registrationEmailField)}
										value={email.value}
										type='text'
										onChange={(e: any) => email.onChange(e)}
										onBlur={(e: any) => email.onBlur(e)}
										style={styleInputForgotPassword}
									/>
								</div>
								{email.isDirty && email.isEmpty && (
									<div className='error-registration'>{t(emailError)}</div>
								)}
								{email.isDirty && email.emailError && (
									<div className='error-registration'>
										{t(emailInvalidError)}
									</div>
								)}

								<div className='button-forgot-password-container'>
									<Button
										type='submit'
										text={t(submit)}
										disabled={!email.isInputValid}
										style={email.isInputValid ? active : isDisabled}
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
						{t(passwordChangeInstructions)}
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

export default ForgotPassword;
