
import Navbar from '../Page/Header/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Page/Footer/Footer';

const Home = () => {
    return (
        <div>

            <Navbar></Navbar>

            <Outlet></Outlet>

            <Footer></Footer>


            
        </div>
    );
};

export default Home;