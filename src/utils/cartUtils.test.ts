import { describe, it, expect } from 'vitest';
import { calculateTotal } from './cartUtils';

describe('calculateTotal', () => {
  it('correctly calculates total price', () => {
    const mockCart = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 1 }
    ];

    const result = calculateTotal(mockCart);

    expect(result).toBe(25);
  });

  it('returns 0 for an empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });
});