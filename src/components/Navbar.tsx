import { Link } from "react-router-dom";
import { type CartItem } from "../types";

interface NavbarProps {
  cart: CartItem[];
}

const Navbar = ({ cart }: NavbarProps) => {
  // Add together the quantity of every product
  // Example: Laptop × 2 + Mouse × 1 = 3
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="flex items-center justify-between bg-black px-6 py-4 text-white">
      {/* VibeCart logo/name */}
      <Link to="/" className="text-2xl font-bold">
        VibeCart
      </Link>

      {/* Navigation links */}
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>

        <Link to="/cart" className="hover:text-gray-300">
          🛒 Cart {totalItems}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;