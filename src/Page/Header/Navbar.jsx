import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";

const Navbar = () => {
    const { user, logOut, loading } = useContext(AuthContext);
    const image = user?.photoURL;

    if (loading) {
        return <div className="bg-black w-full h-16"></div>; // maintain space while loading
    }

    const links = (
        <>
            <li><Link to="/" className="hover:text-yellow-400 transition-colors text-white">Home</Link></li>
            <li><Link to="/allProduct" className="hover:text-yellow-400 transition-colors text-white">All Product</Link></li>
            <li><Link to="/addPtoduct" className="hover:text-yellow-400 transition-colors text-white">Add Product</Link></li>
            <li><Link to="/dashboard" className="hover:text-yellow-400 transition-colors text-white">Dashboard</Link></li>
        </>
    );

    return (
        <div className="navbar fixed top-0 left-0 w-full bg-black shadow-md px-10 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <Link className="btn btn-ghost normal-case text-xl text-yellow-400 font-bold" to="/">MyApp</Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-4 font-medium">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-5">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    src={image || "https://via.placeholder.com/150/000000/FFFFFF/?text=User"}
                                    alt="User Avatar"
                                />
                            </div>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-black rounded-box w-40 text-white text-center">
                            <li className="font-medium">{user.displayName || "User"}</li>
                            <li>
                                <button
                                    onClick={logOut}
                                    className="btn btn-sm border border-red-500 text-red-500 hover:bg-red-500 hover:text-white mt-2"
                                >
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="btn border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition">
                            Login
                        </Link>
                        <Link to="/register" className="btn bg-yellow-400 text-black hover:bg-yellow-500 transition">
                            Register
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
