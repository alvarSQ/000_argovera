declare interface IProduct {
  id: number;
  slug: string;
  name: string;
  description: string;
  image: string;
  seoDescription: string;
  seoKeywords: string;
  price: number;
  scores: number;
  code: number;
  discountPercentage: number;
  rating: number;
  voices: number;
  views: number;
  weigh: string;
  reviews: string[];
  visibility: boolean;
  favoritesCount: number;
  createdAt: string;
  categories: ICategories;
  brands: IBrands;
  favorited: boolean;
}
