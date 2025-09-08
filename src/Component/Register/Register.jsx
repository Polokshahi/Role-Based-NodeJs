import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { sendEmailVerification } from "firebase/auth";

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
      alert("Password must be at least 6 characters, include 1 uppercase and 1 special character");
      setLoading(false);
      return;
    }

    try {
      const result = await createUser(email, password);
      const user = result.user;

      await sendEmailVerification(user);
      alert("Verification email sent! Check your inbox.");
      window.open("https://mail.google.com", "_blank");

      await axios.post("http://localhost:3000/users", { name, email, image: imageUrl });
      navigate("/login");
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

      navigate("/"); 
    } catch (err) {
      console.error(err.message);
      alert("Google login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg p-6 border-2">
        <h2 className="text-2xl font-bold text-center mb-6 text-black">Register</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          <input type="email" name="email" placeholder="Email" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          <input type="url" name="imageUrl" placeholder="Image URL" className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" />
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400" required />
          <button type="submit" disabled={loading} className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-cyan-400 to-purple-600 hover:opacity-90 transition">
            {loading ? "Processing..." : "REGISTER"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600 mb-2">Or sign up with Google:</p>
          <button onClick={handleGoogleLogin} disabled={loading} className="w-full py-2 rounded-md font-semibold bg-red-500 hover:bg-red-600 text-white transition">
            {loading ? "Processing..." : "Google Sign Up"}
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
