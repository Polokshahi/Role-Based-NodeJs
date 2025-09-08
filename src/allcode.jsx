import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { sendEmailVerification, getAuth } from "firebase/auth";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const imageUrl = form.imageUrl.value;

    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    if (!regex.test(password)) {
      alert(
        "Password must be at least 6 characters, include 1 uppercase and 1 special character"
      );
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      // Send email verification
      await sendEmailVerification(user);
      alert("Verification email sent! Please check your inbox.");
      window.open("https://mail.google.com", "_blank");

      // Save user to backend
      await axios.post("http://localhost:3000/users", {
        name,
        email,
        image: imageUrl,
      });

      // Navigate to email verification page
      navigate("/verify-email");
    } catch (err) {
      console.error(err.message);
      alert("Registration failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await googleLogin();
      const user = result.user;

      await axios.post("http://localhost:3000/users", {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      navigate("/"); // Redirect to home after login
    } catch (err) {
      console.error(err.message);
      alert("Google login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-purple-500 p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Register Form
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 transition"
          >
            {loading ? "Processing..." : "REGISTER"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 mb-2">Or sign up with Google:</p>
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-2 rounded-md font-semibold bg-red-500 hover:bg-red-600 text-white transition"
          >
            {loading ? "Processing..." : "Google Sign Up"}
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateProfile } from "firebase/auth";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      const result = await signIn(email, password);
      const user = result.user;

      if (!user.emailVerified) {
        setError("Your email is not verified. Please check your inbox.");
        return;
      }

      const res = await axios.get(`http://localhost:3000/users/${user.email}`);
      const backendUser = res.data;

      if (backendUser?.name || backendUser?.image) {
        await updateProfile(user, {
          displayName: backendUser.name || user.displayName,
          photoURL: backendUser.image || user.photoURL,
        });
      }

      navigate("/");
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      if (!user.emailVerified) {
        alert("Not Verified! Please verify your Google account first.");
        return;
      }

      await axios.post("http://localhost:3000/users", {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      navigate("/");
    } catch (err) {
      console.error("Google login error:", err.message);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-purple-500 p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 relative">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">
          Login Form
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email or Phone"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
            <div className="text-right mt-1">
              <a
                href="#"
                className="text-sm text-blue-500 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 transition"
          >
            LOGIN
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Not a member?{" "}
          <Link to={'/register'}  className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;



import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import app from "../Firebase/Firebase.init";
import axios from "axios";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleProvider = new GoogleAuthProvider();
  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const logOut = () => signOut(auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email) {
        const res = await axios.get(
          `http://localhost:3000/users/${currentUser.email}`
        );
        setRole(res.data?.role || "user");
      } else {
        setRole(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    signIn,
    googleLogin,
    logOut,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;




import { Link, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import axios from "axios";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);

  // Fetch user role from backend
  useEffect(() => {
    if (user?.email) {
      axios.get(`http://localhost:3000/users/${user.email}`)
        .then(res => setRole(res.data.role))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (loading) {
    return <div className="bg-black w-full h-16"></div>; // loading placeholder
  }

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-gray-400" : "text-white hover:text-gray-400 transition-colors"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/allproduct"
          className={({ isActive }) =>
            isActive ? "text-gray-400" : "text-white hover:text-gray-400 transition-colors"
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
                isActive ? "text-gray-400" : "text-white hover:text-gray-400 transition-colors"
              }
            >
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive ? "text-gray-400" : "text-white hover:text-gray-400 transition-colors"
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
    <div className="navbar w-full bg-black shadow-md px-10 z-50">
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

        <Link className="btn btn-ghost normal-case text-xl text-white font-bold" to="/">
          Store House
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4 font-medium">{links}</ul>
      </div>

      <div className="navbar-end gap-5">
        {/* Cart icon */}
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
              <span className="badge badge-sm indicator-item bg-white text-black">0</span>
            </Link>
          </div>
        </div>

        {/* Profile/avatar */}
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full border border-white">
                <img
                  src={user.photoURL || "https://via.placeholder.com/150/FFFFFF/000000/?text=User"}
                  alt="User Avatar"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-black rounded-box w-40 text-white text-center"
            >
              <li className="font-medium">{user.displayName || user.email}</li>
              <li>
                <button
                  onClick={logOut}
                  className="btn btn-sm border border-white text-white hover:bg-white hover:text-black mt-2"
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
              className="btn border border-white text-white hover:bg-white hover:text-black transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="btn bg-white text-black hover:bg-gray-300 transition"
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



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const VerifyEmail = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const checkVerification = () => {
      auth.currentUser.reload().then(() => {
        if (auth.currentUser.emailVerified) {
          setVerified(true);
          navigate("/"); // Redirect after verification
        }
      });
    };

    const interval = setInterval(checkVerification, 3000);
    return () => clearInterval(interval);
  }, [auth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Verify Your Email</h2>
        <p>
          A verification link has been sent to your email. Please click it and wait a moment.
        </p>
        <p className="mt-4 text-gray-500">
          {verified ? "Email verified! Redirecting..." : "Waiting for verification..."}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;





