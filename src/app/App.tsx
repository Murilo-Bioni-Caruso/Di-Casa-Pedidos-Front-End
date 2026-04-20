import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './contexts/CartContext';
import { UserProvider } from './contexts/UserContext';
import { OrderProvider } from './contexts/OrderContext';
import { RestaurantProvider } from './contexts/RestaurantContext';

export default function App() {
  return (
    <RestaurantProvider>
      <UserProvider>
        <OrderProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </OrderProvider>
      </UserProvider>
    </RestaurantProvider>
  );
}