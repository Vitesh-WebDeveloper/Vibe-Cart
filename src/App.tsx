import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { type Product, type CartItem } from "./types";

import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Toast from "./components/Toast";

const App = () => {
  // Load the saved cart from localStorage when the app starts
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("vibecart-cart");

    if (!savedCart) {
      return [];
    }

    try {
      return JSON.parse(savedCart) as CartItem[];
    } catch {
      return [];
    }
  });

  // Controls whether the toast is visible
  const [showToast, setShowToast] = useState(false);

  // Changes whenever Add to Cart is clicked
  // so the toast timer starts again
  const [toastTrigger, setToastTrigger] = useState(0);

  // Add a product to the cart
  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      // Check if the product already exists
      const existingItem = currentCart.find(
        (item) => item.id === product.id
      );

      // If it exists, increase quantity
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      // If it doesn't exist, add it with quantity 1
      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });

    // Show the toast
    setShowToast(true);

    // Change the trigger so the timer starts again
    setToastTrigger((value) => value + 1);
  };

  // Increase the quantity of a product
  const increaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease the quantity of a product
  // If quantity becomes 0, remove the product
  const decreaseQuantity = (id: number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Completely remove a product from the cart
  const removeFromCart = (id: number) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Save the cart whenever it changes
  useEffect(() => {
    localStorage.setItem("vibecart-cart", JSON.stringify(cart));
  }, [cart]);

  // Hide the toast after 2 seconds
  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timer = setTimeout(() => {
      setShowToast(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toastTrigger]);

  return (
    <BrowserRouter>
      <Navbar cart={cart} />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/product/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toast
        message="Added to cart"
        visible={showToast}
      />
    </BrowserRouter>
  );
};

export default App;