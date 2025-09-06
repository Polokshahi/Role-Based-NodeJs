import { useContext, useState } from "react";
import { AuthContext } from "../../AuthContext/AuthProvider";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const { createUser, googleLogin } = useContext(AuthContext);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const imageUrl = form.imageUrl.value;
        const email = form.email.value;

        // Validate password before submitting
        const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
        if (!regex.test(password)) {
            alert("Password must be at least 6 characters, include 1 uppercase and 1 special character.");
            return;
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log("Registered User:", user);

                // Optionally update profile with name & photo
                if (name || imageUrl) {
                    import("firebase/auth").then(({ updateProfile }) => {
                        updateProfile(user, {
                            displayName: name,
                            photoURL: imageUrl
                        }).then(() => {
                            console.log("Profile updated");
                            navigate('/login');
                        }).catch(err => console.error(err));
                    });
                }
            })
            .catch(error => {
                console.error("Registration Error:", error.message);
            });
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log("Google Login User:", result.user);
            })
            .catch(error => {
                console.error("Google Login Error:", error.message);
            });
    };

    // Password conditions
    const conditions = [
        { label: "At least 6 characters", valid: password.length >= 6 },
        { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
        { label: "One special character (!@#$%^&*)", valid: /[!@#$%^&*]/.test(password) },
    ];

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center">
            <div className="hero-content flex-col lg:flex-row-reverse w-full">
                <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                    <form onSubmit={handleRegister} className="card-body">
                        {/* Name input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Image URL input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Image URL</span>
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                placeholder="Enter image URL"
                                className="input input-bordered"
                            />
                        </div>

                        {/* Email input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="input input-bordered"
                                required
                            />
                        </div>

                        {/* Password input */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                className="input input-bordered"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            {/* Live password conditions */}
                            <ul className="text-sm mt-2 ml-2">
                                {conditions.map((cond, i) => (
                                    <li key={i} className={cond.valid ? "text-green-500" : "text-red-500"}>
                                        {cond.label}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Submit button */}
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Register</button>
                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className="btn bg-red-600 text-white mt-2"
                            >
                                Google Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
