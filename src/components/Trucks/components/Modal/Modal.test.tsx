import { renderWithProviders } from '../../../../store/test-utils';
import { BrowserRouter } from 'react-router-dom';
import { Modal } from './Modal';

it('should render a component', async () => {
	const MockComponent = () => {
		return <h1>Hello</h1>;
	};
	const onClose = jest.fn();
	renderWithProviders(
		<BrowserRouter>
			<Modal title='Create new product' onClose={onClose}>
				<MockComponent />
			</Modal>
		</BrowserRouter>,
		{
			preloadedState: {},
		}
	);
});
