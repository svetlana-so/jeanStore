import { ProductWithImage } from "@/app/lib/definitions";
import { Chance } from 'chance'

export const random = process.env.CI ? Chance(1) : Chance()


const createFakeProduct = (): ProductWithImage => ({
    id: '1c711908-4193-47cf-8ae9-18dafb6c6575',
    brand: "Levi's",
    size_label: '20',
    size_waist: '28',
    size_length: '34',
    color: 'Khaki',
    fit: 'Regular',
    material: 'Denim',
    stretch: 'Non-stretch',
    measurement_hip: 46,
    measurement_front_crotch: 11,
    measurement_back_crotch: 14,
    measurement_thigh: 20,
    measurement_inseam: 33,
    price: 360,
    category: 'Men',
    date: new Date().toISOString(),
    in_stock: true,
    images: [
      {
        id: 'image-1',
        url: random.url()
      },
      {
        id: 'image-2',
        url: random.url(),
      },
    ],
  });
  
  export { createFakeProduct };