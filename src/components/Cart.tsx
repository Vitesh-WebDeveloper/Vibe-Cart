import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Calculate the total price of all products
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // --- CHECKOUT LOGIC: CONNECTS THE BUTTON TO YOUR BACKEND API ---
  const handleCheckout = async () => {
    const token = localStorage.getItem('token');

    // 1. If user is not logged in, prompt them to log in first
    if (!token) {
      alert("Please log in to place an order!");
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      // 2. Send POST request to your backend /api/orders
      const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Sends the JWT token for authentication
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to place order');
      }

      // 3. SUCCESS! Show confirmation popup
      alert(`🎉 Order Placed Successfully!`);

      // 4. Refresh to reset the cart state after checkout
      window.location.reload();

    } catch (error: any) {
      alert(`Error placing order: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Show this when the cart has no products
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center text-center p-4">
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
    <div className="mx-auto max-w-5xl p-4 sm:p-6">
      
      {/* HEADER: The Total is now at the Top Right */}
      <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Your Cart
        </h1>
        <div className="text-lg sm:text-2xl font-bold text-gray-800">
          Total: <span className="text-green-600">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            // MOBILE: flex-col and items-center centers everything. 
            // DESKTOP: sm:flex-row puts it in a line.
            className="flex flex-col sm:flex-row items-center gap-5 rounded-xl border border-gray-200 p-5 shadow-sm"
          >
            {/* Product image */}
            <img
              src={item.image}
              alt={item.title}
              className="h-32 w-32 object-contain"
            />

            {/* Product information (Centered on mobile, left-aligned on desktop) */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="font-bold text-gray-800">
                {item.title}
              </h2>
              <p className="mt-2 text-green-600 font-bold">
                ${item.price}
              </p>
              <p className="mt-1 text-gray-500">
                Quantity: {item.quantity}
              </p>
            </div>

            {/* Quantity controls and Remove button */}
            <div className="flex flex-col items-center gap-4 sm:gap-6">
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 text-lg hover:bg-gray-100"
                >
                  -
                </button>
                <span className="min-w-[2rem] text-center font-semibold">
                  {item.quantity}
                </span>
                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="flex h-9 w-9 items-center justify-center rounded border border-gray-300 text-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeFromCart(item.id)}
                className="font-semibold text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CHECKOUT BUTTON: Tied to handleCheckout with loading state */}
      <div className="mt-8 flex justify-center sm:justify-end">
        <button 
          onClick={handleCheckout}
          disabled={loading}
          className="w-full sm:w-auto rounded-lg bg-blue-600 px-8 py-3 font-bold text-white hover:bg-blue-700 transition-colors disabled:bg-gray-400"
        >
          {loading ? "Placing Order..." : "Checkout / Place Order"}
        </button>
      </div>

    </div>
  );
};

export default Cart;