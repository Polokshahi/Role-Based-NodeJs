// import { createContext, useEffect, useState } from "react";
// import {
//     getAuth,
//     createUserWithEmailAndPassword,
//     signInWithEmailAndPassword,
//     signInWithPopup,
//     GoogleAuthProvider,
//     onAuthStateChanged,
//     signOut
// } from "firebase/auth";
// import app from "../Firebase/Firebase.init";

// export const AuthContext = createContext(null);
// const auth = getAuth(app);

// const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [loading, setLoading] = useState(true); // add loading state

//     // Create user with email & password
//     const createUser = (email, password) => {
//         return createUserWithEmailAndPassword(auth, email, password);
//     };

//     // Sign in with email & password
//     const signIn = (email, password) => {
//         return signInWithEmailAndPassword(auth, email, password);
//     };

//     // Google login
//     const googleProvider = new GoogleAuthProvider();
//     const googleLogin = () => {
//         return signInWithPopup(auth, googleProvider);
//     };

//     // Logout
//     const logOut = () => {
//         return signOut(auth);
//     };

//     // Track logged-in user
//     useEffect(() => {
//         const unsubscribe = onAuthStateChanged(auth, currentUser => {
//             setUser(currentUser);
//             setLoading(false); // auth check done
//             console.log("Current user:", currentUser);
//         });
//         return () => unsubscribe();
//     }, []);

//     const authInfo = {
//         user,
//         loading, // expose loading state
//         createUser,
//         signIn,
//         googleLogin,
//         logOut,
//     };

//     return (
//         <AuthContext.Provider value={authInfo}>
//             {children}
//         </AuthContext.Provider>
//     );
// };

// export default AuthProvider;



// import React from 'react';

// const Admin = () => {
//     return (
//         <div>
            
//         </div>
//     );
// };

// export default Admin;




// import React, { useContext } from 'react';
// import { AuthContext } from '../AuthContext/AuthProvider';
// import { Navigate, useLocation } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//     const { user, loading } = useContext(AuthContext);
//     const location = useLocation();

//     if (loading) {
//         // Show loading indicator while auth state is being checked
//         return <span className="loading loading-dots loading-lg"></span>;
//     }

//     if (!user?.email) {
//         // Redirect to login if not logged in
//         return <Navigate to="/login" state={{from : location}} replace />;
//     }

//     // Render child components if user is logged in
//     return children;
// };

// export default PrivateRoute;











// import { useContext, useState } from "react";
// import { AuthContext } from "../../AuthContext/AuthProvider";
// import { useNavigate } from "react-router-dom";

