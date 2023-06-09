import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';

const ElementSideBar = ({ list }: any) => {
	const { alertAssignedLoad } = useSelector((state: any) => state.truck);
	const { alertAssignedLoadForShipper } = useSelector(
		(state: any) => state.load
	);
	const { role } = useSelector((state: any) => state.user);
	return (
		<>
			{(role === 'SHIPPER' || role === 'DRIVER') &&
				(list.id === '3' || list.id === '4') && (
					<li className='nav__items'>
						<Badge
							sx={{
								'& .MuiBadge-badge': {
									backgroundColor:
										(role === 'DRIVER' || role === 'SHIPPER') &&
										list.id === '3' &&
										(alertAssignedLoad !== '' ||
											alertAssignedLoadForShipper !== '')
											? 'rgb(244, 46, 105)'
											: null,
								},
							}}
							badgeContent={
								(role === 'DRIVER' || role === 'SHIPPER') && list.id === '3'
									? alertAssignedLoad || alertAssignedLoadForShipper
									: null
							}
							className='alert'
						>
							<FontAwesomeIcon
								icon={list.icon}
								className='fa'
							></FontAwesomeIcon>
						</Badge>
						<NavLink to={list.to} className='nav-link'>
							{list.label}
						</NavLink>
					</li>
				)}
			{role === 'SHIPPER' && list.id === '1' && (
				<li className='nav__items'>
					<FontAwesomeIcon icon={list.icon} className='fa'></FontAwesomeIcon>
					<NavLink to={list.to} className='nav-link'>
						{list.label}
					</NavLink>
				</li>
			)}
		</>
	);
};

export default ElementSideBar;
