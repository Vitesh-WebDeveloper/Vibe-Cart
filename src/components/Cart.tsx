import { Link } from "react-router-dom";
import { type CartItem } from "../types";

interface CartProps {
  cart: CartItem[];
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
}

const Cart = ({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
}: CartProps) => {
  // Calculate the total price of all products
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Show this when the cart has no products
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="mb-3 text-3xl font-bold text-gray-800">
          Your Cart
        </h1>

        <p className="mb-6 text-gray-500">
          Your cart is empty
        </p>

        <Link
          to="/"
          className="rounded-lg bg-black px-5 py-3 font-semibold text-white hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl p-6">
      <h1 className="mb-8 text-3xl font-bold text-gray-800">
        Your Cart
      </h1>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col gap-5 rounded-xl border border-gray-200 p-5 shadow-sm sm:flex-row sm:items-center"
          >
            {/* Product image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-32 w-32 object-contain"
            />

            {/* Product information */}
            <div className="flex-1">
              <h2 className="font-bold text-gray-800">
                {item.title}
              </h2>

              <p className="mt-2 text-green-600">
                ${item.price}
              </p>

              <p className="mt-1 text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="h-9 w-9 rounded border border-gray-300 text-lg hover:bg-gray-100"
              >
                −
              </button>

              <span className="min-w-8 text-center font-semibold">
                {item.quantity}
              </span>

              <button
                onClick={() => increaseQuantity(item.id)}
                className="h-9 w-9 rounded border border-gray-300 text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>

            {/* Remove button */}
            <button
              onClick={() => removeFromCart(item.id)}
              className="font-semibold text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Cart total */}
      <div className="mt-8 border-t border-gray-200 pt-6 text-right">
        <p className="text-2xl font-bold text-gray-800">
          Total: ${totalPrice.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default Cart;