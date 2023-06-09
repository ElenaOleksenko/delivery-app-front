import { render, screen } from '@testing-library/react';
import Footer from './Footer';

it('should display footer text', () => {
	const text = '© Delivery service';
	render(<Footer />);
	screen.getByText(text);
});
