import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { signIn, googleLogin } = useContext(AuthContext); // Firebase methods from your AuthProvider
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        setError(""); // reset previous errors

        signIn(email, password)
            .then(result => {
                console.log("Logged in user:", result.user);
                navigate('/');
                // You can redirect user or do other actions here
            })
            .catch(err => {
                console.error("Login error:", err.message);
                setError(err.message);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log("Google login user:", result.user);
            })
            .catch(err => {
                console.error("Google login error:", err.message);
                setError(err.message);
            });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
            <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-md">
                <div className="card flex-shrink-0 w-full shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Enter your password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

                        <div className="form-control mt-6 flex flex-col gap-2">
                            <button type="submit" className="btn btn-primary">Login</button>
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
