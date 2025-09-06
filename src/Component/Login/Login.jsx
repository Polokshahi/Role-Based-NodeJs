import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";
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
      // Sign in with email/password
      const result = await signIn(email, password);
      const user = result.user;

      // Fetch user info from backend
      const res = await axios.get(`http://localhost:3000/users/${user.email}`);
      const backendUser = res.data;

      // Update Firebase profile if name or image exists in backend
      if (backendUser?.name || backendUser?.image) {
        await updateProfile(user, {
          displayName: backendUser.name || user.displayName,
          photoURL: backendUser.image || user.photoURL,
        });
      }

      navigate("/"); // redirect after successful login
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      // Add/update user in backend
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
    <div className="min-h-screen bg-[#262626] flex items-center justify-center p-4">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-md">
        <div className="card flex-shrink-0 w-full shadow-2xl bg-[#1d232a]">
          <form onSubmit={handleLogin} className="card-body space-y-4">
            <h2 className="text-2xl font-bold mb-4 text-center text-yellow-400">Login</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-400">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered focus:ring-yellow-400"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-yellow-400">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered focus:ring-yellow-400"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover text-yellow-400">Forgot password?</a>
              </label>
            </div>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <div className="form-control mt-6 flex flex-col gap-2">
              <button type="submit" className="btn bg-yellow-400 text-black hover:bg-yellow-500">Login</button>
              <button type="button" onClick={handleGoogleLogin} className="btn bg-red-600 text-white">
                Google Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
