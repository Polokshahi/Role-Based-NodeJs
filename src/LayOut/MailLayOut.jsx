import { Outlet } from "react-router-dom";
import Navbar from "../Page/Header/Navbar";
import Footer from "../Page/Footer/Footer";


const MailLayOut = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[white] text-white">
      {/* Header */}
      <Navbar />

      {/* Main content */}
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MailLayOut;
