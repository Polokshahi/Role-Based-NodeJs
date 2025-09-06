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

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // add loading state

    // Create user with email & password
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Sign in with email & password
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Google login
    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        return signInWithPopup(auth, googleProvider);
    };

    // Logout
    const logOut = () => {
        return signOut(auth);
    };

    // Track logged-in user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false); // auth check done
            console.log("Current user:", currentUser);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading, // expose loading state
        createUser,
        signIn,
        googleLogin,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
