import React from 'react';
import Input from '../../common/Input/Input';
import {
	active,
	changeBackground,
	changeBackgroundLeave,
	isDisabled,
	styleBtnDeleteProfileNo,
	styleBtnUploadPhoto,
	styleChangeEmailInput,
	styleChangeNewPassword,
	styleChangeOldPassword,
	styleChangeUsernameInput,
	editPersonalData,
	changePassword,
	deleteProfileText,
	registrationUserNameText,
	emailError,
	emailInvalidError,
	userNameError,
	userNameLengthError,
	registrationEmailField,
	save,
	uploadPhoto,
	deletePhoto,
	enterOldPass,
	passwordError,
	passwordLengthError,
	enterNewPass,
	confirmPass,
	passwordsMatch,
	deleteProfileQuestion,
	noText,
	yesText,
} from '../../constants';
import './ChangeProfile.css';
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from '../../common/Button/Button';
import { useTogglePassword } from '../../hooks/use-hooks';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
	deleteMessageSuccess,
	deleteProfile,
	deleteStatusError,
	deleteUserPhoto,
	updateUserCredentials,
	updateUserPassword,
	uploadUserPhoto,
	validateError,
} from '../../store/user/userSlice';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const Profile = ({
	edit,
	avatar,
	deleteProf,
	focus,
	passwordOld,
	passwordNew,
	emailEdit,
	usernameEdit,
	passwordNewConfirm,
}: any) => {
	const { message, isError, errorMessage } = useSelector(
		(state: any) => state.user
	);
	const togglePassword = useTogglePassword();
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const [openSnackbar, setOpenSnackbar] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const { t } = useTranslation();

	const handleClickSnackbar = () => {
		setOpenSnackbar(true);
	};

	const handleCloseSnackbar = (
		event: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === 'clickaway') {
			return;
		}
		isError
			? dispatch(deleteStatusError(''))
			: dispatch(deleteMessageSuccess());
		setOpenSnackbar(false);
	};

	const action = (
		<React.Fragment>
			<IconButton
				size='medium'
				aria-label='close'
				color='inherit'
				onClick={handleCloseSnackbar}
			>
				<CloseIcon fontSize='small' />
			</IconButton>
		</React.Fragment>
	);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const avatarSubmit = (avatar: any, e: any) => {
		e.preventDefault();
		const formData = new FormData();
		if (avatar.type !== 'image/jpeg' && avatar.type !== 'image/png') {
			let message = 'Invalid file type';
			dispatch(validateError(message));
			handleClickSnackbar();
			handleClose();
			return;
		}
		formData.append('photo', avatar);
		dispatch(uploadUserPhoto(formData));
		handleClickSnackbar();
		handleClose();
	};

	const avatarDelete = (event: React.MouseEvent<HTMLElement>) => {
		event.preventDefault();
		dispatch(deleteUserPhoto());
		handleClose();
	};

	const submitChangeCredentials = (
		e: any,
		usernameEdit: any,
		emailEdit: any
	) => {
		const user = {
			username: usernameEdit.value,
			email: emailEdit.value,
		};
		dispatch(updateUserCredentials(user));
		handleClickSnackbar();
	};

	const submitChangePassword = (e: any, oldPassword: any, newPassword: any) => {
		const newPasswordCredentials = {
			oldPassword: oldPassword.value,
			newPassword: newPassword.value,
		};
		dispatch(updateUserPassword(newPasswordCredentials));
		passwordOld.resetInput();
		passwordNew.resetInput();
		passwordNewConfirm.resetInput();
		handleClickSnackbar();
	};

	const submitDeleteProfile = () => {
		dispatch(deleteProfile());
		handleClickSnackbar();
	};

	return (
		<React.Fragment>
			<div className='change-profile-container'>
				<div className='box-profile'>
					<div className='form-change-pofile-container'>
						<h3 className='change-pofile-header'>
							{avatar
								? t(editPersonalData)
								: edit
								? t(changePassword)
								: t(deleteProfileText)}
						</h3>
						{avatar && (
							<>
								<form
									className='form-change-pofile-inputs'
									onSubmit={(e) => {
										e.preventDefault();
										submitChangeCredentials(e, usernameEdit, emailEdit);
									}}
								>
									<div className='change-pofile-inputs'>
										<Input
											placeholder=''
											value={usernameEdit.value}
											style={styleChangeUsernameInput}
											text={t(registrationUserNameText)}
											onChange={(e: any) => usernameEdit.onChange(e)}
											onBlur={(e: any) => usernameEdit.onBlur(e)}
											id='text'
										/>
										{usernameEdit.isDirty && usernameEdit.isEmpty && (
											<div className='error-registration'>
												{t(userNameError)}
											</div>
										)}
										{usernameEdit.isDirty && usernameEdit.minLengthError && (
											<div className='error-registration'>
												{t(userNameLengthError)}
											</div>
										)}
										<div className='change-pofile-inputs'>
											<Input
												placeholder=''
												value={emailEdit.value}
												style={styleChangeEmailInput}
												text={t(registrationEmailField)}
												onChange={(e: any) => emailEdit.onChange(e)}
												onBlur={(e: any) => emailEdit.onBlur(e)}
												id='text'
											/>
										</div>
										{emailEdit.isDirty && emailEdit.isEmpty && (
											<div className='error-registration'>{t(emailError)}</div>
										)}
										{emailEdit.isDirty && emailEdit.emailError && (
											<div className='error-registration'>
												{t(emailInvalidError)}
											</div>
										)}
									</div>

									{avatar && (
										<Button
											text={t(save)}
											disabled={
												!emailEdit.isInputValid || !usernameEdit.isInputValid
											}
											style={
												emailEdit.isInputValid && usernameEdit.isInputValid
													? active
													: isDisabled
											}
											type='submit'
										/>
									)}
								</form>
								<div className='upload-photo-text-container'>
									<UploadIcon sx={{ color: 'rgb(219, 165, 17)' }} />
									<Button
										id='fade-button'
										aria-controls={open ? 'fade-menu' : undefined}
										aria-haspopup='true'
										aria-expanded={open ? 'true' : undefined}
										text={t(uploadPhoto)}
										onClick={handleClick}
										style={styleBtnUploadPhoto}
									/>
									<Menu
										id='fade-menu'
										MenuListProps={{
											'aria-labelledby': 'fade-button',
										}}
										anchorEl={anchorEl}
										open={open}
										onClose={handleClose}
										TransitionComponent={Fade}
									>
										<MenuItem>
											<label
												htmlFor='imageUpload'
												className='btn btn-primary btn-block btn-outlined'
											>
												{t(uploadPhoto)}
											</label>
											<input
												placeholder='Choose the file'
												type='file'
												name='profilePicture'
												id='imageUpload'
												onChange={(e: any) => {
													avatarSubmit(e.target.files[0], e);
												}}
												style={{ display: 'none' }}
											/>
										</MenuItem>
										<MenuItem onClick={avatarDelete}>{t(deletePhoto)}</MenuItem>
									</Menu>
								</div>
							</>
						)}
						{edit && (
							<>
								<form
									className='form-change-password-input-container'
									onSubmit={(e) => {
										e.preventDefault();
										submitChangePassword(e, passwordOld, passwordNew);
									}}
								>
									<div className='change-password-input-container'>
										<div className='old-password-input-box'>
											<Input
												placeholder={t(enterOldPass)}
												value={passwordOld.value}
												style={styleChangeOldPassword}
												type={togglePassword.typeOld}
												onChange={(e: any) => passwordOld.onChange(e)}
												onBlur={(e: any) => passwordOld.onBlur(e)}
											/>
											<div
												className='password-change-icon-box'
												onClick={togglePassword.togglePassInputOld}
											>
												{togglePassword.isShowPasswordOld ? (
													<FontAwesomeIcon
														icon={faEyeSlash}
														className='password-change-icon'
													></FontAwesomeIcon>
												) : (
													<FontAwesomeIcon
														icon={faEye}
														className='password-change-icon'
													></FontAwesomeIcon>
												)}
											</div>
										</div>
										<div className='error-change-profile-box'>
											{passwordOld.isDirty && passwordOld.isEmpty && (
												<div className='error-change-profile'>
													{t(passwordError)}
												</div>
											)}
											{passwordOld.isDirty && passwordOld.minLengthError && (
												<div className='error-change-profile'>
													{t(passwordLengthError)}
												</div>
											)}
										</div>

										<div className='new-password-input-box'>
											<Input
												placeholder={t(enterNewPass)}
												style={styleChangeNewPassword}
												value={passwordNew.value}
												type={togglePassword.typeNew}
												onChange={(e: any) => passwordNew.onChange(e)}
												onBlur={(e: any) => passwordNew.onBlur(e)}
											/>
											<div
												className='password-change-icon-box'
												onClick={togglePassword.togglePassInputNew}
											>
												{togglePassword.isShowPasswordNew ? (
													<FontAwesomeIcon
														icon={faEyeSlash}
														className='password-change-icon'
													></FontAwesomeIcon>
												) : (
													<FontAwesomeIcon
														icon={faEye}
														className='password-change-icon'
													></FontAwesomeIcon>
												)}
											</div>
										</div>
										<div className='error-change-profile-box'>
											{passwordNew.isDirty && passwordNew.isEmpty && (
												<div className='error-change-profile'>
													{t(passwordError)}
												</div>
											)}
											{passwordNew.isDirty && passwordNew.minLengthError && (
												<div className='error-change-profile'>
													{t(passwordLengthError)}
												</div>
											)}
										</div>

										<div className='confirm-password-input-box'>
											<Input
												placeholder={t(confirmPass)}
												value={passwordNewConfirm.value}
												style={styleChangeOldPassword}
												type={togglePassword.typeNewConfirm}
												onChange={(e: any) => passwordNewConfirm.onChange(e)}
												onBlur={(e: any) => passwordNewConfirm.onBlur(e)}
											/>
											<div
												className='password-change-icon-box'
												onClick={togglePassword.togglePassInputNewConfirm}
											>
												{togglePassword.isShowPasswordNewConfirm ? (
													<FontAwesomeIcon
														icon={faEyeSlash}
														className='password-change-icon'
													></FontAwesomeIcon>
												) : (
													<FontAwesomeIcon
														icon={faEye}
														className='password-change-icon'
													></FontAwesomeIcon>
												)}
											</div>
										</div>
										<div className='error-change-profile-box-confirm'>
											{passwordNewConfirm.isDirty &&
												passwordNewConfirm.isEmpty && (
													<div className='error-change-profile'>
														{t(passwordError)}
													</div>
												)}
											{passwordNewConfirm.isDirty &&
												passwordNewConfirm.minLengthError && (
													<div className='error-change-profile'>
														{t(passwordLengthError)}
													</div>
												)}
											{passwordNewConfirm.isDirty &&
												passwordNewConfirm.value !== passwordNew.value && (
													<div className='error-change-profile'>
														{t(passwordsMatch)}
													</div>
												)}
										</div>
									</div>

									{edit && (
										<Button
											text={t(save)}
											disabled={
												!passwordNew.isInputValid ||
												!passwordOld.isInputValid ||
												passwordNewConfirm.value !== passwordNew.value
											}
											style={
												passwordNew.isInputValid &&
												passwordOld.isInputValid &&
												passwordNewConfirm.value === passwordNew.value
													? active
													: isDisabled
											}
											type='submit'
										/>
									)}
								</form>
							</>
						)}
						{deleteProf && (
							<>
								<div>
									<p>{t(deleteProfileQuestion)}</p>
								</div>
								<div className='delete-profile-btn-box'>
									<Button
										text={t(noText)}
										style={styleBtnDeleteProfileNo}
										onMouseLeave={changeBackground}
										onClick={() => {
											focus.clickAvatar();
										}}
									/>
									<Button
										text={t(yesText)}
										onMouseOver={changeBackground}
										onMouseLeave={changeBackgroundLeave}
										onClick={() => {
											submitDeleteProfile();
										}}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</div>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message={isError ? errorMessage : message}
				action={action}
				ContentProps={{
					sx: {
						background: isError ? 'rgb(250, 112, 153)' : 'rgb(219, 165, 17)',
						width: '90vh',
					},
				}}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			/>
		</React.Fragment>
	);
};
export default Profile;
