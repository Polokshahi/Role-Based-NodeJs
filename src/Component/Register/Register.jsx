import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const imageUrl = form.imageUrl.value;

    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
    if (!regex.test(password)) {
      alert("Password must be at least 6 characters, include 1 uppercase and 1 special character");
      return;
    }

    try {
      // Create user in Firebase
      await createUser(email, password);

      // Add user to backend with default role
      await axios.post("http://localhost:3000/users", { name, email, image: imageUrl });

      // Navigate to login page WITHOUT updating profile here
      navigate("/login");
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // Add user to backend with default role
      await axios.post("http://localhost:3000/users", {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });

      navigate("/");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 rounded-xl shadow-lg bg-[#1d232a]">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-400">
          Register
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="w-full px-4 py-3 rounded-lg shadow-inner border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg shadow-inner border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            className="w-full px-4 py-3 rounded-lg shadow-inner border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg shadow-inner border border-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
          <button
            type="submit"
            className="w-full py-3 rounded-lg font-bold bg-blue-700 text-white"
          >
            Register
          </button>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-lg font-bold mt-2 bg-red-600 text-white"
          >
            Google Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
