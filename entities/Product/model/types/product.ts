interface Rating {
  rate: number,
  count: number
}

export interface ProductI {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  price: number;
  rating: Rating;
}