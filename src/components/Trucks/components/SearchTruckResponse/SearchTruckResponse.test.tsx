import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../store/test-utils';
import SearchTruckResponse from './SearchTruckResponse';

it('should render the component', async () => {
	renderWithProviders(
		<BrowserRouter>
			<SearchTruckResponse />
		</BrowserRouter>,
		{
			preloadedState: {
				user: {
					isAuth: true,
					username: 'name',
					role: 'SHIPPER',
					email: '',
					jwt_token: '',
					userPhoto: {},
					message: '',
					isError: false,
					errorMessage: '',
					statusPasswordRestore: 0,
					statusPasswordReset: 0,
					statusRegistration: 0,
					statusDeleteProfile: false,
				},
				load: {
					loads: [],
					archiveLoads: [],
					activeLoadShipper: { assignedLoad: [], loadArrivedToDelivery: [] },
					successMessage: '',
					isErrorGetLoads: false,
					loadTruckWasFound: { logs: ['message'] },
					driverFound: true,
					responseDriverFound: true,
					readByShipper: false,
					alertAssignedLoadForShipper: 0,
					isErrorLoads: false,
					errorMessage: '',
					isLoadArchive: false,
				},
			},
		}
	);
});
