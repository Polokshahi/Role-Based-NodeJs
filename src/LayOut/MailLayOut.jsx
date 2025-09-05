import { Outlet } from "react-router-dom";
import Navbar from "../Page/Header/Navbar";
import Footer from "../Page/Footer/Footer";

const MailLayOut = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header always at top */}
      <Navbar />

      {/* Page content grows to fill the space */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer always at bottom */}
      <Footer />
    </div>
  );
};

export default MailLayOut;
