export interface CartCalculationItem {
  price: number;
  quantity: number;
}

export function calculateTotal(
  items: CartCalculationItem[]
): number {
  return items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}