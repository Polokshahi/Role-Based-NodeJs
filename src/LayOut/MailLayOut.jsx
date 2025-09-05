import { Outlet } from "react-router-dom";
import Navbar from "../Page/Header/Navbar";
import Footer from "../Component/Footer/Footer";


const MailLayOut = () => {
    return (
        <div>

            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>

        </div>
    );
};

export default MailLayOut;