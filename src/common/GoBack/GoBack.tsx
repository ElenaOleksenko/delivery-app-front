import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import './GoBack.css';
import { useTranslation } from 'react-i18next';
import { backToMainPage } from '../../constants';
import { useSelector } from 'react-redux';

const GoBack = () => {
	const { t } = useTranslation();
	const role = useSelector((state: any) => state.user.role);
	return (
		<>
			<div className='container-card-link'>
				<FontAwesomeIcon icon={faBackward} className='back-to-main-page-icon' />
				<Link
					className='back-to-main-page'
					to={role === '' ? '/' : '/main-page'}
				>
					<p className='back-to-main-page-description'>{t(backToMainPage)}</p>
				</Link>
			</div>
		</>
	);
};

export default GoBack;
