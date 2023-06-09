import { useTranslation } from 'react-i18next';
import GoBack from '../../common/GoBack/GoBack';
import './Rules.css';
const Rules = () => {
	const { t } = useTranslation();
	return (
		<div className='rules-wrapper'>
			<GoBack />
			<h4 className='rules-wrapper-header'>{t('Rules')}</h4>
		</div>
	);
};
export default Rules;
