export type Invoice = {
  id: string;
  customer_id: string;
  amount: number;
  date: string;
  status: 'pending' | 'paid';
};

export type User = {
  id: string;
  role: string;
  email: string;
  password: string;
};

export type Product = {
  id: string;
  brand: string;
  //...
  date: string;
};

export type Image = {
  id: string;
  url: string;
};

export interface ProductWithImage {
  id: number;
  brand: string;
  price: number;
  images: Image[];
}

export const jeansColors = [
  { key: "blue", label: "Blue" },
  { key: "darkBlue", label: "Dark Blue" },
  { key: "lightBlue", label: "Light Blue" },
  { key: "black", label: "Black" },
  { key: "gray", label: "Gray" },
  { key: "white", label: "White" },
  { key: "indigo", label: "Indigo" },
  { key: "navy", label: "Navy" },
  { key: "charcoal", label: "Charcoal" },
  { key: "midnightBlue", label: "Midnight Blue" },
  { key: "acidWash", label: "Acid Wash" },
  { key: "stoneWash", label: "Stone Wash" },
  { key: "vintageWash", label: "Vintage Wash" },
  { key: "sand", label: "Sand" },
  { key: "khaki", label: "Khaki" },
  { key: "olive", label: "Olive" },
  { key: "maroon", label: "Maroon" },
  { key: "rust", label: "Rust" },
  { key: "brown", label: "Brown" },
  { key: "beige", label: "Beige" },
  { key: "teal", label: "Teal" },
  { key: "red", label: "Red" },
  { key: "burgundy", label: "Burgundy" },
  { key: "green", label: "Green" },
  { key: "purple", label: "Purple" },
  { key: "pink", label: "Pink" }
];


