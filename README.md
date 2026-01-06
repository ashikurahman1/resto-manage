# RestoManage - Premium Restaurant Management (Frontend)

| Home Page | Admin Dashboard |
| :---: | :---: |
| ![Home Page](src/assets/Screenshots/home_page.png) | ![Admin Dashboard](src/assets/Screenshots/admin_dash.png) |

## Project Overview
RestoManage Frontend is a high-performance, visually stunning web application designed for modern restaurant operations. It provides a seamless experience for both customers browsing the menu and administrators managing the business through a sophisticated dashboard.

## Key Features
- **Premium User Experience**: Built with modern aesthetics, smooth Framer Motion animations, and a responsive glassmorphism navbar.
- **Dynamic Menu Management**: Admins can Add, Edit, and Delete menu items in real-time with automatic UI updates using React Query.
- **Advanced Data Visualization**: Integrated **Recharts** for real-time revenue analytics and performance tracking in the Admin Dashboard.
- **Role-Based Dashboards**: Distinct, protected environments for Admins (Inventory & Orders) and Members (Order History & Tracking).
- **Intelligent Routing**: Smart login redirection and protected routes powered by custom Auth logic.
- **Mobile Optimized**: A fully responsive architecture with a custom slide-over mobile navigation system.

## Tech Stack
- **Framework**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI 5](https://daisyui.com/)
- **State Management**: [TanStack Query (React Query)](https://tanstack.com/query/latest)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Icons**: [React Icons (Material Design)](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and add:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

---

