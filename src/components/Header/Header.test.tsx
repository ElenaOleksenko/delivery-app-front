import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../store/test-utils';
import Header from './Header';
import { screen } from '@testing-library/react';

it('should render a correct language', async () => {
	renderWithProviders(
		<BrowserRouter>
			<Header />
		</BrowserRouter>,
		{
			preloadedState: {
				user: {
					isAuth: true,
					username: 'name',
					role: 'DRIVER',
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
			},
		}
	);
	expect(screen.getByText('EN')).toBeInTheDocument();
});
