import * as React from 'react';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../store/user/userSlice';
import './ProfileBreadCrumbs.css';
import { logoutLoadsFromLocStorage } from '../../../../store/user/loadSlice';
import { logoutTrucksFromLocStorage } from '../../../../store/user/truckSlice';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useTranslation } from 'react-i18next';
import { baseUrl, logoutText, profileText } from '../../../../constants';

const ProfileBreadCrumbs = () => {
	const { username, userPhoto } = useSelector((state: any) => state.user);
	const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
	const navigate = useNavigate();
	const { t } = useTranslation();

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	let firstLetterUsername = username.slice(0, 1).toUpperCase();

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<aside className='aside-container'>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						textAlign: 'center',
						'& .MuiTouchRipple-root:hover': {
							backgroundColor: 'red !important',
							color: 'blue',
						},
					}}
				>
					<Tooltip title='Account settings'>
						<IconButton
							data-testid='profile'
							onClick={handleClick}
							size='small'
							sx={{ ml: 2, '&:hover': { bgcolor: '#e7effb' } }}
							aria-controls={open ? 'account-menu' : undefined}
							aria-haspopup='true'
							aria-expanded={open ? 'true' : undefined}
						>
							<Avatar
								sx={{
									width: 62,
									height: 62,
									bgcolor: '#bbcfe7',
								}}
								src={`${baseUrl}/public${userPhoto.filePath}`}
							>
								{firstLetterUsername}
							</Avatar>
						</IconButton>
					</Tooltip>
				</Box>
				<Menu
					anchorEl={anchorEl}
					id='account-menu'
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					PaperProps={{
						elevation: 0,
						sx: {
							overflow: 'visible',
							filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
							mt: 1,
							'& .MuiAvatar-root': {
								width: 32,
								height: 32,
								ml: -0.5,
								mr: 1,
								bgcolor: '#7f9abb',
							},

							'&:before': {
								content: '""',
								display: 'block',
								position: 'absolute',
								top: 0,
								right: 14,
								width: 10,
								height: 10,
								bgcolor: '#e7effb',
								transform: 'translateY(-50%) rotate(45deg)',
								zIndex: 0,
							},
						},
					}}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
				>
					<MenuItem
						onMouseEnter={(e: any) =>
							(e.target.style.backgroundColor = '#e7effb')
						}
						onMouseLeave={(e: any) =>
							(e.target.style.backgroundColor = '#ffffff')
						}
						onClick={() => navigate('/main-page/profile')}
					>
						<Avatar /> {t(profileText)}
					</MenuItem>
					<Divider />
					<MenuItem
						data-testid='logout'
						onClick={() => {
							dispatch(logout());
							dispatch(logoutLoadsFromLocStorage());
							dispatch(logoutTrucksFromLocStorage());
							localStorage.clear();
							navigate('/', { replace: true });
						}}
						onMouseEnter={(e: any) =>
							(e.target.style.backgroundColor = '#e7effb')
						}
						onMouseLeave={(e: any) =>
							(e.target.style.backgroundColor = '#ffffff')
						}
					>
						<ListItemIcon>
							<Logout fontSize='small' />
						</ListItemIcon>
						{t(logoutText)}
					</MenuItem>
				</Menu>
			</aside>
		</>
	);
};

export default ProfileBreadCrumbs;
