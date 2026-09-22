# VibeCart — Modern Full-Stack E-Commerce Application

VibeCart is a production-grade e-commerce application built from scratch with a decoupled React/TypeScript client and a secure Node.js/Express REST API. 

> **Note to Reviewers:** The backend API is hosted on a free Render instance. It may take 5 seconds to spin up on the very first initial load. Thank you for your patience!

## 🚀 Live Demo & Links
- **Live Application:** https://vibe-cart-omega.vercel.app/
- **Live API Health Check:** https://vibecart-backend-43bl.onrender.com/api/health
- **Demo Walkthrough Video:** https://www.linkedin.com/feed/update/urn:li:activity:7508059716086960128/

## 🛠️ Architecture & Tech Stack
- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router DOM
- **Backend:** Node.js, Express.js, Mongoose 
- **Database:** MongoDB Atlas
- **Authentication:** Stateless JWT auth, `bcryptjs` password hashing, Custom Authorization Middleware
- **Deployment:** Vercel (Frontend CDN), Render (Backend Web Service)

## 🔑 Key Features
1. **Stateless JWT Authentication:** Secure registration and login issuing signed JSON Web Tokens stored locally.
2. **Authenticated Cart & Orders:** Database-backed persistent user carts and order creation.
3. **Role-Based Access Control (RBAC):** Admin-gated product management endpoints secured via custom middleware.
4. **Responsive UI:** Fully mobile-optimized interface with skeleton loading states for a polished user experience.
5. **Automated Testing:** Unit tests for calculations and component rendering tests utilizing Vitest & React Testing Library.

## 💻 Local Development Setup

To run this project locally, you will need Node.js and a MongoDB instance running.

**1. Clone the repository:**
```bash
git clone https://github.com/Vitesh-WebDeveloper/Vibe-Cart
cd Vibe-Cart
