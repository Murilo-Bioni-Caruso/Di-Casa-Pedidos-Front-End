// Controller: Order Context for managing orders
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Order, OrderStatus } from '../models/types';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getUserOrders: (userEmail: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  getTodayOrders: () => Order[];
  getTodayRevenue: () => number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>(() => {
    // Load orders from localStorage
    const saved = localStorage.getItem('dicasa-orders');
    return saved ? JSON.parse(saved) : [];
  });

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dicasa-orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prevOrders => [order, ...prevOrders]);
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );
  };

  const getUserOrders = (userEmail: string) => {
    return orders.filter(order => order.user.email === userEmail);
  };

  const getOrderById = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  const getTodayOrders = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return orders.filter(order => {
      const orderDate = new Date(order.timestamp);
      return orderDate >= today && orderDate < tomorrow;
    });
  };

  const getTodayRevenue = () => {
    const todayOrders = getTodayOrders();
    return todayOrders.reduce((total, order) => total + order.total, 0);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        addOrder,
        updateOrderStatus,
        getUserOrders,
        getOrderById,
        getTodayOrders,
        getTodayRevenue
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
