import { useTranslation } from 'react-i18next';
import GoBack from '../../common/GoBack/GoBack';
import './AboutUs.css';
const AboutUs = () => {
	const { t } = useTranslation();
	return (
		<div className='about-wrapper'>
			<GoBack />
			<h4 className='about-wrapper-header'>{t('About us')}</h4>
		</div>
	);
};
export default AboutUs;
