import { BrowserRouter } from 'react-router-dom';
import { renderWithProviders } from '../../../../store/test-utils';
import SearchBar from './SearchBar';
import { screen, fireEvent, act } from '@testing-library/react';

it(`should render the component`, async () => {
	const filterCardsMock = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<SearchBar filterCards={filterCardsMock} />
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
	const searchInput = screen.getByPlaceholderText('Filter by name...');
	const inputValue = 'sprint';
	expect(searchInput).toBeInTheDocument();
	await act(async () => {
		fireEvent.change(searchInput, { target: { value: inputValue } });
	});
});
