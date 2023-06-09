import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../store/test-utils';
import { deleteStatusError } from '../../store/user/userSlice';
import { screen, fireEvent } from '@testing-library/react';
import BadRequestError from './BadRequestError';
import { deleteStatusLoadsError } from '../../store/user/loadSlice';

const initialUser = {
	isAuth: false,
	username: '',
	role: '',
	email: '',
	jwt_token: '',
	userPhoto: {},
	message: '',
	isError: true,
	errorMessage: 'errorMessage',
	statusPasswordRestore: 0,
	statusPasswordReset: 0,
	statusRegistration: 0,
	statusDeleteProfile: false,
};
it('should render the button "Back" and delete the error status', async () => {
	const dispatch = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<BadRequestError />
		</BrowserRouter>,
		{
			preloadedState: {
				user: initialUser,
			},
		}
	);
	expect(screen.getByText(/Back/i)).toBeInTheDocument();
	const btn = screen.getByRole('button', { name: /Back/i });
	fireEvent.click(btn);
	dispatch(deleteStatusError(''));
	expect(screen.queryByText(/Back/i)).not.toBeInTheDocument();
});

it('should render the button "Home" and delete the error status', async () => {
	const dispatch = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<BadRequestError />
		</BrowserRouter>,
		{
			preloadedState: {
				user: initialUser,
			},
		}
	);
	expect(screen.getByText(/Home/i)).toBeInTheDocument();
	const btnHome = screen.getByRole('button', { name: /Home/i });
	fireEvent.click(btnHome);
	dispatch(deleteStatusError(''));
	dispatch(deleteStatusLoadsError(''));
	expect(screen.queryByText(/errorMessage/i)).not.toBeInTheDocument();
});

it('should render the button "Home" and delete the error status', async () => {
	renderWithProviders(
		<BrowserRouter>
			<BadRequestError />
		</BrowserRouter>,
		{
			preloadedState: {
				load: {
					loads: [],
					archiveLoads: [],
					activeLoadShipper: { assignedLoad: [], loadArrivedToDelivery: [] },
					successMessage: '',
					isErrorGetLoads: false,
					loadTruckWasFound: {},
					driverFound: false,
					responseDriverFound: false,
					readByShipper: false,
					alertAssignedLoadForShipper: 0,
					isErrorLoads: true,
					errorMessage: '',
					isLoadArchive: false,
				},
			},
		}
	);
	expect(screen.getByText(/Home/i)).toBeInTheDocument();
	const btnHome = screen.getByRole('button', { name: /Home/i });
	fireEvent.click(btnHome);
});
