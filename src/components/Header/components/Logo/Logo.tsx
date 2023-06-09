import logo from './logo.jpg';
import './Logo.css';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Logo() {
	const navigate = useNavigate();
	const { role } = useSelector((state: any) => state.user);
	const logoClick = () => {
		role === '' ? navigate('/') : navigate('/main-page');
	};
	return (
		<div className='img-container'>
			<img
				src={logo}
				className='logo'
				alt='logo'
				onClick={logoClick}
				data-testid='logo'
			/>
		</div>
	);
}
export default Logo;
