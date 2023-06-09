import { render, screen } from '@testing-library/react';
import { Button } from './Button';

it('should display Button', () => {
	const text = 'button';
	render(<Button text={text} />);
	screen.getByText(text);
});
