import React from 'react';
import { useNavigate } from 'react-router-dom';
import ChangeProfile from '../../components/Profile/ChangeProfile';
import './ProfilePage.css';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useInput, useOnClickStyle } from '../../hooks/use-hooks';
import { ThunkDispatch } from '@reduxjs/toolkit';
import {
	deleteUserFromLocStorage,
	setUserDelete,
} from '../../store/user/userSlice';
import { logoutLoadsFromLocStorage } from '../../store/user/loadSlice';
import { logoutTrucksFromLocStorage } from '../../store/user/truckSlice';
import {
	baseUrl,
	changePassword,
	deleteProfileText,
	editPersonalData,
	profileText,
} from '../../constants';
import { useTranslation } from 'react-i18next';
import GoBack from '../../common/GoBack/GoBack';

const ProfilePage = () => {
	const { userPhoto, username, email, statusDeleteProfile } = useSelector(
		(state: any) => state.user
	);
	const { user } = useSelector((state: any) => state);
	const focus = useOnClickStyle();
	const emailEdit = useInput(email, { isEmpty: true, isEmail: true });
	const usernameEdit = useInput(username, { isEmpty: true, minLength: 3 });
	const passwordOld = useInput('', { isEmpty: true, minLength: 6 });
	const passwordNew = useInput('', { isEmpty: true, minLength: 6 });
	const passwordNewConfirm = useInput('', { isEmpty: true, minLength: 6 });
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const styleChangePass = {
		backgroundColor: focus.editPass ? '#e7effb' : 'white',
	};
	const styleProfileAvatar = {
		backgroundColor: focus.avatar ? '#e7effb' : 'white',
	};
	const styleDeleteProfile = {
		backgroundColor: focus.deleteProfile ? '#e7effb' : 'white',
	};

	useEffect(() => {
		if (statusDeleteProfile) {
			setTimeout(() => {
				dispatch(setUserDelete());
				dispatch(deleteUserFromLocStorage());
				dispatch(logoutLoadsFromLocStorage());
				dispatch(logoutTrucksFromLocStorage());
				localStorage.clear();
				navigate('/', { replace: true });
			}, 5000);
		}
	}, [statusDeleteProfile, dispatch, navigate]);

	return (
		<React.Fragment>
			<div className='common-change-profile-container'>
				<div className='profile-page-container'>
					<GoBack />
					<div className='common-profile-menu'>
						<div className='profile-menu-header'>
							<h3>{t(profileText)}</h3>
						</div>
						<div
							className='avatar-data-container'
							style={styleProfileAvatar}
							onClick={() => {
								focus.clickAvatar();
								passwordOld.resetInput();
								passwordNew.resetInput();
								passwordNewConfirm.resetInput();
							}}
							data-testid='container-avatar'
						>
							<div className='avatar-container'>
								<Avatar
									sx={{ width: 82, height: 82, background: '#bbcfe7' }}
									src={`${baseUrl}/public${userPhoto.filePath}`}
								>
									<ImageIcon sx={{ fontSize: 35 }} />
								</Avatar>
							</div>
							<div className='data-container'>
								<p className='data-username'>{user.username}</p>
								<p className='data-username'>{user.email}</p>
								<p className='data-edit'>{t(editPersonalData)}</p>
							</div>
						</div>
						<div
							className='change-password-container'
							style={styleChangePass}
							onClick={() => {
								focus.clickEditPass();
								emailEdit.resetInputUpdateCredentials(email);
								usernameEdit.resetInputUpdateCredentials(username);
							}}
							data-testid='container-change-password'
						>
							<p className='data-edit-password'>{t(changePassword)}</p>
							<ArrowForwardIosIcon sx={{ color: 'rgb(219, 165, 17)' }} />
						</div>
						<div
							className='delete-profile-container'
							onClick={() => {
								focus.clickDeleteProfile();
								passwordOld.resetInput();
								passwordNew.resetInput();
								passwordNewConfirm.resetInput();
								emailEdit.resetInputUpdateCredentials(email);
								usernameEdit.resetInputUpdateCredentials(username);
							}}
							data-testid='container-delete-profile'
							style={styleDeleteProfile}
						>
							<p className='data-delete'>{t(deleteProfileText)}</p>
							<ArrowForwardIosIcon sx={{ color: 'rgb(219, 165, 17)' }} />
						</div>
					</div>
				</div>
				<ChangeProfile
					avatar={focus.avatar}
					edit={focus.editPass}
					focus={focus}
					deleteProf={focus.deleteProfile}
					passwordOld={passwordOld}
					passwordNew={passwordNew}
					emailEdit={emailEdit}
					usernameEdit={usernameEdit}
					passwordNewConfirm={passwordNewConfirm}
				/>
			</div>
		</React.Fragment>
	);
};
export default ProfilePage;
