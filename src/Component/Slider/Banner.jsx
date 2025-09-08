import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full">
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://i.ibb.co.com/r2FLJbth/Black-White-Modern-Financial-Content-You-Tube-Banner.png)",
        }}
      >
        {/* Dark overlay */}
        <div className="hero-overlay bg-black bg-opacity-50"></div>

        {/* Banner content */}
        <div className="hero-content text-center text-white px-6">
          <div className="max-w-2xl">
            <h1 className="mb-6 text-4xl md:text-6xl font-extrabold leading-tight">
              Discover <span className="text-teal-400">Premium</span> Products for Your <span>Lifestyle</span>
            </h1>
            <p className="mb-8 text-lg md:text-xl text-gray-200">
              Shop the latest collections with unbeatable quality and style. 
              Your perfect choice is just a click away.
            </p>
            <div className="flex justify-center gap-4">
            <Link to={'/allproduct'}>
              <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition">
                Shop Now
              </button></Link>
              <button className="px-6 py-3 rounded-lg bg-white text-gray-900 font-semibold shadow-lg hover:bg-gray-200 transition">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
