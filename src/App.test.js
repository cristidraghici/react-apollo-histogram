import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app', () => {
  render(<App />);
  const el = screen.getByText(/apollo/i);
  expect(el).toBeInTheDocument();
});
