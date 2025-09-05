
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="navbar bg-primary text-primary-content px-6">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost normal-case text-xl">
                    KidsHome
                </Link>
            </div>
            <div className="flex-none gap-2">
                <Link to="/" className="btn btn-ghost">
                    Home
                </Link>
                <Link to="/about" className="btn btn-ghost">
                    About
                </Link>
                <Link to="/contact" className="btn btn-ghost">
                    Contact
                </Link>
                <button className="btn btn-secondary">Login</button>
            </div>
        </div>
    );
};

export default Navbar;