import { render, screen } from '@testing-library/react';
import Input from './Input';

it('should display the conponent Input', () => {
	const text = 'input';
	render(<Input placeholder={text} />);
	screen.getByPlaceholderText(text);
});
