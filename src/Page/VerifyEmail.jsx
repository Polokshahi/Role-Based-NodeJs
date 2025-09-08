import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkVerification = () => {
      if (auth.currentUser) {
        auth.currentUser.reload().then(() => {
          if (auth.currentUser.emailVerified) {
            setVerified(true);
            setChecking(false);
            navigate("/"); // Verification হলে homepage-এ redirect
          } else {
            setVerified(false);
            setChecking(false);
          }
        }).catch(err => {
          console.error("Email verification check failed:", err);
          setChecking(false);
        });
      } else {
        setChecking(false);
      }
    };

    // 3 সেকেন্ড পরপর verification চেক করা
    const interval = setInterval(checkVerification, 3000);

    // Component unmount হলে interval clean করা
    return () => clearInterval(interval);
  }, [auth, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-purple-500 p-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Verify Your Email</h2>
        <p className="text-gray-700">
          A verification link has been sent to your email. <br />
          Please check your inbox and click the link.
        </p>
        <p className="mt-4 text-gray-500">
          {checking
            ? "Checking verification status..."
            : verified
            ? "Email verified! Redirecting..."
            : "Waiting for verification..."}
        </p>
      </div>
    </div>
  );
};

export default VerifyEmail;
