import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(null);

  const fetchUserData = async (email) => {
    try {
      const res = await axios.get(`http://localhost:3000/users/${email}`);
      setRole(res.data.role);
      setName(res.data.name);
      setAvatar(res.data.image);
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setRole(null);
      setName(null);
      setAvatar(null);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchUserData(user.email);
    } else {
      setRole(null);
      setAvatar(null);
      setName(null);
    }
  }, [user]);

  if (loading) {
    return <div className="bg-gray-900 w-full h-16"></div>;
  }

  const showAvatar = user && user.emailVerified;

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-gray-400"
              : "text-white hover:text-gray-400 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allproduct"
          className={({ isActive }) =>
            isActive
              ? "text-gray-400"
              : "text-white hover:text-gray-400 transition-colors"
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
                isActive
                  ? "text-gray-400"
                  : "text-white hover:text-gray-400 transition-colors"
              }
            >
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-gray-400"
                  : "text-white hover:text-gray-400 transition-colors"
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-gray-900 shadow-md px-10 py-3 flex items-center justify-between relative z-50">
      {/* Left side logo */}
      <Link className="text-white font-bold text-xl" to="/">
        Store House
      </Link>

      {/* Center links */}
      <div className="hidden lg:flex">
        <ul className="flex gap-8 font-medium">{links}</ul>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Cart icon */}
        <div>
          <div className="indicator">
            <Link to="/addtocart">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
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
              <span className="badge badge-sm indicator-item bg-white text-black">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Profile/avatar or login/register */}
        {showAvatar ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-white">
                <img
                  src={
                    avatar ||
                    user.photoURL ||
                    "https://via.placeholder.com/150/FFFFFF/000000/?text=User"
                  }
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-gray-800 rounded-md w-40 text-white text-center z-50"
            >
              <li className="font-medium">
                {name || user.displayName || user.email}
              </li>
              <li>
                <button
                  onClick={logOut}
                  className="btn btn-sm rounded-full bg-gray-700 text-white hover:bg-gray-600 mt-2"
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
              className="px-4 py-2 rounded-full border border-cyan-600 text-cyan-600 hover:bg-cyan-600 hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-full bg-cyan-600 text-white hover:bg-cyan-700 transition"
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
