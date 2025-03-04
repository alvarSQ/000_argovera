declare interface ICart {
  id: number;
  userId: number;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  items: ICartItem[];
}