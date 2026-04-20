import { createBrowserRouter } from "react-router";
import { HomePage } from "./pages/HomePage";
import { CartPage } from "./pages/CartPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { ConfirmationPage } from "./pages/ConfirmationPage";
import { OrderHistoryPage } from "./pages/OrderHistoryPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminProductsPage } from "./pages/AdminProductsPage";
import { AdminOrdersPage } from "./pages/AdminOrdersPage";
import { AdminSettingsPage } from "./pages/AdminSettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/cart",
    Component: CartPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/checkout",
    Component: CheckoutPage,
  },
  {
    path: "/confirmation",
    Component: ConfirmationPage,
  },
  {
    path: "/orders",
    Component: OrderHistoryPage,
  },
  {
    path: "/admin",
    Component: AdminDashboardPage,
  },
  {
    path: "/admin/products",
    Component: AdminProductsPage,
  },
  {
    path: "/admin/orders",
    Component: AdminOrdersPage,
  },
  {
    path: "/admin/settings",
    Component: AdminSettingsPage,
  },
  {
    path: "*",
    Component: NotFoundPage,
  },
]);