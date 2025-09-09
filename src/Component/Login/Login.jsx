import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn } = useContext(AuthContext);
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
        setError("Your email is not verified.");
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

      Swal.fire({
        position: "top-end", 
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 1500,
        toast: true, 
        showClass: {
          popup: `
      animate__animated
      animate__fadeInRight
      animate__faster
    `
        },
        hideClass: {
          popup: `
      animate__animated
      animate__fadeOutRight
      animate__faster
    `
        }
      });

    


      navigate("/");
    } catch (err) {
      console.error(err.message);
      setError(err.message);
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 border-2">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input type="email" name="email" placeholder="Email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          <input type="password" name="password" placeholder="Password" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 transition">LOGIN</button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Not a member? <Link to='/register' className="text-blue-500 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
