import { useTranslation } from 'react-i18next';
import GoBack from '../../common/GoBack/GoBack';
import './Contacts.css';

const Contacts = () => {
	const { t } = useTranslation();
	return (
		<div className='contacts-wrapper'>
			<GoBack />
			<div className='contacts-wrapper-box'>
				<h4 className='contacts-wrapper-box-header'>{t('Contacts')}</h4>
				<div className='contacts-wrapper-box-phone'>
					<div className='contacts-wrapper-box-life'>
						<div className='contacts-wrapper-box-life-img-container'>
							<div className='contacts-wrapper-box-life-img'></div>
							<div className='contacts-wrapper-box-life-text'>lifecell</div>
						</div>
						<div className='contacts-wrapper-box-life-number'>80931111111</div>
					</div>
				</div>
				<div className='contacts-wrapper-box-phone'>
					<div className='contacts-wrapper-box-vodafone'>
						<div className='contacts-wrapper-box-life-img-container'>
							<div className='contacts-wrapper-box-vodafone-img'></div>
							<div className='contacts-wrapper-box-vodafone-text'>vodafone</div>
						</div>
						<div className='contacts-wrapper-box-vodafone-number'>
							80501111111
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Contacts;
