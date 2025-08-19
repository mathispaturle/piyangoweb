export type Raffle = {
  id: string;
  title: string;
  description: string;
  draw_date?: any;
  imageUrl?: string;
  product_characteristics?: Object[]
  images: string[];
  category?: string;
  sponsor_image?: string;
  sponsor_name?: string;
  sponsor_description?: string;
  sponsor_store_direction?: string;
  price_ticket?: number;
};