import { useTrans } from '../../../../hooks/use-hooks';
import { SideBarI } from '../../Model';
import ElementSideBar from './components/ElementSideBar';
import './SideBar.css';

const SideBar = () => {
	const translationSideBarElements = useTrans();
	return (
		<>
			<nav className='nav__cont'>
				<ul className='nav'>
					{translationSideBarElements.map((item: SideBarI) => {
						return <ElementSideBar list={item} key={item.id} />;
					})}
				</ul>
			</nav>
		</>
	);
};

export default SideBar;
