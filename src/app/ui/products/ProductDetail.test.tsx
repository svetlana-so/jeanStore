// src/components/ProductDetail.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest'
import ProductDetail from './productDetails';
import { productMock } from '../../../lib/fixtures';
import { vi } from 'vitest';

vi.mock("next/navigation", () => ({
    useRouter() {
      return {
        prefetch: () => null
      };
    }
  }));



it('should render product images and handle click', () => {
    render(<ProductDetail product={productMock} />);
  
    const images = screen.getAllByAltText('/test-image-1.jpg');
    expect(images).toHaveLength(productMock.images.filter(image => image.url === '/test-image-1.jpg').length);
  
    
    fireEvent.click(images[0]);
    const mainImage = screen.getByAltText('Selected image of Test Brand');
    expect(mainImage).toHaveAttribute('src', '/test-image-1.jpg');
  });

it('renders product details correctly', () => {
    render(<ProductDetail product={productMock} />);
    
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Size')).toBeInTheDocument();
    expect(screen.getByText('Color')).toBeInTheDocument();
  }); 

  it('toggles the dropdown content', () => {
    render(<ProductDetail product={productMock} />);
    
    expect(screen.queryByText('Size Waist:')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Description'));
    expect(screen.getByText('Size Waist:')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Description'));
    expect(screen.queryByText('Size Waist:')).not.toBeInTheDocument();
  });
 
  it('handles button clicks', () => {
    render(<ProductDetail product={productMock} />);
    
    const addToBagButton = screen.getByText('ADD TO BAG');
    expect(addToBagButton).toBeInTheDocument();
    
    const favoriteButton = screen.getByText('FAVORITE');
    expect(favoriteButton).toBeInTheDocument();
  });