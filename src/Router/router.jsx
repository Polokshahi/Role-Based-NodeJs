import { createBrowserRouter } from "react-router-dom";
import MailLayOut from "../LayOut/MailLayOut";
import Home from "../Component/Home";
import Dashboard from "../Component/Dashboard/Dashboard";
import AllProduct from "../Component/All Product/AllProduct";
import Error from "../Page/Error/Error";
import AddProduct from "../Component/Add Product/AddProduct";
import AddtoCart from "../Page/AddtoCart/AddtoCart";
import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "../Page/VerifyEmail";
import Login from "../Component/Login/Login";
import Register from "../Component/Register/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MailLayOut />,
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      {
        path:'/addtocart', 
        element:<AddtoCart></AddtoCart>,
        loader: () => fetch('http://localhost:3000/addtoCart'),
      
      
      }, 

      {
          path: '/verify-email',
          element: <VerifyEmail></VerifyEmail>
      },
      
      
      
      
      


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

    

    

      // Catch-all route for 404
      { path: "*", element: <Error /> },
    ],
  },
]);

export default router;
