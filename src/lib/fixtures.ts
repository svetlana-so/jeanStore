import { ProductWithImage } from '@/app/lib/definitions';

export const productMock: ProductWithImage = {
  id: '1',
  category: 'men',
  brand: 'Test Brand',
  price: 100,
  size_label: 'M',
  color: 'Red',
  size_waist: '32',
  size_length: '34',
  fit: 'Slim',
  material: 'Denim',
  stretch: 'Medium',
  measurement_hip: 38,
  measurement_front_crotch: 10,
  measurement_back_crotch: 12,
  measurement_thigh: 20,
  measurement_inseam: 30,
  date: '12-01-02',
  images: [
    { id: '1', url: '/test-image-1.jpg' },
    { id: '2', url: '/test-image-2.jpg' },
  ],
};
