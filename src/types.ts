// Defines what details a product must have.
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string; // URL as string for the product thumbnail
  rating: {
    rate: number;
    count: number;
  };
}

// Adds a quantity field to the product for the shopping cart.
export interface CartItem extends Product{
  quantity: number;
}