// const Register = () => {
//     const { createUser, googleLogin } = useContext(AuthContext);
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     const handleRegister = e => {
//         e.preventDefault();
//         const form = e.target;
//         const name = form.name.value;
//         const imageUrl = form.imageUrl.value;
//         const email = form.email.value;

//         // Validate password before submitting
//         const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;
//         if (!regex.test(password)) {
//             alert("Password must be at least 6 characters, include 1 uppercase and 1 special character.");
//             return;
//         }

//         createUser(email, password)
//             .then(result => {
//                 const user = result.user;
//                 console.log("Registered User:", user);

//                 // Optionally update profile with name & photo
//                 if (name || imageUrl) {
//                     import("firebase/auth").then(({ updateProfile }) => {
//                         updateProfile(user, {
//                             displayName: name,
//                             photoURL: imageUrl
//                         }).then(() => {
//                             console.log("Profile updated");
//                             navigate('/login');
//                         }).catch(err => console.error(err));
//                     });
//                 }
//             })
//             .catch(error => {
//                 console.error("Registration Error:", error.message);
//             });
//     };

//     const handleGoogleLogin = () => {
//         googleLogin()
//             .then(result => {
//                 console.log("Google Login User:", result.user);
//             })
//             .catch(error => {
//                 console.error("Google Login Error:", error.message);
//             });
//     };

//     // Password conditions
//     const conditions = [
//         { label: "At least 6 characters", valid: password.length >= 6 },
//         { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
//         { label: "One special character (!@#$%^&*)", valid: /[!@#$%^&*]/.test(password) },
//     ];

//     return (
//         <div className="min-h-screen bg-base-200 flex items-center justify-center">
//             <div className="hero-content flex-col lg:flex-row-reverse w-full">
//                 <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
//                     <form onSubmit={handleRegister} className="card-body">
//                         {/* Name input */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Name</span>
//                             </label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 placeholder="Enter your name"
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>

//                         {/* Image URL input */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Image URL</span>
//                             </label>
//                             <input
//                                 type="url"
//                                 name="imageUrl"
//                                 placeholder="Enter image URL"
//                                 className="input input-bordered"
//                             />
//                         </div>

//                         {/* Email input */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Email</span>
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 placeholder="Enter your email"
//                                 className="input input-bordered"
//                                 required
//                             />
//                         </div>

//                         {/* Password input */}
//                         <div className="form-control">
//                             <label className="label">
//                                 <span className="label-text">Password</span>
//                             </label>
//                             <input
//                                 type="password"
//                                 name="password"
//                                 placeholder="Enter your password"
//                                 className="input input-bordered"
//                                 required
//                                 value={password}
//                                 onChange={e => setPassword(e.target.value)}
//                             />
//                             {/* Live password conditions */}
//                             <ul className="text-sm mt-2 ml-2">
//                                 {conditions.map((cond, i) => (
//                                     <li key={i} className={cond.valid ? "text-green-500" : "text-red-500"}>
//                                         {cond.label}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         {/* Submit button */}
//                         <div className="form-control mt-6">
//                             <button className="btn btn-primary">Register</button>
//                             <button
//                                 type="button"
//                                 onClick={handleGoogleLogin}
//                                 className="btn bg-red-600 text-white mt-2"
//                             >
//                                 Google Login
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Register;













// const express = require("express");
// const dotenv = require("dotenv");
// dotenv.config();
// const cors = require("cors");
// const app = express();
// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.fpvzj8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// app.use(cors());
// app.use(express.json());

// const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send("Server running...");
// });





// const { MongoClient, ServerApiVersion } = require('mongodb');

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//     serverApi: {
//         version: ServerApiVersion.v1,
//         strict: true,
//         deprecationErrors: true,
//     }
// });

// // yN9rH66HHPHyLYod
// // nodeJsProject

// async function run() {
//     try {
//         // Connect the client to the server	(optional starting in v4.7)
//         await client.connect();

//         // all code here

//         const database = client.db("allProducts");
//         const productCollection = database.collection("products");

//         // get products api 
//         app.get('/allproducts', async (req, res) => {
//             const cursor = productCollection.find();
//             const result = await cursor.toArray();
//             res.send(result);
//         });




//         // add Product

//         app.post('/allproducts', async (req, res) => {
//             try {
//                 const newProduct = req.body; // Access the data sent by client
//                 console.log('Received product:', newProduct);

//                 // Respond back to client
//                 res.send({ message: 'Product received successfully', product: newProduct });

//                 const result = await productCollection.insertOne(newProduct);
//                 res.send(result);





//             } catch (error) {
//                 console.error('Error receiving product:', error);
//                 res.send({ message: 'Error receiving product' });
//             }
//         });




















//         await client.db("admin").command({ ping: 1 });
//         console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     } finally {
//         // Ensures that the client will close when you finish/error
//         // await client.close();
//     }
// }
// run().catch(console.dir);






// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });











// import {
//     createBrowserRouter,
// } from "react-router-dom";
// import MailLayOut from "../LayOut/MailLayOut";
// import Home from "../Component/Home";
// import Error from "../Page/Error/Error";
// import Register from "../Component/Register/Register";
// import Login from "../Component/Login/Login";
// import AllProduct from "../Component/All Product/AllProduct";
// import AddProduct from "../Component/Add Product/AddProduct";
// import Dashboard from "../Component/Dashboard/Dashboard";
// import PrivateRoute from "./PrivateRoute";
// import Unauthorized from "../Component/Role-Based/Unauthorized";

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <MailLayOut></MailLayOut>,
//         children: [
//             {
//                 path: '/',
//                 element: <Home></Home>,
//             },


//             {

//                 path: '/register',
//                 element: <Register></Register>,

//             },


//             {
//                 path: '/login',
//                 element: <Login></Login>

//             },

//             {

//                 path: '/allProduct',
//                 element: <AllProduct></AllProduct>,
//                 loader: () => fetch('http://localhost:3000/allproducts')

//             },


//             {

//                 path: '/addPtoduct',
//                 element: <AddProduct></AddProduct>


//             },



//             {
//                 path: '*',
//                 element: <Error></Error>
//             },


//             {

//                 path: '/dashboard',
//                 element: <PrivateRoute>
//                     <Dashboard></Dashboard>
//                 </PrivateRoute>

//             },

//             {
//                 path: "/unauthorized",
//                 element: <Unauthorized />,
//             }
//         ]




//     },


// ]);

// export default router;















