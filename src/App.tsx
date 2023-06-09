import './App.css';
import { Link, Routes } from 'react-router-dom';
import { Route } from 'react-router';
import Login from './components/Login/Login';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import RestorePassword from './components/RestorePassword/RestorePassword';
import Registration from './components/Registration/Registration';
import { useSelector } from 'react-redux';
import BadRequestError from './common/Error/BadRequestError';
import Main from './pages/main/Main';
import ProfilePage from './pages/profile/ProfilePage';
import SideBar from './components/Trucks/components/SideBar/SideBar';
import CardInfo from './components/Trucks/components/CardInfo/CardInfo';
import SearchTruckResponse from './components/Trucks/components/SearchTruckResponse/SearchTruckResponse';
import ActiveLoads from './components/Trucks/components/ActiveLoads/ActiveLoads';
import ArchiveLoads from './components/Trucks/components/ArchiveLoads/ArchiveLoads';
import Contacts from './pages/contacts/Contacts';
import AboutUs from './pages/about/AboutUs';
import Rules from './pages/rules/Rules';

function App() {
	const { isAuth, role } = useSelector((state: any) => state.user);
	return (
		<>
			<Header />
			{isAuth && <SideBar />}
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='error' element={<BadRequestError />} />
				<Route path='forgot-password' element={<ForgotPassword />} />
				<Route
					path='reset-password/:resetToken/:id'
					element={<RestorePassword />}
				/>
				<Route path='contacts' element={<Contacts />} />
				<Route path='about-us' element={<AboutUs />} />
				<Route path='rules' element={<Rules />} />

				{isAuth && (
					<Route path='main-page'>
						<Route index element={<Main />} />
						<Route path='profile' element={<ProfilePage />} />
						<Route path='info/:id' element={<CardInfo />} />
						<Route path='search-truck' element={<SearchTruckResponse />} />
						<Route path='active-loads' element={<ActiveLoads />} />
						<Route path='archive-loads' element={<ArchiveLoads />} />
					</Route>
				)}

				<Route
					path='*'
					element={
						<>
							<div className='container-exist-wrapper'>
								<div className='container-exist'>
									<div className='error-container-exist'>
										Sorry, this page doesn't exist
									</div>
									<div className='error-link-container-exist'>
										<Link
											className='link'
											to={role === '' ? '/' : '/main-page'}
										>
											Go back
										</Link>
									</div>
								</div>
							</div>
						</>
					}
				/>
			</Routes>
			<Footer />
		</>
	);
}

export default App;
