import { createBrowserRouter } from "react-router-dom";
import MailLayOut from "../LayOut/MailLayOut";
import Home from "../Component/Home";
import Register from "../Component/Register/Register";
import Login from "../Component/Login/Login";
import Dashboard from "../Component/Dashboard/Dashboard";
import AllProduct from "../Component/All Product/AllProduct";
import PrivateRoute, { AdminRoute } from "./PrivateRoute";
import Admin from "../Role/Admin";
import Unauthorized from "../Role/Unauthorized";
import Error from "../Page/Error/Error";
import AddProduct from "../Component/Add Product/AddProduct";
import AddtoCart from "../Page/AddtoCart/AddtoCart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MailLayOut />,
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      {path:'/addtocart', element:<AddtoCart></AddtoCart>},

      // Products routes
      {
        path: "/allproduct", // lowercase
        element: <AllProduct />,
        loader: () => fetch("http://localhost:3000/allproducts"),
      },
      {
        path: "/addProduct",
        element: <PrivateRoute>
            <AddProduct></AddProduct>
        </PrivateRoute>,
      },

      // Dashboard route (private)
      {
        path: "/dashboard",
        element: <PrivateRoute>
          <Dashboard></Dashboard>,
          
          </PrivateRoute>,
          loader: () => fetch('http://localhost:3000/users')
      },

      // Admin route (role-based)
      {
        path: "/admin",
        element: <AdminRoute><Admin /></AdminRoute>,
      },

      // Unauthorized page
      { path: "/unauthorized", element: <Unauthorized /> },

      // Catch-all route for 404
      { path: "*", element: <Error /> },
    ],
  },
]);

export default router;
