import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login.tsx';
import './index.css';
import App from './App.tsx';
import ErrorPage from './pages/error-page.tsx';
import ListProducts from './pages/products/ListProducts.tsx';
import EditProduct from './pages/products/EditProduct.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/products',
    element: <ListProducts />,
    errorElement: <ErrorPage />,
  },
  {
    path: 'products/:productId',
    element: <EditProduct />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
