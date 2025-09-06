import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  // Fetch role for current user
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/users/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.error("Failed to fetch role:", err));
    }
  }, [user]);

  if (loading) {
    return <div className="bg-black w-full h-16"></div>; // maintain space while loading
  }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "text-white hover:text-yellow-400 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allproduct"
          className={({ isActive }) =>
            isActive ? "text-yellow-400" : "text-white hover:text-yellow-400 transition-colors"
          }
        >
          All Product
        </NavLink>
      </li>
      {role === "admin" && (
        <>
          <li>
            <NavLink
              to="/addProduct"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "text-white hover:text-yellow-400 transition-colors"
              }
            >
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-yellow-400" : "text-white hover:text-yellow-400 transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const image = user?.photoURL;

  return (
    <div className="navbar fixed top-0 left-0 w-full bg-black shadow-md px-10 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-black rounded-box w-52"
          >
            {links}
          </ul>
        </div>

        <Link
          className="btn btn-ghost normal-case text-xl text-yellow-400 font-bold"
          to="/"
        >
          Store House
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">{links}</ul>
      </div>

      <div className="navbar-end gap-5">
        <div className="mt-3">
          <div className="indicator">
            <Link to="/addtocart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </Link>
          </div>
        </div>

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
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-black rounded-box w-40 text-white text-center"
            >
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
            <Link
              to="/login"
              className="btn border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-yellow-400 text-black hover:bg-yellow-500 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
