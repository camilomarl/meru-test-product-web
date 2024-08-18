import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/auth/Login.tsx';
import './index.css';
import ErrorPage from './pages/error-page.tsx';
import ListProducts from './pages/products/ListProducts.tsx';
import EditProduct from './pages/products/EditProduct.tsx';
import ProtectedRoute from './components/routes/ProtectedRoute.tsx';
import { isAuthenticated } from './api/auth.ts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    element: <ProtectedRoute isAuthenticated={isAuthenticated()} />,
    children: [
      {
        path: '/products',
        element: <ListProducts />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/products/edit/:productId',
        element: <EditProduct />,
      },
      {
        path: '/products/new',
        element: <EditProduct />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
