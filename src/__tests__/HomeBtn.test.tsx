import { render, screen, fireEvent } from '@testing-library/react';
import HomeBtn from '../app/ui/homeBtn';
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

    render(<HomeBtn path="/" />);

    const button = screen.getByRole('button', { name: /home/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockedRouter.push).toHaveBeenCalledWith('/');
  });
});
