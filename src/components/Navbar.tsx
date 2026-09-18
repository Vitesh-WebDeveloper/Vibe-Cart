import { Link } from "react-router-dom";
import { type CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
}

const Navbar = ({ cart }: NavbarProps) => {
  // --- JOB 1: CART LOGIC (Your existing code) ---
  // Add together the quantity of every product
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // --- JOB 2: AUTH LOGIC (The new Step 4 code) ---
  // Look inside the browser wallet to see if a token and name exist
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');

  // The Logout function clears the wallet and forces a page refresh to reset the UI
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    window.location.reload(); 
  };

  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
      {/* VibeCart logo/name */}
      <Link to="/" className="text-2xl font-bold">
        VibeCart
      </Link>

      {/* Navigation & Auth links */}
      <div className="flex items-center gap-6">
        
        {/* Standard Links */}
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        <Link to="/cart" className="hover:text-gray-300">
          🛒 Cart {totalItems > 0 ? `(${totalItems})` : ''}
        </Link>

        {/* AUTH UI: We use a visual divider (border-l) to separate shop links from account links */}
        <div className="flex items-center gap-4 border-l border-gray-600 pl-4">
          {token ? (
            // If the user IS logged in:
            <>
              <span className="text-green-400">Hi, {userName}</span>
              <button 
                onClick={handleLogout} 
                className="text-red-400 hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            // If the user is NOT logged in:
            <>
              <Link to="/login" className="hover:text-blue-300 transition-colors">
                Login
              </Link>
              <Link to="/signup" className="bg-blue-600 px-4 py-1.5 rounded font-medium hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;