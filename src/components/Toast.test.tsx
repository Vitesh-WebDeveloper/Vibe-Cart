import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import Toast from './Toast';

describe('Toast Component', () => {
  test('renders message when visible is true', () => {
    render(
      <Toast
        message="Item added to cart"
        visible={true}
      />
    );

    expect(
      screen.getByText(/Item added to cart/i)
    ).toBeInTheDocument();
  });

  test('renders nothing when visible is false', () => {
    const { container } = render(
      <Toast
        message="Item added to cart"
        visible={false}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
