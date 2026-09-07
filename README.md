# VibeCart 🛒

VibeCart is a beginner-friendly shopping cart application built with React, TypeScript, Tailwind CSS, and React Router.

The project focuses on understanding React fundamentals by building a complete cart flow without using unnecessary abstractions.

## Features

- Fetches products from FakeStore API
- Responsive product grid
- Product detail page
- React Router navigation
- Add products to cart
- Increase and decrease product quantity
- Remove products from cart
- Automatic cart total calculation
- Cart item count in the Navbar
- Toast notification when a product is added
- Cart persistence using localStorage
- Empty cart state
- 404 Not Found page

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- Vite
- FakeStore API
- Browser localStorage

## Project Structure

```text
src/
├── components/
│   ├── Home.tsx
│   ├── ProductDetail.tsx
│   ├── NotFound.tsx
│   ├── Navbar.tsx
│   ├── Cart.tsx
│   └── Toast.tsx
│
├── App.tsx
├── main.tsx
└── types.ts