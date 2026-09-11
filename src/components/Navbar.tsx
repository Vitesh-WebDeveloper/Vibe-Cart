import { Link } from "react-router-dom";
import { type CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
}

const Navbar = ({ cart }: NavbarProps) => {
  // --- 1. CART LOGIC ---
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity, 0
  );

  // --- 2. AUTH LOGIC ---
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.href = '/login'; 
  };

  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
      <Link to="/" className="text-2xl font-bold">
        VibeCart
      </Link>

      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        {/* Your protected Cart counter */}
        <Link to="/cart" className="hover:text-gray-300">
          🛒 Cart {totalItems}
        </Link>

        {/* 3. The Authentication UI */}
        {token ? (
          <>
            <span className="text-green-400 font-semibold">{userName}</span>
            <button onClick={handleLogout} className="hover:text-gray-300 font-bold">Logout</button>
          </>
        ) : (
          <Link to="/login" className="hover:text-gray-300 font-bold">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;