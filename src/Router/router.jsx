import {
  createBrowserRouter,
} from "react-router-dom";
import MailLayOut from "../LayOut/MailLayOut";
import Home from "../Component/Home";
import Error from "../Page/Error/Error";

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
        path: '*',
        element: <Error></Error>
    }
   ]
   
   
  },
]);

export default router;

