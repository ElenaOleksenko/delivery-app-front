import { useTranslation } from 'react-i18next';
import useLocalStorage from '../../hooks/use-hooks';
import i18n from '../../i18n';
import Logo from './components/Logo/Logo';
import './Header.css';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileBreadCrumbs from './components/BreadCrumbs/ProfileBreadCrumbs';

function Header() {
	const [language, setLanguage] = useLocalStorage('language', 'en');
	const { t } = useTranslation();
	const { isAuth, username } = useSelector((state: any) => state.user);

	const handleLenguageChange = () => {
		if (language === 'en') {
			i18n.changeLanguage('ua');
			setLanguage('ua');
			// console.log(language);
		} else if (language === 'ua') {
			i18n.changeLanguage('en');
			setLanguage('en');
		}
	};

	return (
		<>
			<header>
				<div className='header-container'>
					<div className='logo-container'>
						<Logo />
						<div className='logo-description'>
							<p>{t('Delivery service')}</p>
						</div>
					</div>
					<nav>
						<Link className='nav-link-about' to={'about-us'}>
							{t('About us')}
						</Link>
						<Link className='nav-link-contacts' to={'contacts'}>
							{t('Contacts')}
						</Link>
						<Link className='nav-link-rules' to={'rules'}>
							{t('Rules')}
						</Link>
					</nav>

					<div className='language-container'>
						<FormControl
							variant='standard'
							sx={{
								m: 1,
								minWidth: 50,
								margin: '0 0vh 4.5vh 5vh',
								borderBottom: 'none',
								'& .MuiSvgIcon-root': { color: 'black' },
								'& .MuiInputBase-input: focus': {
									backgroundColor: 'white',
								},
								'& .MuiInputBase-root: after': { borderBottom: 'none' },
								'& .MuiFormLabel-root.Mui-focused': {
									color: 'rgb(254, 202, 62)',
								},
								'& .MuiSelect-select': { color: 'black', paddingBottom: '0vh' },
								'& .MuiInputBase-root: before': { borderBottom: 'none' },
								'& .MuiInputBase-root': { borderBottom: 'none' },
							}}
							data-testid='form-control'
						>
							<Select
								labelId='demo-simple-select-standard-label'
								id='demo-simple-select-standard'
								value={language}
								onChange={handleLenguageChange}
								label='Role'
								data-testid='select'
							>
								<MenuItem
									className='MenuItem'
									value=''
									data-testid='select-option-empty'
								></MenuItem>
								<MenuItem
									className='MenuItem'
									value={'en'}
									onMouseEnter={(e: any) =>
										(e.target.style.backgroundColor = '#e7effb')
									}
									onMouseLeave={(e: any) =>
										(e.target.style.backgroundColor = '#ffffff')
									}
									data-testid='select-option-en'
								>
									{t('English')}
								</MenuItem>
								<MenuItem
									className='MenuItem'
									value={'ua'}
									onMouseEnter={(e: any) =>
										(e.target.style.backgroundColor = '#e7effb')
									}
									onMouseLeave={(e: any) =>
										(e.target.style.backgroundColor = '#ffffff')
									}
									data-testid='select-option-ua'
								>
									{t('Ukrainian')}
								</MenuItem>
							</Select>
						</FormControl>
					</div>
					<div className='profile-container'>
						{isAuth && (
							<>
								<p>{username}</p>
								<ProfileBreadCrumbs />
							</>
						)}
					</div>
				</div>
			</header>
		</>
	);
}
export default Header;
