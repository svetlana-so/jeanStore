import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Card } from '../app/ui/products/card'; 

import { productMock } from '../lib/fixtures';

describe('Card Component', () => {
  it('renders product brand and price correctly', () => {
    render(<Card product={productMock} />);
    
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
  });

  it('renders all product images in carousel', () => {
    render(<Card product={productMock} />);
    
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/test-image-1.jpg');
    expect(images[1]).toHaveAttribute('src', '/test-image-2.jpg');
  });

  it('calls onClick handler when image is clicked', () => {
    const handleClick = vi.fn();
    render(<Card product={productMock} onClick={handleClick} />);
    
    const image = screen.getAllByRole('img')[0];
    fireEvent.click(image);
    
    expect(handleClick).toHaveBeenCalled();
  });
});
