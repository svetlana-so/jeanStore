import { render, screen, fireEvent } from '@testing-library/react';
import BackBtn from '../app/ui/backBtn';
import { vi } from 'vitest';
import { useRouter } from 'next/navigation';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('HomeBtn', () => {
  it('renders correctly and navigates to the correct path on click', () => {
    const mockedRouter = {
      push: vi.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockedRouter);

    render(<BackBtn path="/dashboard/products" />);

    const button = screen.getByRole('button', { name: /back/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockedRouter.push).toHaveBeenCalledWith('/dashboard/products');
  });
});