import {
    createBrowserRouter,
} from "react-router-dom";
import MailLayOut from "../LayOut/MailLayOut";
import Home from "../Component/Home";
import Error from "../Page/Error/Error";
import Register from "../Component/Register/Register";
import Login from "../Component/Login/Login";
import AllProduct from "../Component/All Product/AllProduct";
import AddProduct from "../Component/Add Product/AddProduct";
import Dashboard from "../Component/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Unauthorized from "../Component/Role-Based/Unauthorized";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MailLayOut></MailLayOut>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },


            {

                path: '/register',
                element: <Register></Register>,

            },


            {
                path: '/login',
                element: <Login></Login>

            },

            {

                path: '/allProduct',
                element: <AllProduct></AllProduct>,
                loader: () => fetch('http://localhost:3000/allproducts')

            },


            {

                path: '/addPtoduct',
                element: <AddProduct></AddProduct>


            },



            {
                path: '*',
                element: <Error></Error>
            },


            {

                path: '/dashboard',
                element: <PrivateRoute>
                    <Dashboard></Dashboard>
                </PrivateRoute>

            },

            {
                path: "/unauthorized",
                element: <Unauthorized />,
            }
        ]




    },


]);

export default router;

